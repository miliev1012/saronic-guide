import { useState } from 'react';
import { TECHNIQUES, SPECIES, GEAR_LIST, REGULATIONS } from '../data/fishingData';

type Section = 'techniques' | 'species' | 'gear' | 'regs';

export default function FishingGuide() {
  const [section, setSection] = useState<Section>('techniques');

  const SECTIONS: { id: Section; icon: string; label: string }[] = [
    { id: 'techniques', icon: '🎣', label: 'Techniques' },
    { id: 'species',    icon: '🐟', label: 'Target Species' },
    { id: 'gear',       icon: '🪣', label: 'Gear List' },
    { id: 'regs',       icon: '📋', label: 'Rules & Tips' },
  ];

  return (
    <div className="fishing-guide">
      <div className="fg-hero">
        <div className="fg-hero-bg" />
        <div className="fg-hero-content">
          <div className="fg-eyebrow">🎣 Fishing in the Saronic</div>
          <h2 className="fg-title">Saronic Gulf Fishing Guide</h2>
          <p className="fg-subtitle">
            From trolling for bonito between islands to night squid sessions at anchor —
            the Saronic is one of the best casual fishing destinations in the Mediterranean.
          </p>
          <div className="fg-highlight-row">
            <div className="fg-highlight">
              <span className="fg-h-num">9</span>
              <span className="fg-h-label">Target species</span>
            </div>
            <div className="fg-h-div" />
            <div className="fg-highlight">
              <span className="fg-h-num">8</span>
              <span className="fg-h-label">Techniques</span>
            </div>
            <div className="fg-h-div" />
            <div className="fg-highlight">
              <span className="fg-h-num">No licence</span>
              <span className="fg-h-label">needed for rod fishing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section nav */}
      <div className="fg-section-nav">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`fg-section-btn${section === s.id ? ' active' : ''}`}
            onClick={() => setSection(s.id)}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      <div className="fg-body">

        {/* ── TECHNIQUES ── */}
        {section === 'techniques' && (
          <div className="fg-techniques">
            <div className="fg-tip-banner">
              💡 <strong>Pro tip:</strong> Catch your dinner and bring it to a local taverna — many will cook your fish for a small fee (€5–10/kg). Ask when you arrive.
            </div>
            <div className="techniques-grid">
              {TECHNIQUES.map(t => (
                <div key={t.id} className="technique-card">
                  <div className="tc-header">
                    <span className="tc-icon">{t.icon}</span>
                    <h3 className="tc-name">{t.name}</h3>
                  </div>
                  <p className="tc-desc">{t.desc}</p>
                  <div className="tc-row">
                    <span className="tc-label">Best for</span>
                    <span className="tc-val">{t.bestFor}</span>
                  </div>
                  <div className="tc-row">
                    <span className="tc-label">Timing</span>
                    <span className="tc-val">{t.timing}</span>
                  </div>
                  <div className="tc-row">
                    <span className="tc-label">Gear</span>
                    <span className="tc-val">{t.gear}</span>
                  </div>
                  <div className="tc-tip">💡 {t.tip}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SPECIES ── */}
        {section === 'species' && (
          <div className="fg-species">
            <div className="species-grid">
              {SPECIES.map(sp => (
                <div key={sp.id} className="species-card">
                  <div className="sc-header">
                    <span className="sc-emoji">{sp.emoji}</span>
                    <div>
                      <div className="sc-english">{sp.english}</div>
                      <div className="sc-greek">{sp.greek}</div>
                    </div>
                  </div>
                  <p className="sc-desc">{sp.desc}</p>
                  <div className="sc-grid">
                    <div className="sc-item">
                      <span className="sc-item-label">Min. size</span>
                      <span className="sc-item-val">{sp.minSize}</span>
                    </div>
                    <div className="sc-item">
                      <span className="sc-item-label">Season</span>
                      <span className="sc-item-val">{sp.season}</span>
                    </div>
                    <div className="sc-item">
                      <span className="sc-item-label">Best bait</span>
                      <span className="sc-item-val">{sp.bestBait}</span>
                    </div>
                    <div className="sc-item">
                      <span className="sc-item-label">Techniques</span>
                      <span className="sc-item-val">{sp.techniques.join(', ')}</span>
                    </div>
                  </div>
                  <div className="sc-eating">{sp.eating}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── GEAR ── */}
        {section === 'gear' && (
          <div className="fg-gear">
            <p className="fg-gear-intro">Everything you should pack for a full week of Saronic fishing. Adapt based on what techniques you'll focus on.</p>
            <div className="gear-grid">
              {GEAR_LIST.map((g, i) => (
                <div key={i} className="gear-card">
                  <div className="gc-category">{g.category}</div>
                  <ul className="gc-list">
                    {g.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REGULATIONS ── */}
        {section === 'regs' && (
          <div className="fg-regs">
            <p className="fg-regs-intro">Greek fishing regulations are generally relaxed for recreational fishing. The key rules every sailor-fisherman should know:</p>
            <div className="regs-list">
              {REGULATIONS.map((r, i) => (
                <div key={i} className={`reg-item${r.icon === '⚠️' ? ' warning' : r.icon === '💡' ? ' tip' : ' ok'}`}>
                  <span className="reg-icon">{r.icon}</span>
                  <span className="reg-text">{r.rule}</span>
                </div>
              ))}
            </div>

            <div className="fg-best-spots">
              <h3 className="fg-bs-title">🎣 Top Fishing Spots by Island</h3>
              <div className="fg-bs-grid">
                {[
                  { island: 'Aegina', emoji: '🏛️', spots: 'Aegina–Angistri channel (bottom fishing), Perdika bay (bream at anchor)' },
                  { island: 'Angistri', emoji: '🌿', spots: 'Dragonera rocky point (spearfishing), Metochi bay (night squid)' },
                  { island: 'Methana', emoji: '🌋', spots: 'Cape Methana volcanic bottom (jigging, grouper & dentex)' },
                  { island: 'Poros', emoji: '🌊', spots: 'Poros channel (sea bass on lures), Monastiri bay edges (bream)' },
                  { island: 'Hydra', emoji: '🫏', spots: 'Cape Zourvas (trolling bonito), Bisti cape (jigging dentex)' },
                  { island: 'Dokos', emoji: '🏝️', spots: 'The whole island! Eastern reef (spearfishing, grouper), north bay (octopus at night)' },
                  { island: 'Spetses', emoji: '⛵', spots: 'South rocky coast (rock fishing, bream), Zogeria bay (night squid)' },
                  { island: 'Ermioni', emoji: '🐟', spots: 'Peninsula rocky ledges (sargos, mullet from shore), harbour entrance (red mullet)' },
                  { island: 'Porto Heli', emoji: '🛥️', spots: 'Bay bottom fishing (red mullet, bream), return troll to Piraeus (bonito)' },
                ].map((item, i) => (
                  <div key={i} className="fg-bs-item">
                    <span className="fg-bs-island">{item.emoji} {item.island}</span>
                    <span className="fg-bs-spots">{item.spots}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
