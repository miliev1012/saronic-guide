import { ISLAND_META, CATEGORY_META, VIBE_META } from '../data/types';
import type { Island, Category, Vibe } from '../data/types';

interface Props {
  island: Island | 'all';
  category: Category | 'all';
  vibe: Vibe | 'all';
  onIsland: (v: Island | 'all') => void;
  onCategory: (v: Category | 'all') => void;
  onVibe: (v: Vibe | 'all') => void;
}

const ISLANDS = Object.entries(ISLAND_META) as [Island, typeof ISLAND_META[Island]][];
const CATS = Object.entries(CATEGORY_META) as [Category, typeof CATEGORY_META[Category]][];
const VIBES = Object.entries(VIBE_META) as [Vibe, typeof VIBE_META[Vibe]][];

export default function FilterBar({ island, category, vibe, onIsland, onCategory, onVibe }: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">Island</span>
        <div className="filter-pills">
          <button className={`filter-pill${island === 'all' ? ' active' : ''}`} onClick={() => onIsland('all')}>All</button>
          {ISLANDS.map(([id, meta]) => (
            <button
              key={id}
              className={`filter-pill${island === id ? ' active island-active' : ''}`}
              style={island === id ? { background: meta.color, borderColor: meta.color } : {}}
              onClick={() => onIsland(id)}
            >
              {meta.emoji} {meta.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Category</span>
        <div className="filter-pills">
          <button className={`filter-pill${category === 'all' ? ' active' : ''}`} onClick={() => onCategory('all')}>All</button>
          {CATS.map(([id, meta]) => (
            <button
              key={id}
              className={`filter-pill${category === id ? ' active cat-active' : ''}`}
              style={category === id ? { background: meta.color, borderColor: meta.color } : {}}
              onClick={() => onCategory(id)}
            >
              {meta.emoji} {meta.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-label">Vibe</span>
        <div className="filter-pills">
          <button className={`filter-pill${vibe === 'all' ? ' active' : ''}`} onClick={() => onVibe('all')}>All</button>
          {VIBES.map(([id, meta]) => (
            <button
              key={id}
              className={`filter-pill${vibe === id ? ' active' : ''}`}
              style={vibe === id ? { background: meta.color, borderColor: meta.color, color: 'white' } : {}}
              onClick={() => onVibe(id)}
            >
              {meta.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
