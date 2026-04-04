export type Island = 'piraeus' | 'aegina' | 'angistri' | 'poros' | 'hydra' | 'spetses';

export type Category = 'beach' | 'taverna' | 'marina' | 'nature' | 'town';

export interface Spot {
  id: string;
  island: Island;
  category: Category;
  emoji: string;
  name: string;
  lat: number;
  lng: number;
  desc: string;
  tip?: string;
  mustTry?: string;
  anchor?: boolean;   // good anchorage for the boat
  swim?: boolean;     // good swimming
}

export const ISLAND_META: Record<Island, { label: string; emoji: string; color: string; desc: string }> = {
  piraeus:  { label: 'Piraeus',  emoji: '⚓', color: '#4a6fa5', desc: 'Starting point — the port of Athens' },
  aegina:   { label: 'Aegina',   emoji: '🏛️', color: '#2e8b57', desc: 'Closest island, famous for pistachios & temples' },
  angistri: { label: 'Angistri', emoji: '🌿', color: '#20b2aa', desc: 'Small, pine-covered, crystal-clear waters' },
  poros:    { label: 'Poros',    emoji: '🌊', color: '#1e6ea6', desc: 'Lush island, charming clock-tower town' },
  hydra:    { label: 'Hydra',    emoji: '🫏', color: '#8b4513', desc: 'No cars, no bikes — donkeys & pure magic' },
  spetses:  { label: 'Spetses', emoji: '⛵', color: '#c0392b', desc: 'Elegant, pine-scented, pebble beaches' },
};

export const CATEGORY_META: Record<Category, { label: string; emoji: string; color: string; bg: string }> = {
  beach:   { label: 'Beaches & Anchorages', emoji: '🏖️', color: '#0096c7', bg: '#e0f4fa' },
  taverna: { label: 'Tavernas & Food',      emoji: '🍽️', color: '#e76f51', bg: '#fdf0ec' },
  marina:  { label: 'Marinas & Harbours',   emoji: '⚓', color: '#264653', bg: '#e8eff2' },
  nature:  { label: 'Nature & Views',       emoji: '🌿', color: '#2d6a4f', bg: '#edf7f2' },
  town:    { label: 'Towns & Culture',      emoji: '🏛️', color: '#6b4226', bg: '#f7f0e8' },
};
