export type Island =
  | 'piraeus'
  | 'aegina'
  | 'angistri'
  | 'methana'
  | 'poros'
  | 'hydra'
  | 'dokos'
  | 'spetses'
  | 'ermioni'
  | 'porto_heli';

export type Category = 'beach' | 'taverna' | 'marina' | 'nature' | 'town' | 'fishing';

export type Vibe =
  | 'secluded'
  | 'snorkeling'
  | 'fishing'
  | 'sunset'
  | 'family'
  | 'romantic'
  | 'diving'
  | 'protected'
  | 'swimming';

export const VIBE_META: Record<Vibe, { label: string; color: string; bg: string }> = {
  secluded:   { label: 'Secluded',    color: '#5c4a8a', bg: '#ede8f8' },
  snorkeling: { label: 'Snorkeling',  color: '#0077b6', bg: '#cce9f5' },
  fishing:    { label: 'Fishing',     color: '#0a4975', bg: '#d4eaf7' },
  sunset:     { label: 'Sunset view', color: '#e07b39', bg: '#fde8d8' },
  family:     { label: 'Family',      color: '#2d9e5e', bg: '#d5f0e4' },
  romantic:   { label: 'Romantic',    color: '#c2456a', bg: '#fce8ef' },
  diving:     { label: 'Diving',      color: '#1b6f8a', bg: '#d0eef5' },
  protected:  { label: 'Protected',   color: '#4a7c59', bg: '#ddf0e4' },
  swimming:   { label: 'Swimming',    color: '#00b4d8', bg: '#d0f4fc' },
};

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
  anchor?: boolean;
  swim?: boolean;
  depth?: string;      // e.g. "4–8m"
  bottom?: string;     // e.g. "sandy, good holding"
  vibes?: Vibe[];
  cooksCatch?: boolean; // taverna will cook your fish
  fuel?: boolean;       // fuel available at marina
  vhf?: string;         // VHF working channel
}

export const ISLAND_META: Record<Island, {
  label: string; emoji: string; color: string; desc: string;
  sailingFrom?: string; nm?: number; hours?: string;
}> = {
  piraeus:    { label: 'Piraeus',     emoji: '⚓', color: '#4a6fa5', desc: 'Starting point — the port of Athens' },
  aegina:     { label: 'Aegina',      emoji: '🏛️', color: '#2e8b57', desc: 'Closest island, famous for pistachios & temples',   sailingFrom: 'Piraeus',   nm: 18, hours: '1.5–2h' },
  angistri:   { label: 'Angistri',    emoji: '🌿', color: '#20b2aa', desc: 'Small, pine-covered, crystal-clear waters',           sailingFrom: 'Aegina',    nm: 5,  hours: '30 min' },
  methana:    { label: 'Methana',     emoji: '🌋', color: '#8b5e3c', desc: 'Volcanic peninsula, hot springs, dramatic landscape', sailingFrom: 'Angistri',  nm: 10, hours: '1–1.5h' },
  poros:      { label: 'Poros',       emoji: '🌊', color: '#1e6ea6', desc: 'Lush island, charming clock-tower town',              sailingFrom: 'Methana',   nm: 10, hours: '1.5h' },
  hydra:      { label: 'Hydra',       emoji: '🫏', color: '#8b4513', desc: 'No cars, no bikes — donkeys & pure magic',            sailingFrom: 'Poros',     nm: 14, hours: '2h' },
  dokos:      { label: 'Dokos',       emoji: '🏝️', color: '#2d6a4f', desc: 'Uninhabited island, pristine anchorages & fishing',   sailingFrom: 'Hydra',     nm: 8,  hours: '1h' },
  spetses:    { label: 'Spetses',     emoji: '⛵', color: '#c0392b', desc: 'Elegant, pine-scented, best beaches in the Saronic', sailingFrom: 'Dokos',     nm: 14, hours: '2h' },
  ermioni:    { label: 'Ermioni',     emoji: '🐟', color: '#6b2d8b', desc: 'Charming Peloponnese fishing village, great tavernas',sailingFrom: 'Hydra',     nm: 12, hours: '1.5h' },
  porto_heli: { label: 'Porto Heli',  emoji: '🛥️', color: '#c0392b', desc: 'Popular marina town on the Peloponnese coast',        sailingFrom: 'Spetses',   nm: 5,  hours: '30 min' },
};

export const CATEGORY_META: Record<Category, { label: string; emoji: string; color: string; bg: string }> = {
  beach:   { label: 'Beaches & Anchorages', emoji: '🏖️', color: '#0096c7', bg: '#e0f4fa' },
  taverna: { label: 'Tavernas & Food',       emoji: '🍽️', color: '#e76f51', bg: '#fdf0ec' },
  marina:  { label: 'Marinas & Harbours',    emoji: '⚓', color: '#264653', bg: '#e8eff2' },
  nature:  { label: 'Nature & Views',        emoji: '🌿', color: '#2d6a4f', bg: '#edf7f2' },
  town:    { label: 'Towns & Culture',       emoji: '🏛️', color: '#6b4226', bg: '#f7f0e8' },
  fishing: { label: 'Fishing Spots',         emoji: '🎣', color: '#0a4975', bg: '#d4eaf7' },
};
