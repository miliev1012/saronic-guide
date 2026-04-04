import { useState } from 'react';
import { spots } from '../data/places';
import { ISLAND_META } from '../data/types';
import type { Island } from '../data/types';

type DayVibe = 'lazy' | 'active' | 'fisher';

interface DayPlan {
  morning: string;
  midday: string;
  afternoon: string;
  evening: string;
  note: string;
}

const VIBE_OPTIONS: { id: DayVibe; emoji: string; label: string; desc: string }[] = [
  { id: 'lazy',   emoji: '😎', label: 'Lazy Sailor',       desc: 'Long swim, great food, easy afternoon' },
  { id: 'active', emoji: '🏃', label: 'Explorer',          desc: 'Hike, discover hidden spots, village walk' },
  { id: 'fisher', emoji: '🎣', label: "Fisher's Day",      desc: 'Early fishing, fresh catch lunch, sunset rods out' },
];

const PLANS: Record<Island, Record<DayVibe, DayPlan>> = {
  piraeus: {
    lazy:   { morning: 'Depart Zea Marina 09:00 after a coffee', midday: 'Arrive Perdika (Aegina) by 12:00, anchor off the village', afternoon: 'Swim and lunch at Perdika taverna', evening: 'Evening moor at Aegina town quay', note: 'Day 1 classic — easy and beautiful.' },
    active: { morning: 'Depart Zea 08:00, fast sail to Aegina town', midday: 'Rent scooter, visit Temple of Aphaia', afternoon: 'Swim at Agia Marina beach below the temple', evening: 'Pistachio shopping, dinner in Aegina town', note: 'Pack a lot into your first day.' },
    fisher: { morning: 'Depart 08:00, trolling lines out in the open Saronic', midday: 'Anchor at Perdika, bottom fish the rocky bay', afternoon: 'Cook your catch or ask the taverna to grill it', evening: 'Moor Aegina town, buy pistachios + supplies', note: 'The Aegina channel is excellent for trolling.' },
  },
  aegina: {
    lazy:   { morning: 'Sail to Perdika bay, anchor 10:00, swim', midday: 'Long lunch at Perdika waterfront taverna', afternoon: 'Nap at anchor, late afternoon dinghy explore', evening: 'Sail to Angistri Skala, easy 30 min hop', note: 'Perfect slow day between two islands.' },
    active: { morning: 'Hike Mount Oros — depart 07:30, 2h round trip', midday: 'Scooter to Temple of Aphaia, swim Agia Marina', afternoon: 'Return to boat, quick sail to Angistri', evening: 'Explore Limenaria village on Angistri', note: 'Pack snacks and water for the hike.' },
    fisher: { morning: 'Bottom fish off Perdika rocky point at dawn', midday: 'Cook or bring catch to Perdika taverna', afternoon: 'Troll the Aegina–Angistri channel to Angistri', evening: 'Night squid session at Metochi anchorage', note: 'Perdika and the channel are premium fishing zones.' },
  },
  angistri: {
    lazy:   { morning: 'Sail around to Dragonera cove, anchor 10:00', midday: 'Full morning swim and snorkel in crystal clear water', afternoon: 'Lunch on board, sunset sail to Methana', evening: 'Moor Methana port — explore volcanic town', note: 'Dragonera is what sailing dreams are made of.' },
    active: { morning: 'Walk the pine forest trail Skala → Limenaria (40 min)', midday: 'Swim at Dragonera by dinghy, snorkel the rocky wall', afternoon: 'Explore Metochi bay, kayak around the island', evening: 'Sail to Methana, evening walk to hot springs', note: 'The forest walk and snorkelling combo is unbeatable.' },
    fisher: { morning: 'Spearfishing at Dragonera rocky point — freedive the wall', midday: 'Bottom fish Metochi bay edges, target bream', afternoon: 'Sail to Methana, trail jigs at Cape Methana', evening: 'Night octopus hunting with jig off the boat', note: 'Dragonera spearfishing is exceptional — 20m+ visibility.' },
  },
  methana: {
    lazy:   { morning: 'Morning walk to hot springs, soak in sulphur pools', midday: 'Sail to Poros, arrive for lunch in the channel', afternoon: 'Swim at Russian Bay, lazy afternoon', evening: 'Moor Poros quay, sunset at the clock tower', note: 'The volcanic hot springs are a unique Saronic experience.' },
    active: { morning: 'Rent scooter, drive to volcanic crater — 1.5h hike', midday: 'Sail to Poros, explore the Lemon Grove', afternoon: 'Temple of Poseidon ruins, swim Monastiri beach', evening: 'Poros quay for dinner, evening stroll', note: 'Full cultural and natural exploration day.' },
    fisher: { morning: 'Fish Cape Methana at dawn — jigging and bottom fishing', midday: 'Cook fresh catch on board or at Methana taverna', afternoon: 'Sail to Poros channel, fish the current for bass', evening: 'Moor Poros, squid session from the dock at night', note: 'The volcanic bottom around Methana cape is extraordinary.' },
  },
  poros: {
    lazy:   { morning: 'Anchor at Russian Bay, morning swim in the calm bay', midday: 'Sail across to Lemon Grove for a fragrant walk', afternoon: 'Return to Poros, coffee on the quay, people watch', evening: 'Dinner at Taverna Karavolos, watch yachts come in', note: 'Classic Poros day — utterly relaxing.' },
    active: { morning: 'Water taxi to mainland, taxi to Epidaurus ancient theatre', midday: 'Return by noon, lunch in Poros town', afternoon: 'Swim Monastiri beach, short hike to Temple of Poseidon', evening: 'Climb the clock tower at golden hour', note: 'Epidaurus is a once-in-a-lifetime experience — do it from Poros.' },
    fisher: { morning: 'Lure fishing in the Poros channel at dawn — sea bass', midday: 'Anchor Monastiri, bottom fish the edges over lunch', afternoon: 'Sail towards Hydra, troll past Cape Zourvas', evening: 'Arrive Hydra, night squid session in Limnioza bay', note: 'The Poros channel is the best bass spot in the Saronic.' },
  },
  hydra: {
    lazy:   { morning: 'Anchor at Bisti Bay by 10:00, morning in paradise', midday: 'Swim, snorkel, lunch on board at Bisti', afternoon: 'Sail back to Hydra town, afternoon coffee', evening: 'Dinner in a Hydra alley, Pirato bar for sunset', note: 'Bisti + Hydra town evening = perfect day.' },
    active: { morning: 'Hike to Prophet Elias Monastery — 2h return from town', midday: 'Swim at Mandraki beach, water taxi back', afternoon: 'Explore Hydra cobbled lanes, Bouboulina statues, cannons', evening: 'Sunset cocktails at Pirato, dinner in the backstreets', note: 'The monastery hike views are breathtaking.' },
    fisher: { morning: 'Troll past Cape Zourvas for bonito on way from Poros', midday: 'Jigging at Bisti cape — big dentex and grouper', afternoon: 'Anchor Limnioza, spearfish the rocky wall', evening: 'Night squid session at Limnioza from the boat', note: 'Cape Zourvas + Bisti is a full fishing day in one location.' },
  },
  dokos: {
    lazy:   { morning: 'Anchor Dokos north bay at 10:00, total solitude', midday: 'Swim, snorkel, have the whole island to yourselves', afternoon: 'Nap at anchor, dinghy explore the rocky shore', evening: 'Sail to Ermioni or back to Hydra for the evening', note: 'The most peaceful place in the Saronic.' },
    active: { morning: 'Dinghy around the island, explore all coves', midday: 'Snorkel the eastern reef — extraordinary sea life', afternoon: 'Hike the rocky interior, look for amphora shards', evening: 'Sail to Ermioni or Spetses for the night', note: 'Dokos is one of Greece\'s oldest trading points — history under your feet.' },
    fisher: { morning: 'Spearfishing the eastern reef at dawn — grouper territory', midday: 'Jigging the rocky drops — dentex and amberjack', afternoon: 'Bottom fish in the north bay while at anchor', evening: 'Night octopus and squid from the boat at dusk', note: 'Best fishing of the trip. Dokos waters are pristine and untouched.' },
  },
  spetses: {
    lazy:   { morning: 'Anchor Agioi Anargyroi beach at 10:00, turquoise paradise', midday: 'Long lunch at the beach taverna under the pines', afternoon: 'Lazy sail to Zogeria bay, swim in total calm', evening: 'Moor Old Harbour, dinner at Patralis', note: 'Spetses has the best beaches in the Saronic — take your time.' },
    active: { morning: 'Rent bicycle in Dapia, ride the island perimeter road (20km)', midday: 'Swim at Agia Paraskevi, lunch on board', afternoon: 'Visit Bouboulina Museum, walk through the old harbour', evening: 'Dinner at Orloff for the last night celebration', note: 'The perimeter road by bicycle is stunning — pine forest and sea views all the way.' },
    fisher: { morning: 'Dinghy the south rocky coast for bream and scorpionfish', midday: 'Anchor Zogeria, fish the edges for sargos', afternoon: 'Bottom fish Porto Heli bay for red mullet at sunset', evening: 'Night squid session at Zogeria — one of the best spots', note: 'Spetses south coast and Zogeria are the finishing highlights for fishing.' },
  },
  ermioni: {
    lazy:   { morning: 'Anchor off the peninsula, morning swim in clear water', midday: 'Taverna To Korali for the kakavia fish soup', afternoon: 'Walk the pine peninsula, afternoon siesta', evening: 'Evening in the quiet harbour — almost no tourists', note: 'Ermioni is the hidden gem of the trip.' },
    active: { morning: 'Walk around the entire Ermioni peninsula (1.5h)', midday: 'Swim off the rocky seaward ledges, lunch at the taverna', afternoon: 'Dinghy to nearby rocky coves', evening: 'Sail to Porto Heli for final provisions', note: 'The peninsula walk at sunrise is exceptional.' },
    fisher: { morning: 'Float fish and rock fish the seaward ledges at dawn', midday: 'Bottom fish the harbour entrance for red mullet', afternoon: 'Bring your catch to the taverna — they\'ll cook it', evening: 'Sail to Porto Heli, night squid session', note: 'The rock ledges on the seaward side of the peninsula are superb inshore fishing.' },
  },
  porto_heli: {
    lazy:   { morning: 'Swim in the calm Porto Heli bay, perfect protected anchorage', midday: 'Lunch at the harbour waterfront', afternoon: 'Provisions, fuel up, relax before the return sail', evening: 'Final dinner, celebrate the end of the trip', note: 'Last stop — take your time and enjoy the calm bay.' },
    active: { morning: 'Explore Porto Heli town and surrounding coves by dinghy', midday: 'Swim the bay beaches, snorkel the sandy bottom', afternoon: 'Provision up, charts for return to Piraeus', evening: 'Final dinner, toast to a great trip', note: 'Good base for the return passage planning.' },
    fisher: { morning: 'Bottom fish the bay at dawn — red mullet and bream', midday: 'Mullet fishing from the dock with bread — fun for everyone', afternoon: 'Troll on the return leg to Piraeus for bonito', evening: 'Final dinner with whatever you caught this week', note: 'The return troll to Piraeus often produces the best bonito of the trip.' },
  },
};

