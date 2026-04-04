import { useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { spots } from '../data/places';
import { ISLAND_META, CATEGORY_META } from '../data/types';
import type { Island, Category, Vibe, Spot } from '../data/types';

function makeIcon(emoji: string, color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${color};
      border:2.5px solid #fff;
      border-radius:50%;
      width:34px;height:34px;
      display:flex;align-items:center;justify-content:center;
      font-size:16px;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
      cursor:pointer;
    ">${emoji}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -20],
  });
}

function BoundsAdjuster({ visible }: { visible: Spot[] }) {
  const map = useMap();
  useEffect(() => {
    if (visible.length === 0) return;
    const bounds = L.latLngBounds(visible.map(s => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }, [visible, map]);
  return null;
}

interface Props {
  activeIsland: Island | 'all';
  activeCategory: Category | 'all';
  activeVibe?: Vibe | 'all';
  onSpotClick?: (spot: Spot) => void;
}

export default function MapPanel({ activeIsland, activeCategory, activeVibe = 'all', onSpotClick }: Props) {
  const visible = spots.filter(s => {
    if (activeIsland !== 'all' && s.island !== activeIsland) return false;
    if (activeCategory !== 'all' && s.category !== activeCategory) return false;
    if (activeVibe !== 'all' && !(s.vibes?.includes(activeVibe))) return false;
    return true;
  });

  const handleMarkerClick = useCallback((spot: Spot) => {
    if (onSpotClick) onSpotClick(spot);
  }, [onSpotClick]);

  return (
    <div className="map-wrap">
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
                  {spot.depth && (
                    <div className="popup-depth">⚓ {spot.depth} · {spot.bottom}</div>
                  )}
                  <div className="popup-tags">
                    {spot.anchor && <span className="popup-tag anchor">⚓ Anchorage</span>}
                    {spot.swim && <span className="popup-tag swim">🏊 Swimming</span>}
                    <span className="popup-tag cat" style={{ background: CATEGORY_META[spot.category].bg, color: CATEGORY_META[spot.category].color }}>
                      {CATEGORY_META[spot.category].emoji} {CATEGORY_META[spot.category].label}
                    </span>
                  </div>
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
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
