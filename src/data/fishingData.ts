export interface FishingTechnique {
  id: string;
  icon: string;
  name: string;
  desc: string;
  gear: string;
  bestFor: string;
  timing: string;
  tip: string;
}

export interface FishSpecies {
  id: string;
  greek: string;
  english: string;
  emoji: string;
  desc: string;
  minSize: string;
  techniques: string[];
  bestBait: string;
  season: string;
  eating: string;
}

export interface GearItem {
  category: string;
  items: string[];
}

export const TECHNIQUES: FishingTechnique[] = [
  {
    id: 'trolling',
    icon: '⛵',
    name: 'Trolling While Sailing',
    desc: 'Trail lures or baits behind the catamaran as you motor or sail between islands. One of the easiest and most productive methods — you\'re fishing while you travel.',
    gear: '20–50lb rod in a rod holder, 100m of 0.40mm mono or 30lb braid, wire or heavy fluoro leader',
    bestFor: 'Bonito (palamida), bluefish (gofari), small tuna, barracuda',
    timing: 'Best at 5–8 knots boat speed. Early morning passages and when rounding headlands.',
    tip: 'Silver spoons (40–60g), Rapala-type shallow divers, or rubber shads work well. Let out 30–50m of line. Have a gaff or large net ready.',
  },
  {
    id: 'bottom',
    icon: '🪝',
    name: 'Bottom Fishing at Anchor',
    desc: 'The classic: drop a paternoster rig to the bottom while anchored in a bay or cove. The most versatile technique for the Saronic, where you\'ll be anchored most of the day.',
    gear: 'Paternoster rig with 2–3 hooks (1/0–3/0), 50–150g sinker depending on depth, rod 2–3m medium action',
    bestFor: 'Sea bream (tsipoura), red sea bream (fangri), white bream (sargos), red mullet (barbouni), scorpionfish',
    timing: 'Dawn and dusk are best, but bream bite throughout the day in calm conditions.',
    tip: 'Best baits: fresh squid strips, worms (from tackle shops), shrimp, mussels. Change bait every 15 min if no bite. Rocky/sandy transitions are prime spots.',
  },
  {
    id: 'jigging',
    icon: '💫',
    name: 'Jigging & Metal Lures',
    desc: 'Drop a metal jig to the bottom and work it up with rhythmic pumps. Highly effective in the deeper rocky areas around Methana, Hydra and Dokos for large predatory fish.',
    gear: 'Jigging rod (fast action), 30–50lb braid mainline, 50–100g metal jigs in silver, pink, or chartreuse',
    bestFor: 'Dentex (synagrida), amberjack (magiatiko), grouper (rofos), large sea bass',
    timing: 'Most effective at dawn, dusk, and around full/new moon when big fish are more active.',
    tip: 'Work the jig from the bottom to mid-water column with sharp lifts and drops. Let it flutter on the drop — most strikes happen as the jig falls. Depth: 20–50m.',
  },
  {
    id: 'spearfishing',
    icon: '🤿',
    name: 'Spearfishing (Freediving)',
    desc: 'With the crystal clarity of the Saronic — especially Angistri, Hydra and Dokos — spearfishing by freediving is extraordinary. Legal in Greece for freedivers; scuba-assisted spearfishing is prohibited.',
    gear: 'Band-powered speargun (75–110cm) or pole spear, mask, fins, wetsuit (3mm in June), weight belt, knife, float+flag',
    bestFor: 'Grouper (rofos), sea bass (lavraki), large sea bream, wrasse, octopus',
    timing: 'Morning is best — clearest water, fish are most active.',
    tip: 'Minimum 300m from designated swimming beaches. Check local protected areas. Aim for rocky drop-offs and underwater caves. Take only what you\'ll eat.',
  },
  {
    id: 'float',
    icon: '🔴',
    name: 'Float Fishing',
    desc: 'Classic float (bobber) fishing from the dinghy or rocky ledge. Ideal for the shallow, clear bays — you can see the fish biting. Great for all ages, very versatile.',
    gear: 'Light rod 3–4m, 0.22–0.28mm fluorocarbon leader, small hook (6–8), weighted float',
    bestFor: 'White bream (sargos), striped mullet (kephalos), wrasse (lapin/hanos), small bass',
    timing: 'Early morning and late afternoon near rocky shores and harbour walls.',
    tip: 'Bait: sea urchin flesh, bread, small pieces of shrimp. Fish 1–3m depth near rocky structure. Loose feeding (chumming) with crushed sea urchin or bread crumbs dramatically improves results.',
  },
  {
    id: 'octopus',
    icon: '🐙',
    name: 'Octopus Hunting',
    desc: 'Octopus (htapodi) is abundant across the Saronic and one of the most exciting things to catch. Two methods: (1) pole-and-jig from the boat, (2) visual hunting by snorkel in rocky shallows.',
    gear: 'Octopus jig (takobeito), or a pole with a short length of chain or weighted string. Snorkel, mask, gloves for hand-catching in shallows.',
    bestFor: 'Octopus! Also works for cuttlefish (soupies)',
    timing: 'Dusk and night from the boat, or mornings snorkelling rocky shallows. Low tide exposes octopus dens.',
    tip: 'Look for octopus dens (piles of shells/rocks). Drop the jig into rocky crevices and wiggle. Once hooked, pull steadily — they grip hard. A freshly caught and beaten octopus grilled over coals is one of life\'s great pleasures.',
  },
  {
    id: 'squid',
    icon: '🦑',
    name: 'Squid Fishing (Eging) — Night',
    desc: 'Night squid fishing from the anchored catamaran using egi jigs. Hang a bright light over the stern — it attracts plankton, which attracts squid. In June the runs are excellent across the Saronic.',
    gear: 'Light spinning rod, 0.6–0.8 PE braid, egi jigs size 2.5–3.5 (pink, orange, chartreuse), light controller or powerful LED torch',
    bestFor: 'Common squid (kalamari), cuttlefish (soupies)',
    timing: 'After dark until midnight. Best on calm nights with little or no moon.',
    tip: 'Cast the egi out, let it sink to 3–5m, then give 2–3 sharp twitches and let it glide. Repeat. When you feel resistance — don\'t jerk! Just reel in steadily. Zogeria (Spetses), Limnioza (Hydra) and Metochi (Angistri) are top spots.',
  },
  {
    id: 'shore',
    icon: '🪨',
    name: 'Shore & Rock Fishing',
    desc: 'Fishing from rocky ledges, harbour walls, or the dinghy close to shore. The Saronic islands have plenty of rocky inshore structure. This is "inshore" fishing — working the shallows for coastal species.',
    gear: 'Medium-light rod 3–4m, 0.25–0.30mm line, light bottom rig or float rig',
    bestFor: 'White bream (sargos), horse mackerel (skoumbri), red mullet, blotched picarel (marida)',
    timing: 'Morning and evening. From rocky ledges and harbour walls.',
    tip: 'Harbour walls are underrated spots — red mullet and sargos patrol harbour bottoms. Bait with small pieces of squid or shrimp. From rocky ledges, try bread-paste for big sargos.',
  },
];

