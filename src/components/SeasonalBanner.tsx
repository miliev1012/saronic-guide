import { useState } from 'react';

export default function SeasonalBanner() {
  const key = 'saronic-banner-june2026';
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(key) === '1'; } catch { return false; }
  });

  if (dismissed) return null;

  const dismiss = () => {
    try { localStorage.setItem(key, '1'); } catch {}
    setDismissed(true);
  };

  return (
    <div className="seasonal-banner">
      <div className="sb-inner">
        <span className="sb-icon">⛵</span>
        <div className="sb-text">
          <strong>June sailing conditions:</strong> Early Meltemi season — calm mornings (sail early!), afternoon NE breeze 10–20 knots building after 2pm. Water temp 22–24°C, perfect for swimming. Crowds manageable until mid-July.
        </div>
        <button className="sb-close" onClick={dismiss} aria-label="Dismiss">✕</button>
      </div>
    </div>
  );
}
