import { ISLAND_META, CATEGORY_META, VIBE_META } from '../data/types';
import type { Spot } from '../data/types';

interface Props {
  spot: Spot;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onFocus?: (spot: Spot) => void;
}

export default function SpotCard({ spot, isFavorite = false, onToggleFavorite, onFocus }: Props) {
  const catMeta = CATEGORY_META[spot.category];
  const islMeta = ISLAND_META[spot.island];

  const copyGPS = () => {
    const text = `${spot.lat.toFixed(5)}, ${spot.lng.toFixed(5)}`;
    navigator.clipboard?.writeText(text).catch(() => {});
  };

  return (
    <div className="spot-card" style={{ '--cat-color': catMeta.color, '--cat-bg': catMeta.bg } as React.CSSProperties}>
      <div className="spot-card-header">
        <span className="spot-emoji">{spot.emoji}</span>
        <div className="spot-header-text">
          <div className="spot-name">{spot.name}</div>
          <div className="spot-meta">
            <span className="spot-island-badge" style={{ background: islMeta.color }}>
              {islMeta.emoji} {islMeta.label}
            </span>
            <span className="spot-cat-badge" style={{ background: catMeta.bg, color: catMeta.color }}>
              {catMeta.emoji} {catMeta.label}
            </span>
          </div>
        </div>
        {onToggleFavorite && (
          <button
            className={`spot-fav-btn${isFavorite ? ' saved' : ''}`}
            onClick={() => onToggleFavorite(spot.id)}
            title={isFavorite ? 'Remove from saved' : 'Save spot'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        )}
      </div>

      <p className="spot-desc">{spot.desc}</p>

      {spot.mustTry && (
        <div className="spot-musttry">
          <span className="spot-musttry-icon">🍴</span>
          <strong>Must try:</strong> {spot.mustTry}
        </div>
      )}

      {spot.tip && <div className="spot-tip">💡 {spot.tip}</div>}

      {(spot.depth || spot.bottom) && (
        <div className="spot-depth">
          {spot.anchor && <span>⚓</span>}
          {spot.depth && <span>{spot.depth} depth</span>}
          {spot.bottom && <span>· {spot.bottom}</span>}
        </div>
      )}

      {/* Service badges */}
      {(spot.cooksCatch || spot.fuel || spot.vhf) && (
        <div className="spot-service-badges">
          {spot.cooksCatch && <span className="service-badge cook">🍳 Cooks your catch</span>}
          {spot.fuel && <span className="service-badge fuel">⛽ Fuel</span>}
          {spot.vhf && <span className="service-badge vhf">📻 VHF {spot.vhf}</span>}
        </div>
      )}

      {spot.vibes && spot.vibes.length > 0 && (
        <div className="spot-vibes">
          {spot.vibes.map(v => {
            const vm = VIBE_META[v];
            return (
              <span key={v} className="vibe-tag" style={{ background: vm.bg, color: vm.color }}>
                {vm.label}
              </span>
            );
          })}
        </div>
      )}

      <div className="spot-footer">
        <div className="spot-tags">
          {spot.swim && <span className="spot-tag">🏊 Swimming</span>}
          {spot.anchor && <span className="spot-tag">⚓ Anchorage</span>}
        </div>
        <div className="spot-footer-btns">
          <button className="spot-gps-btn" onClick={copyGPS} title="Copy GPS coordinates">📋 GPS</button>
          <button className="spot-map-btn" onClick={() => onFocus && onFocus(spot)} title="Show on map">📍 Map</button>
        </div>
      </div>
    </div>
  );
}
