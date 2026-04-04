import { ISLAND_META, CATEGORY_META } from '../data/types';
import type { Spot } from '../data/types';

interface Props {
  spot: Spot;
  onFocus?: (spot: Spot) => void;
}

export default function SpotCard({ spot, onFocus }: Props) {
  const catMeta = CATEGORY_META[spot.category];
  const islMeta = ISLAND_META[spot.island];

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
      </div>

      <p className="spot-desc">{spot.desc}</p>

      {spot.mustTry && (
        <div className="spot-musttry">
          <span className="spot-musttry-icon">🍴</span>
          <strong>Must try:</strong> {spot.mustTry}
        </div>
      )}

      {spot.tip && (
        <div className="spot-tip">💡 {spot.tip}</div>
      )}

      <div className="spot-footer">
        <div className="spot-tags">
          {spot.anchor && <span className="spot-tag">⚓ Good anchorage</span>}
          {spot.swim && <span className="spot-tag">🏊 Great swimming</span>}
        </div>
        <button
          className="spot-map-btn"
          onClick={() => onFocus && onFocus(spot)}
          title="Show on map"
        >
          📍 Map
        </button>
      </div>
    </div>
  );
}
