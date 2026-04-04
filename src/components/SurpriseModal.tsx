import { useCallback } from 'react';
import { ISLAND_META, CATEGORY_META, VIBE_META } from '../data/types';
import type { Spot } from '../data/types';

interface Props {
  spot: Spot;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onAnother: () => void;
  onShowOnMap: (spot: Spot) => void;
}

export default function SurpriseModal({ spot, isFavorite, onToggleFavorite, onClose, onAnother, onShowOnMap }: Props) {
  const catMeta = CATEGORY_META[spot.category];
  const islMeta = ISLAND_META[spot.island];

  const handleMapClick = useCallback(() => {
    onShowOnMap(spot);
    onClose();
  }, [spot, onShowOnMap, onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="surprise-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="sm-eyebrow">🎲 Random pick for you</div>

        <div className="sm-header" style={{ background: catMeta.color }}>
          <span className="sm-emoji">{spot.emoji}</span>
          <div>
            <div className="sm-name">{spot.name}</div>
            <div className="sm-meta">
              {islMeta.emoji} {islMeta.label} &nbsp;·&nbsp; {catMeta.emoji} {catMeta.label}
            </div>
          </div>
          <button
            className={`sm-fav-btn${isFavorite ? ' saved' : ''}`}
            onClick={() => onToggleFavorite(spot.id)}
            title={isFavorite ? 'Remove from saved' : 'Save this spot'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="sm-body">
          <p className="sm-desc">{spot.desc}</p>

          {spot.mustTry && (
            <div className="sm-musttry">
              <span className="sm-musttry-label">🍴 Must try:</span> {spot.mustTry}
            </div>
          )}

          {spot.tip && (
            <div className="sm-tip">💡 {spot.tip}</div>
          )}

          {spot.depth && (
            <div className="sm-depth">
              ⚓ {spot.depth} depth &nbsp;·&nbsp; {spot.bottom}
            </div>
          )}

          {spot.vibes && spot.vibes.length > 0 && (
            <div className="sm-vibes">
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

          <div className="sm-actions">
            <button className="sm-btn sm-btn-map" onClick={handleMapClick}>
              📍 Show on map
            </button>
            <button className="sm-btn sm-btn-another" onClick={onAnother}>
              🎲 Another one!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
