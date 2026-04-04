import { spots } from '../data/places';
import SpotCard from './SpotCard';
import type { Spot } from '../data/types';

interface Props {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onFocus: (spot: Spot) => void;
}

export default function FavoritesPanel({ favorites, onToggleFavorite, onFocus }: Props) {
  const favSpots = spots.filter(s => favorites.has(s.id));

  if (favSpots.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="fav-empty-icon">❤️</div>
        <h3>No saved spots yet</h3>
        <p>Tap the ♡ on any spot card to save it here for quick reference.</p>
      </div>
    );
  }

  return (
    <div className="favorites-panel">
      <div className="fav-header">
        <h2 className="fav-title">My Saved Spots</h2>
        <span className="fav-count-badge">{favSpots.length} spot{favSpots.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="spots-grid">
        {favSpots.map(spot => (
          <SpotCard
            key={spot.id}
            spot={spot}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            onFocus={onFocus}
          />
        ))}
      </div>
    </div>
  );
}
