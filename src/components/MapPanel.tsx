import { useEffect, useCallback, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { spots } from '../data/places';
import { ISLAND_META, CATEGORY_META } from '../data/types';
import type { Island, Category, Vibe, Spot } from '../data/types';

function makeIcon(emoji: string, color: string, size = 34) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${color};
      border:2.5px solid #fff;
      border-radius:50%;
      width:${size}px;height:${size}px;
      display:flex;align-items:center;justify-content:center;
      font-size:${Math.round(size * 0.47)}px;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
      cursor:pointer;
    ">${emoji}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

const userIcon = L.divIcon({
  className: '',
  html: `<div style="
    background:#0077b6;border:3px solid white;border-radius:50%;
    width:18px;height:18px;
    box-shadow:0 0 0 4px rgba(0,119,182,0.3);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function BoundsAdjuster({ visible }: { visible: Spot[] }) {
  const map = useMap();
  useEffect(() => {
    if (visible.length === 0) return;
    const bounds = L.latLngBounds(visible.map(s => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }, [visible, map]);
  return null;
}

function FlyTo({ pos }: { pos: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (!pos) return;
    map.flyTo(pos, 14, { duration: 1.2 });
  }, [pos, map]);
  return null;
}

interface Props {
  activeIsland: Island | 'all';
  activeCategory: Category | 'all';
  activeVibe?: Vibe | 'all';
  onSpotClick?: (spot: Spot) => void;
}

export default function MapPanel({ activeIsland, activeCategory, activeVibe = 'all', onSpotClick }: Props) {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);

  const visible = spots.filter(s => {
    if (activeIsland !== 'all' && s.island !== activeIsland) return false;
    if (activeCategory !== 'all' && s.category !== activeCategory) return false;
    if (activeVibe !== 'all' && !(s.vibes?.includes(activeVibe))) return false;
    return true;
  });

  const handleMarkerClick = useCallback((spot: Spot) => {
    if (onSpotClick) onSpotClick(spot);
  }, [onSpotClick]);

  const handleNearMe = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const latlng: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(latlng);
        setFlyTarget(latlng);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  }, []);

  return (
    <div className="map-wrap">
      <button
        className={`map-nearme-btn${locating ? ' locating' : ''}`}
        onClick={handleNearMe}
        title="Show my position"
      >
        {locating ? '⏳' : '📍'} Near Me
      </button>

      <MapContainer
        center={[37.45, 23.30]}
        zoom={10}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <BoundsAdjuster visible={visible} />
        <FlyTo pos={flyTarget} />

        {userPos && (
          <Marker position={userPos} icon={userIcon}>
            <Popup><b>You are here</b></Popup>
          </Marker>
        )}

        {visible.map(spot => (
          <Marker
            key={spot.id}
            position={[spot.lat, spot.lng]}
            icon={makeIcon(spot.emoji, CATEGORY_META[spot.category].color)}
            eventHandlers={{ click: () => handleMarkerClick(spot) }}
          >
            <Popup className="saronic-popup">
              <div className="popup-content">
                <div className="popup-header" style={{ background: CATEGORY_META[spot.category].color }}>
                  <span className="popup-emoji">{spot.emoji}</span>
                  <div>
                    <div className="popup-name">{spot.name}</div>
                    <div className="popup-island">{ISLAND_META[spot.island].emoji} {ISLAND_META[spot.island].label}</div>
                  </div>
                </div>
                <div className="popup-body">
                  <p className="popup-desc">{spot.desc}</p>
                  {spot.mustTry && (
                    <div className="popup-musttry">
                      <span className="popup-musttry-label">Must try:</span> {spot.mustTry}
                    </div>
                  )}
                  {spot.tip && <div className="popup-tip">💡 {spot.tip}</div>}
                  {spot.depth && <div className="popup-depth">⚓ {spot.depth} · {spot.bottom}</div>}

                  {(spot.cooksCatch || spot.fuel || spot.vhf) && (
                    <div className="popup-service-badges">
                      {spot.cooksCatch && <span className="service-badge cook">🍳 Cooks catch</span>}
                      {spot.fuel && <span className="service-badge fuel">⛽ Fuel</span>}
                      {spot.vhf && <span className="service-badge vhf">📻 VHF {spot.vhf}</span>}
                    </div>
                  )}

                  <div className="popup-tags">
                    {spot.anchor && <span className="popup-tag anchor">⚓ Anchorage</span>}
                    {spot.swim && <span className="popup-tag swim">🏊 Swimming</span>}
                    <span className="popup-tag cat" style={{ background: CATEGORY_META[spot.category].bg, color: CATEGORY_META[spot.category].color }}>
                      {CATEGORY_META[spot.category].emoji} {CATEGORY_META[spot.category].label}
                    </span>
                  </div>

                  <div className="popup-bottom-row">
                    <button
                      className="popup-gps-btn"
                      onClick={() => navigator.clipboard?.writeText(`${spot.lat.toFixed(5)}, ${spot.lng.toFixed(5)}`).catch(() => {})}
                      title="Copy GPS coordinates"
                    >
                      📋 {spot.lat.toFixed(4)}°N {spot.lng.toFixed(4)}°E
                    </button>
                    <a
                      className="popup-maps-link"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📍 Directions
                    </a>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