export const SPECIES: FishSpecies[] = [
  {
    id: 'tsipoura',
    greek: 'Τσιπούρα', english: 'Gilthead Sea Bream', emoji: '🐟',
    desc: 'The prize fish of the Saronic. Beautiful silver fish with a gold spot on the forehead. Excellent eating — mild, white, sweet flesh. Most targeted species.',
    minSize: '20cm',
    techniques: ['Bottom fishing', 'Float fishing', 'Spearfishing'],
    bestBait: 'Shrimp, squid, sea urchin',
    season: 'Year-round. Peak in summer.',
    eating: '⭐⭐⭐⭐⭐ The best. Grill whole with olive oil and lemon.',
  },
  {
    id: 'lavraki',
    greek: 'Λαβράκι', english: 'European Sea Bass', emoji: '🐠',
    desc: 'Aggressive predator. Fights hard on light tackle. Lives in channels, rocky areas and around headlands. The Poros channel and rocky Hydra coast are prime habitats.',
    minSize: '25cm',
    techniques: ['Lure fishing', 'Trolling', 'Bottom fishing', 'Spearfishing'],
    bestBait: 'Soft plastic lures, surface poppers, small fish',
    season: 'Peak June–September.',
    eating: '⭐⭐⭐⭐⭐ Outstanding. Steam or grill with salt crust.',
  },
  {
    id: 'synagrida',
    greek: 'Συναγρίδα', english: 'Common Dentex', emoji: '🐡',
    desc: 'Powerful deep-water predator. Big teeth, strong runs. One of the most prized fish in Greek waters. Found around Methana, Dokos and Bisti at 25–50m.',
    minSize: '30cm',
    techniques: ['Jigging', 'Bottom fishing (deep)', 'Trolling'],
    bestBait: 'Metal jigs, whole small fish, squid',
    season: 'Peak May–July. Very active in June.',
    eating: '⭐⭐⭐⭐⭐ Premium fish. Bake whole or grill fillets.',
  },
  {
    id: 'rofos',
    greek: 'Ροφός', english: 'Dusky Grouper', emoji: '🐢',
    desc: 'The king of the rocks. Lives in caves and rocky crevices. Can grow to 1m+. Protected species in some zones — catch and release recommended for large individuals.',
    minSize: '45cm',
    techniques: ['Spearfishing', 'Jigging', 'Bottom fishing (rocky)'],
    bestBait: 'Whole live or dead fish, large squid',
    season: 'Year-round. More accessible in summer.',
    eating: '⭐⭐⭐⭐ Excellent. Best baked in tomato sauce (plaki style).',
  },
  {
    id: 'palamida',
    greek: 'Παλαμίδα', english: 'Atlantic Bonito', emoji: '🐟',
    desc: 'Fast pelagic fish that schools in open water. Excellent trolling target when sailing between islands. Fights hard and is very good to eat fresh.',
    minSize: '30cm',
    techniques: ['Trolling', 'Spinning with metal lures'],
    bestBait: 'Silver spoons, Rapalas, sabiki rigs',
    season: 'June–October. Best in late June.',
    eating: '⭐⭐⭐⭐ Excellent sashimi or grilled with olive oil. Eat same day.',
  },
  {
    id: 'kalamari',
    greek: 'Καλαμάρι', english: 'Common Squid', emoji: '🦑',
    desc: 'The most fun night fishing in the Saronic. Comes to the surface at night attracted by light. Brilliant eating and incredibly easy to catch in June.',
    minSize: 'No minimum',
    techniques: ['Eging (night)', 'Trolling slow (cuttlefish)'],
    bestBait: 'Egi jigs size 2.5–3.5 in pink, orange or chartreuse',
    season: 'Peak May–July. Excellent in June nights.',
    eating: '⭐⭐⭐⭐⭐ Legendary. Fried calamari, stuffed with rice, or on the grill.',
  },
  {
    id: 'htapodi',
    greek: 'Χταπόδι', english: 'Common Octopus', emoji: '🐙',
    desc: 'Rocky bottom from 1–30m. Intelligent and fun to catch. Abundant all around the Saronic. Beating it against the rocks to tenderize is a local ritual.',
    minSize: 'No minimum',
    techniques: ['Octopus jig', 'Freedive hand-catch', 'Night from boat'],
    bestBait: 'Octopus jig (takobeito), white feather jig',
    season: 'Year-round. Great in summer.',
    eating: '⭐⭐⭐⭐⭐ Iconic Greek food. Beat it, sun-dry 30 min, grill over charcoal.',
  },
  {
    id: 'sargos',
    greek: 'Σάργος', english: 'White Sea Bream', emoji: '🐟',
    desc: 'Striped silver fish with a black spot near the tail. Lives in rocky shallows and around the rocky shores of all the islands. Excellent light tackle fishing.',
    minSize: '18cm',
    techniques: ['Float fishing', 'Shore/rock fishing', 'Bottom fishing (shallow)'],
    bestBait: 'Sea urchin flesh, mussels, bread paste',
    season: 'Year-round.',
    eating: '⭐⭐⭐⭐ Very good. Grill or pan fry whole.',
  },
  {
    id: 'barbouni',
    greek: 'Μπαρμπούνι', english: 'Red Mullet', emoji: '🐡',
    desc: 'The jewel of Greek taverna fish. Sandy/muddy bottom, 5–25m. Distinctive red-orange colour. Delicacy — highly prized even in small sizes.',
    minSize: '11cm',
    techniques: ['Bottom fishing', 'Shore fishing (harbour sand)'],
    bestBait: 'Worm, shrimp, small squid strip',
    season: 'Year-round. Peak in summer.',
    eating: '⭐⭐⭐⭐⭐ Fry in olive oil. The most celebrated small fish in Greek cuisine.',
  },
];

