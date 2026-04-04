import { ISLAND_META } from '../data/types';
import { spots } from '../data/places';
import type { Island } from '../data/types';

const ISLAND_DETAILS: Record<Island, { sailing: string; highlights: string[]; bestFor: string }> = {
  piraeus: {
    sailing: 'Home base. 20–30 min to open water.',
    highlights: ['Zea Marina provisions', 'Mikrolimano fish tavernas', 'Saronic ferry connections'],
    bestFor: 'Departure & arrival logistics',
  },
  aegina: {
    sailing: '1.5–2h from Piraeus (18nm). Easy first-day sail.',
    highlights: ['Temple of Aphaia', 'Perdika fishing village', 'World-famous pistachios', 'Agia Marina beach'],
    bestFor: 'History lovers & first-night stop',
  },
  angistri: {
    sailing: '30 min from Aegina (5nm). Very short hop.',
    highlights: ['Dragonera hidden cove', 'Pine-covered hills', 'Crystal-clear anchorages'],
    bestFor: 'Swimming, snorkelling & total peace',
  },
  poros: {
    sailing: '1.5–2h from Angistri (14nm). Iconic channel entrance.',
    highlights: ['The narrow Poros channel', 'Lemon Grove opposite mainland', 'Temple of Poseidon ruins', 'Russian Bay anchorage'],
    bestFor: 'Scenery & relaxed sailing days',
  },
  hydra: {
    sailing: '2–2.5h from Poros (14nm). Open sea passage.',
    highlights: ['No cars — donkeys only', 'Stone mansions & cannon', 'Bisti Bay anchorage', 'Monastery hike'],
    bestFor: 'The most unique island experience in Greece',
  },
  spetses: {
    sailing: '2–3h from Hydra (16nm). Last major island.',
    highlights: ['Old harbour boathouses', 'Agioi Anargyroi turquoise bay', 'Zogeria secluded cove', 'Bouboulina Museum'],
    bestFor: 'Elegant vibes & best beaches in the Saronic',
  },
};

interface Props {
  onFilterIsland: (island: Island) => void;
}

export default function IslandGuide({ onFilterIsland }: Props) {
  const islands = Object.entries(ISLAND_META) as [Island, typeof ISLAND_META[Island]][];

  return (
    <div className="island-guide">
      <div className="island-guide-header">
        <h2 className="ig-title">The Islands</h2>
        <p className="ig-subtitle">Saronic Gulf — June sailing route from Piraeus</p>
      </div>

      <div className="route-strip">
        {islands.map(([id, meta], i) => (
          <div key={id} className="route-step">
            <div className="route-dot" style={{ background: meta.color }}>{meta.emoji}</div>
            <span className="route-name">{meta.label}</span>
            {i < islands.length - 1 && <div className="route-arrow">⛵</div>}
          </div>
        ))}
      </div>

      <div className="island-cards-grid">
        {islands.map(([id, meta]) => {
          const detail = ISLAND_DETAILS[id];
          const spotCount = spots.filter(s => s.island === id).length;
          const beachCount = spots.filter(s => s.island === id && s.category === 'beach').length;
          const tavernaCount = spots.filter(s => s.island === id && s.category === 'taverna').length;

          return (
            <div key={id} className="island-card" style={{ '--island-color': meta.color } as React.CSSProperties}>
              <div className="island-card-top" style={{ background: meta.color }}>
                <span className="island-big-emoji">{meta.emoji}</span>
                <div>
                  <div className="island-card-name">{meta.label}</div>
                  <div className="island-card-sailing">⛵ {detail.sailing}</div>
                </div>
              </div>

              <div className="island-card-body">
                <p className="island-card-desc">{meta.desc}</p>

                <div className="island-stats">
                  <span className="island-stat">📍 {spotCount} spots</span>
                  <span className="island-stat">🏖️ {beachCount} beaches</span>
                  <span className="island-stat">🍽️ {tavernaCount} tavernas</span>
                </div>

                <div className="island-best-for">
                  <span className="island-bf-label">Best for:</span> {detail.bestFor}
                </div>

                <div className="island-highlights">
                  <div className="island-hl-label">Highlights</div>
                  <ul className="island-hl-list">
                    {detail.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </div>

                <button
                  className="island-filter-btn"
                  onClick={() => onFilterIsland(id)}
                >
                  View all {meta.label} spots →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