export default function DayPlanner() {
  const [step, setStep] = useState<'island' | 'vibe' | 'result'>('island');
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<DayVibe | null>(null);

  const ISLANDS = Object.entries(ISLAND_META) as [Island, typeof ISLAND_META[Island]][];

  const reset = () => { setStep('island'); setSelectedIsland(null); setSelectedVibe(null); };

  const plan = selectedIsland && selectedVibe ? PLANS[selectedIsland][selectedVibe] : null;

  const islandSpotCounts = Object.fromEntries(
    ISLANDS.map(([id]) => [id, spots.filter(s => s.island === id).length])
  );

  return (
    <div className="day-planner">
      <div className="dp-header">
        <h2 className="dp-title">Day Planner</h2>
        <p className="dp-subtitle">Pick an island and a vibe — get a suggested day</p>
      </div>

      {step === 'island' && (
        <div className="dp-step">
          <div className="dp-step-label">Step 1 — Where are you?</div>
          <div className="dp-island-grid">
            {ISLANDS.map(([id, meta]) => (
              <button
                key={id}
                className="dp-island-btn"
                style={{ '--isl-color': meta.color } as React.CSSProperties}
                onClick={() => { setSelectedIsland(id); setStep('vibe'); }}
              >
                <span className="dp-island-emoji">{meta.emoji}</span>
                <span className="dp-island-name">{meta.label}</span>
                <span className="dp-island-spots">{islandSpotCounts[id]} spots</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'vibe' && selectedIsland && (
        <div className="dp-step">
          <div className="dp-step-label">
            Step 2 — What kind of day?
            <button className="dp-back" onClick={() => setStep('island')}>← Back</button>
          </div>
          <div className="dp-island-selected" style={{ background: ISLAND_META[selectedIsland].color }}>
            {ISLAND_META[selectedIsland].emoji} {ISLAND_META[selectedIsland].label}
          </div>
          <div className="dp-vibe-grid">
            {VIBE_OPTIONS.map(v => (
              <button
                key={v.id}
                className="dp-vibe-btn"
                onClick={() => { setSelectedVibe(v.id); setStep('result'); }}
              >
                <span className="dp-vibe-emoji">{v.emoji}</span>
                <span className="dp-vibe-label">{v.label}</span>
                <span className="dp-vibe-desc">{v.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'result' && plan && selectedIsland && selectedVibe && (
        <div className="dp-result">
          <div className="dp-result-header" style={{ background: ISLAND_META[selectedIsland].color }}>
            <div className="dp-result-title">
              {ISLAND_META[selectedIsland].emoji} {ISLAND_META[selectedIsland].label} &nbsp;·&nbsp;
              {VIBE_OPTIONS.find(v => v.id === selectedVibe)?.emoji} {VIBE_OPTIONS.find(v => v.id === selectedVibe)?.label}
            </div>
          </div>

          <div className="dp-timeline">
            {[
              { time: '08:00–10:00', icon: '🌅', label: 'Morning', text: plan.morning },
              { time: '10:00–14:00', icon: '☀️',  label: 'Midday',  text: plan.midday },
              { time: '14:00–18:00', icon: '⛵',  label: 'Afternoon', text: plan.afternoon },
              { time: '18:00+',      icon: '🌇',  label: 'Evening', text: plan.evening },
            ].map((item, i) => (
              <div key={i} className="dp-time-block">
                <div className="dp-time-icon">{item.icon}</div>
                <div className="dp-time-content">
                  <div className="dp-time-label">{item.label} <span className="dp-time-clock">{item.time}</span></div>
                  <div className="dp-time-text">{item.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="dp-note">💡 {plan.note}</div>

          <div className="dp-actions">
            <button className="dp-reset-btn" onClick={reset}>Plan another day →</button>
          </div>
        </div>
      )}
    </div>
  );
}