export const GEAR_LIST: GearItem[] = [
  {
    category: '🎣 Rods & Reels',
    items: [
      'Trolling rod: 7ft medium-heavy, 20–50lb class — stays in rod holder while sailing',
      'All-around spinning rod: 9–10ft, 10–40g cast — for bottom, float and shore fishing',
      'Light jigging rod: 6ft fast action — for metal jigs 50–100g',
      'Spinning reels to match (3000–5000 size) with fresh line',
    ],
  },
  {
    category: '🪝 Terminal Tackle',
    items: [
      'Paternoster bottom rigs (pre-tied) with 1/0, 2/0, 3/0 hooks',
      'Float rigs: loaded floats, small hooks size 4–8',
      'Metal jigs: 60–100g in silver, pink, chartreuse',
      'Trolling lures: silver spoons (40–60g), Rapala X-Rap or similar shallow divers',
      'Soft plastic lures + jig heads (10–20g) for bass',
      'Egi jigs for squid: size 2.5 and 3.0 in pink, orange, chartreuse',
      'Octopus jigs (takobeito) × 3',
      'Swivels, sinkers (30–150g), split rings, snaps',
      'Wire traces (20cm) for bonito and barracuda',
      'Extra hooks: 1/0, 2/0, 3/0 assortment',
    ],
  },
  {
    category: '🪣 Accessories',
    items: [
      'Fish bucket / live bait well',
      'Cooler box with ice for catch',
      'Long-nose pliers (hook removal)',
      'Fillet knife + sharpener',
      'Cutting board',
      'Gaff or large landing net',
      'Fish grip',
      'Polarized sunglasses (spot fish through the water)',
      'LED light bar for squid fishing at night',
    ],
  },
  {
    category: '🤿 Spearfishing / Freedive',
    items: [
      'Freediving mask (low volume) + snorkel',
      'Long-blade freediving fins',
      'Wetsuit: 3mm is comfortable in June (water 22–24°C)',
      'Weight belt + lead weights',
      'Band-powered speargun 75–90cm or pole spear',
      'Dive knife',
      'Surface float + dive flag',
      'Stringer for catch',
    ],
  },
  {
    category: '🦠 Bait',
    items: [
      'Frozen squid (most versatile bait, buy in Piraeus or Aegina)',
      'Frozen shrimp',
      'Worms (buy fresh from tackle shops in Aegina, Poros, Spetses)',
      'Sabiki rigs for catching small fish as live bait',
      'Bread (for sargos / mullet)',
    ],
  },
];

export const REGULATIONS = [
  {
    icon: '✅',
    rule: 'Rod fishing from boats is completely FREE in Greece — no licence needed.',
  },
  {
    icon: '✅',
    rule: 'Spearfishing by freediving is permitted. No scuba allowed while spearfishing.',
  },
  {
    icon: '✅',
    rule: 'Night fishing is legal and popular for squid and octopus.',
  },
  {
    icon: '⚠️',
    rule: 'Spearfishing and fishing are PROHIBITED within 300m of designated swimming beaches.',
  },
  {
    icon: '⚠️',
    rule: 'Fishing near fish farms and marine reserves is prohibited.',
  },
  {
    icon: '⚠️',
    rule: 'Grouper (Rofos): minimum size 45cm. Large individuals — consider catch and release.',
  },
  {
    icon: '⚠️',
    rule: 'Net fishing, electric fishing, and explosive fishing are ALL illegal for recreational fishers.',
  },
  {
    icon: '💡',
    rule: 'Pro tip: Many local tavernas will cook your fresh catch for a small fee (usually €5–10 per kilo). Ask when you walk in.',
  },
];
