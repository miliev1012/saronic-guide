export default function SailingTips() {
  const tips = [
    {
      icon: '🌬️',
      title: 'Wind — The Meltemi',
      body: 'June is early for the Meltemi (Aegean north wind). Expect calm mornings (ideal for sailing) and possible afternoon breeze of 10–15 knots from the NE. Check VHF CH 16 and Windy.com daily.',
    },
    {
      icon: '⏰',
      title: 'Timing Your Day',
      body: 'Depart 08:00–09:00 while it\'s calm and cool. Aim to anchor at a beach by 10:30–12:00. Swim, snorkel, fish and lunch. Then motor or sail to your overnight port by 16:00–17:00.',
    },
    {
      icon: '⚓',
      title: 'Anchoring',
      body: 'Most Saronic bays have sandy bottoms at 4–8m — good holding. Use at least 5:1 scope. In popular spots, anchor lines can get tangled — use a trip line. Mooring buoys are available at Hydra and some bays.',
    },
    {
      icon: '⛽',
      title: 'Fuel & Water',
      body: 'Fill up at Zea Marina (Piraeus) before departure. Fuel available at: Aegina town, Poros, Hydra (limited), Spetses (Dapia). Carry extra jerry cans — distances are manageable but plan ahead.',
    },
    {
      icon: '🏊',
      title: 'Swimming & Snorkelling',
      body: 'Water temperature in June is 22–24°C. The Saronic has exceptional clarity, especially around Angistri and Hydra. Bring masks and snorkels — the rocky shores are teeming with fish.',
    },
    {
      icon: '📻',
      title: 'VHF & Safety',
      body: 'Monitor VHF CH 16 at all times. Port Authorities are active in all harbours. File a float plan. Greek Coast Guard: 108. Emergency: 112. Lifejackets must be accessible.',
    },
    {
      icon: '🍽️',
      title: 'Eating & Provisioning',
      body: 'All main islands have supermarkets near the harbour. Eat ashore in the evenings — tavernas typically open for dinner from 19:30–20:00. Lunch at anchor is the best part of the trip.',
    },
    {
      icon: '💶',
      title: 'Money',
      body: 'Cash is still king in smaller harbours and remote tavernas. ATMs in Aegina, Poros, Hydra and Spetses town. Harbour fees: €10–20/night in marinas, free at anchor.',
    },
  ];

  return (
    <div className="sailing-tips">
      <div className="st-header">
        <h2 className="st-title">Sailing Notes</h2>
        <p className="st-subtitle">Practical info for your June catamaran trip</p>
      </div>

      <div className="tips-grid">
        {tips.map((tip, i) => (
          <div key={i} className="tip-card">
            <div className="tip-icon">{tip.icon}</div>
            <div className="tip-content">
              <div className="tip-title">{tip.title}</div>
              <p className="tip-body">{tip.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
