import { ISLAND_META } from '../data/types';
import { spots } from '../data/places';
import type { Island } from '../data/types';

const ISLAND_DETAILS: Record<Island, { highlights: string[]; bestFor: string }> = {
  piraeus:    { highlights: ['Zea Marina provisions', 'Mikrolimano fish tavernas', 'Saronic ferry connections'], bestFor: 'Departure & arrival logistics' },
  aegina:     { highlights: ['Temple of Aphaia', 'Perdika fishing village', 'World-famous pistachios', 'Channel fishing'], bestFor: 'History lovers & first-night stop' },
  angistri:   { highlights: ['Dragonera hidden cove', 'Pine-covered hills', 'Spearfishing at the rocky point', 'Night squid at Metochi'], bestFor: 'Swimming, snorkelling & fishing' },
  methana:    { highlights: ['Volcanic hot springs', 'Crater hike', 'Cape Methana fishing (grouper & dentex)', 'Zero tourists'], bestFor: 'Unique geology & serious fishing' },
  poros:      { highlights: ['The narrow Poros channel', 'Lemon Grove', 'Temple of Poseidon', 'Epidaurus day trip', 'Bass fishing the channel'], bestFor: 'Scenery, culture & bass fishing' },
  hydra:      { highlights: ['No cars — donkeys only', 'Stone mansions & cannon', 'Bisti Bay anchorage', 'Cape Zourvas trolling', 'Bisti jigging'], bestFor: 'The most unique island + best jigging' },
  dokos:      { highlights: ['Uninhabited island', 'Pristine anchorage', 'Best fishing of the trip', 'Extraordinary spearfishing', 'Neolithic history underfoot'], bestFor: 'Total isolation & premium fishing' },
  spetses:    { highlights: ['Old harbour boathouses', 'Agioi Anargyroi bay', 'Zogeria cove (squid!)', 'Bouboulina Museum', 'South coast rock fishing'], bestFor: 'Elegant vibes & squid fishing nights' },
  ermioni:    { highlights: ['Pine-covered peninsula', 'Inshore rock fishing', 'Authentic local taverna', 'Almost no tourists'], bestFor: 'Hidden gem & inshore fishing' },
  porto_heli: { highlights: ['Well-equipped marina', 'Good provisions', 'Bay bottom fishing', 'Return troll to Piraeus'], bestFor: 'Final provisioning & last fishing day' },
};

interface Props {
  onFilterIsland: (island: Island) => void;
}

export default function IslandGuide({ onFilterIsland }: Props) {
  const islands = Object.entries(ISLAND_META) as [Island, typeof ISLAND_META[Island]][];

  return (
    <div className="island-guide">
      <div className="island-guide-header">
        <h2 className="ig-title">The Islands & Route</h2>
        <p className="ig-subtitle">Saronic Gulf — June 6–13 sailing route from Piraeus</p>
      </div>

      {/* Route strip with distances */}
      <div className="route-strip">
        {islands.map(([id, meta], i) => (
          <div key={id} className="route-step">
            <div className="route-dot" style={{ background: meta.color }}>
              <span className="route-dot-emoji">{meta.emoji}</span>
            </div>
            <span className="route-name">{meta.label}</span>
            {i < islands.length - 1 && meta.nm && (
              <div className="route-leg">
                <div className="route-arrow-line" />
                <div className="route-leg-info">
                  <span className="route-nm">{meta.nm}nm</span>
                  <span className="route-hours">{meta.hours}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Total distance summary */}
      <div className="route-summary">
        <div className="rs-item">
          <span className="rs-num">~80nm</span>
          <span className="rs-label">Total one-way</span>
        </div>
        <div className="rs-div" />
        <div className="rs-item">
          <span className="rs-num">3–4h</span>
          <span className="rs-label">Max daily sail</span>
        </div>
        <div className="rs-div" />
        <div className="rs-item">
          <span className="rs-num">7 days</span>
          <span className="rs-label">Trip duration</span>
        </div>
        <div className="rs-div" />
        <div className="rs-item">
          <span className="rs-num">Flexible</span>
          <span className="rs-label">No fixed itinerary</span>
        </div>
      </div>

      <div className="island-cards-grid">
        {islands.map(([id, meta]) => {
          const detail = ISLAND_DETAILS[id];
          const spotCount = spots.filter(s => s.island === id).length;
          const beachCount = spots.filter(s => s.island === id && s.category === 'beach').length;
          const tavernaCount = spots.filter(s => s.island === id && s.category === 'taverna').length;
          const fishingCount = spots.filter(s => s.island === id && s.category === 'fishing').length;

          return (
            <div key={id} className="island-card" style={{ '--island-color': meta.color } as React.CSSProperties}>
              <div className="island-card-top" style={{ background: meta.color }}>
                <span className="island-big-emoji">{meta.emoji}</span>
                <div>
                  <div className="island-card-name">{meta.label}</div>
                  {meta.sailingFrom && (
                    <div className="island-card-sailing">
                      ⛵ {meta.hours} from {meta.sailingFrom} · {meta.nm}nm
                    </div>
                  )}
                </div>
              </div>

              <div className="island-card-body">
                <p className="island-card-desc">{meta.desc}</p>

                <div className="island-stats">
                  <span className="island-stat">📍 {spotCount} spots</span>
                  <span className="island-stat">🏖️ {beachCount}</span>
                  <span className="island-stat">🍽️ {tavernaCount}</span>
                  {fishingCount > 0 && <span className="island-stat fishing-stat">🎣 {fishingCount}</span>}
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

                <button className="island-filter-btn" onClick={() => onFilterIsland(id)}>
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
