import { useState, useCallback } from 'react';
import MapPanel from './components/MapPanel';
import FilterBar from './components/FilterBar';
import SpotCard from './components/SpotCard';
import IslandGuide from './components/IslandGuide';
import SailingTips from './components/SailingTips';
import { spots } from './data/places';
import { ISLAND_META } from './data/types';
import type { Island, Category, Spot } from './data/types';
type Tab = 'map' | 'list' | 'islands' | 'tips';

export default function App() {
  const [tab, setTab] = useState<Tab>('map');
  const [island, setIsland] = useState<Island | 'all'>('all');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [search, setSearch] = useState('');
  const [mapKey, setMapKey] = useState(0);

  const filtered = spots.filter(s => {
    if (island !== 'all' && s.island !== island) return false;
    if (category !== 'all' && s.category !== category) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
    }
    return true;
  });

  const handleFilterIsland = useCallback((isl: Island) => {
    setIsland(isl);
    setCategory('all');
    setTab('map');
    setMapKey(k => k + 1);
  }, []);

  const handleSpotFocus = useCallback((_spot: Spot) => {
    setTab('map');
  }, []);

  const TABS: { id: Tab; label: string }[] = [
    { id: 'map',     label: '🗺️ Map' },
    { id: 'list',    label: '📋 All Spots' },
    { id: 'islands', label: '🏝️ Islands' },
    { id: 'tips',    label: '⛵ Sailing Notes' },
  ];

  return (
    <div className="app">
      {/* Hero */}
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-eyebrow">⛵ Saronic Gulf · June 6–13, 2026</div>
          <h1 className="hero-title">Saronic Sailing Guide</h1>
          <p className="hero-subtitle">
            Piraeus → Aegina → Angistri → Poros → Hydra → Spetses
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hs-num">{spots.length}</span>
              <span className="hs-label">Curated spots</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <span className="hs-num">6</span>
              <span className="hs-label">Islands</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <span className="hs-num">7</span>
              <span className="hs-label">Days at sea</span>
            </div>
          </div>
        </div>
        <div className="hero-waves">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
            <path d="M0,40 C300,80 600,0 900,40 C1050,60 1150,30 1200,40 L1200,80 L0,80 Z" fill="var(--surface)" />
          </svg>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="filter-wrap">
        <FilterBar island={island} category={category} onIsland={setIsland} onCategory={setCategory} />
      </div>

      {/* Tab Nav */}
      <nav className="tab-nav">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {tab === t.id && filtered.length > 0 && t.id === 'list' && (
              <span className="tab-count">{filtered.length}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="main">
        {tab === 'map' && (
          <div className="map-section">
            <MapPanel key={mapKey} activeIsland={island} activeCategory={category} />
          </div>
        )}

        {tab === 'list' && (
          <div className="list-section">
            <div className="list-search-row">
              <input
                className="search-input"
                type="search"
                placeholder="Search spots..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="list-count">{filtered.length} spots</div>
            </div>

            {Object.entries(ISLAND_META).map(([isl]) => {
              const islandSpots = filtered.filter(s => s.island === isl as Island);
              if (islandSpots.length === 0) return null;
              const meta = ISLAND_META[isl as Island];
              return (
                <div key={isl} className="list-island-group">
                  <div className="list-island-heading" style={{ '--isl-color': meta.color } as React.CSSProperties}>
                    <span>{meta.emoji}</span>
                    <span>{meta.label}</span>
                    <span className="list-isl-count">{islandSpots.length} spots</span>
                  </div>
                  <div className="spots-grid">
                    {islandSpots.map(spot => (
                      <SpotCard key={spot.id} spot={spot} onFocus={handleSpotFocus} />
                    ))}
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <p>No spots match your filters</p>
                <button onClick={() => { setIsland('all'); setCategory('all'); setSearch(''); }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {tab === 'islands' && (
          <IslandGuide onFilterIsland={handleFilterIsland} />
        )}

        {tab === 'tips' && (
          <SailingTips />
        )}
      </main>

      <footer className="footer">
        <div className="footer-islands">
          {Object.entries(ISLAND_META).map(([id, meta]) => (
            <span key={id} className="footer-island">{meta.emoji} {meta.label}</span>
          ))}
        </div>
        <div className="footer-note">Saronic Gulf · June 2026 · Smooth sailing 🌊</div>
      </footer>
    </div>
  );
}
