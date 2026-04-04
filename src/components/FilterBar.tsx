import { ISLAND_META, CATEGORY_META } from '../data/types';
import type { Island, Category } from '../data/types';

interface Props {
  island: Island | 'all';
  category: Category | 'all';
  onIsland: (v: Island | 'all') => void;
  onCategory: (v: Category | 'all') => void;
}

const ISLANDS = Object.entries(ISLAND_META) as [Island, typeof ISLAND_META[Island]][];
const CATS = Object.entries(CATEGORY_META) as [Category, typeof CATEGORY_META[Category]][];

export default function FilterBar({ island, category, onIsland, onCategory }: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <span className="filter-label">Island</span>
        <div className="filter-pills">
          <button
            className={`filter-pill${island === 'all' ? ' active' : ''}`}
            onClick={() => onIsland('all')}
          >All</button>
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
          <button
            className={`filter-pill${category === 'all' ? ' active' : ''}`}
            onClick={() => onCategory('all')}
          >All</button>
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
    </div>
  );
}
