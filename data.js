// FraisPrix - Mock data for fruits & vegetables prices in France
// Prices in €/kg, representative of French market averages

const PRODUCTS = [
  // ===== FRUITS =====
  {
    id: 'pomme',
    name: 'Pomme',
    emoji: '🍎',
    category: 'fruit',
    currentPrice: 2.45,
    weeklyChange: -1.2,
    inSeason: false,
    unit: 'kg',
    history: [2.60, 2.58, 2.55, 2.62, 2.65, 2.60, 2.55, 2.52, 2.50, 2.48, 2.48, 2.45]
  },
  {
    id: 'poire',
    name: 'Poire',
    emoji: '🍐',
    category: 'fruit',
    currentPrice: 2.95,
    weeklyChange: 2.1,
    inSeason: false,
    unit: 'kg',
    history: [2.70, 2.75, 2.78, 2.80, 2.82, 2.85, 2.85, 2.88, 2.90, 2.88, 2.89, 2.95]
  },
  {
    id: 'fraise',
    name: 'Fraise',
    emoji: '🍓',
    category: 'fruit',
    currentPrice: 6.90,
    weeklyChange: -8.3,
    inSeason: true,
    unit: 'kg',
    history: [9.50, 9.20, 8.80, 8.40, 8.10, 7.90, 7.70, 7.50, 7.40, 7.50, 7.52, 6.90]
  },
  {
    id: 'cerise',
    name: 'Cerise',
    emoji: '🍒',
    category: 'fruit',
    currentPrice: 8.50,
    weeklyChange: -5.4,
    inSeason: true,
    unit: 'kg',
    history: [12.00, 11.50, 11.00, 10.80, 10.50, 10.20, 9.80, 9.50, 9.20, 9.00, 8.99, 8.50]
  },
  {
    id: 'abricot',
    name: 'Abricot',
    emoji: '🍑',
    category: 'fruit',
    currentPrice: 4.80,
    weeklyChange: -3.2,
    inSeason: true,
    unit: 'kg',
    history: [6.50, 6.30, 6.10, 5.90, 5.70, 5.50, 5.30, 5.20, 5.10, 5.00, 4.96, 4.80]
  },
  {
    id: 'peche',
    name: 'Pêche',
    emoji: '🍑',
    category: 'fruit',
    currentPrice: 4.20,
    weeklyChange: -4.5,
    inSeason: false,
    unit: 'kg',
    history: [5.50, 5.30, 5.20, 5.10, 4.95, 4.85, 4.75, 4.60, 4.50, 4.40, 4.40, 4.20]
  },
  {
    id: 'melon',
    name: 'Melon',
    emoji: '🍈',
    category: 'fruit',
    currentPrice: 3.50,
    weeklyChange: -6.7,
    inSeason: false,
    unit: 'kg',
    history: [5.00, 4.80, 4.60, 4.40, 4.30, 4.20, 4.10, 4.00, 3.90, 3.80, 3.75, 3.50]
  },
  {
    id: 'pasteque',
    name: 'Pastèque',
    emoji: '🍉',
    category: 'fruit',
    currentPrice: 1.95,
    weeklyChange: -5.8,
    inSeason: false,
    unit: 'kg',
    history: [2.80, 2.70, 2.65, 2.55, 2.45, 2.35, 2.25, 2.20, 2.15, 2.10, 2.07, 1.95]
  },
  {
    id: 'raisin',
    name: 'Raisin',
    emoji: '🍇',
    category: 'fruit',
    currentPrice: 4.10,
    weeklyChange: 1.5,
    inSeason: false,
    unit: 'kg',
    history: [3.80, 3.85, 3.88, 3.90, 3.92, 3.95, 3.98, 4.00, 4.02, 4.04, 4.04, 4.10]
  },
  {
    id: 'kiwi',
    name: 'Kiwi',
    emoji: '🥝',
    category: 'fruit',
    currentPrice: 3.25,
    weeklyChange: 0.3,
    inSeason: false,
    unit: 'kg',
    history: [3.20, 3.22, 3.21, 3.23, 3.24, 3.25, 3.22, 3.24, 3.25, 3.23, 3.24, 3.25]
  },
  {
    id: 'banane',
    name: 'Banane',
    emoji: '🍌',
    category: 'fruit',
    currentPrice: 1.65,
    weeklyChange: 0.6,
    inSeason: false,
    unit: 'kg',
    history: [1.60, 1.62, 1.61, 1.63, 1.62, 1.64, 1.63, 1.64, 1.65, 1.64, 1.64, 1.65]
  },
  {
    id: 'orange',
    name: 'Orange',
    emoji: '🍊',
    category: 'fruit',
    currentPrice: 2.15,
    weeklyChange: 3.4,
    inSeason: false,
    unit: 'kg',
    history: [1.90, 1.92, 1.95, 1.98, 2.00, 2.02, 2.05, 2.06, 2.08, 2.10, 2.08, 2.15]
  },
  {
    id: 'citron',
    name: 'Citron',
    emoji: '🍋',
    category: 'fruit',
    currentPrice: 3.10,
    weeklyChange: -1.6,
    inSeason: false,
    unit: 'kg',
    history: [3.30, 3.25, 3.22, 3.20, 3.18, 3.16, 3.15, 3.14, 3.13, 3.12, 3.15, 3.10]
  },

  // ===== LÉGUMES =====
  {
    id: 'tomate',
    name: 'Tomate',
    emoji: '🍅',
    category: 'légume',
    currentPrice: 2.80,
    weeklyChange: -4.1,
    inSeason: false,
    unit: 'kg',
    history: [3.50, 3.45, 3.40, 3.30, 3.20, 3.15, 3.10, 3.00, 2.95, 2.90, 2.92, 2.80]
  },
  {
    id: 'courgette',
    name: 'Courgette',
    emoji: '🥒',
    category: 'légume',
    currentPrice: 2.20,
    weeklyChange: -6.4,
    inSeason: true,
    unit: 'kg',
    history: [3.20, 3.10, 2.95, 2.85, 2.75, 2.65, 2.55, 2.45, 2.40, 2.35, 2.35, 2.20]
  },
  {
    id: 'poivron',
    name: 'Poivron',
    emoji: '🫑',
    category: 'légume',
    currentPrice: 3.40,
    weeklyChange: -2.9,
    inSeason: false,
    unit: 'kg',
    history: [3.80, 3.75, 3.70, 3.65, 3.60, 3.58, 3.55, 3.52, 3.50, 3.48, 3.50, 3.40]
  },
  {
    id: 'aubergine',
    name: 'Aubergine',
    emoji: '🍆',
    category: 'légume',
    currentPrice: 2.65,
    weeklyChange: -3.6,
    inSeason: false,
    unit: 'kg',
    history: [3.20, 3.15, 3.10, 3.00, 2.95, 2.90, 2.85, 2.80, 2.75, 2.72, 2.75, 2.65]
  },
  {
    id: 'salade',
    name: 'Salade',
    emoji: '🥬',
    category: 'légume',
    currentPrice: 1.20,
    weeklyChange: -7.7,
    inSeason: true,
    unit: 'pièce',
    history: [1.80, 1.70, 1.65, 1.60, 1.55, 1.50, 1.45, 1.40, 1.35, 1.30, 1.30, 1.20]
  },
  {
    id: 'carotte',
    name: 'Carotte',
    emoji: '🥕',
    category: 'légume',
    currentPrice: 1.35,
    weeklyChange: 0.7,
    inSeason: true,
    unit: 'kg',
    history: [1.30, 1.32, 1.33, 1.34, 1.34, 1.35, 1.33, 1.34, 1.35, 1.34, 1.34, 1.35]
  },
  {
    id: 'pommedeterre',
    name: 'Pomme de terre',
    emoji: '🥔',
    category: 'légume',
    currentPrice: 1.10,
    weeklyChange: 0.9,
    inSeason: false,
    unit: 'kg',
    history: [1.05, 1.06, 1.07, 1.08, 1.08, 1.09, 1.08, 1.09, 1.09, 1.08, 1.09, 1.10]
  },
  {
    id: 'oignon',
    name: 'Oignon',
    emoji: '🧅',
    category: 'légume',
    currentPrice: 1.45,
    weeklyChange: 2.8,
    inSeason: false,
    unit: 'kg',
    history: [1.30, 1.32, 1.34, 1.36, 1.38, 1.40, 1.41, 1.42, 1.43, 1.41, 1.41, 1.45]
  },
  {
    id: 'ail',
    name: 'Ail',
    emoji: '🧄',
    category: 'légume',
    currentPrice: 9.80,
    weeklyChange: 1.0,
    inSeason: false,
    unit: 'kg',
    history: [9.20, 9.30, 9.40, 9.45, 9.50, 9.55, 9.60, 9.65, 9.70, 9.72, 9.70, 9.80]
  },
  {
    id: 'champignon',
    name: 'Champignon',
    emoji: '🍄',
    category: 'légume',
    currentPrice: 4.50,
    weeklyChange: -1.1,
    inSeason: false,
    unit: 'kg',
    history: [4.70, 4.65, 4.62, 4.60, 4.58, 4.55, 4.55, 4.52, 4.55, 4.52, 4.55, 4.50]
  },
  {
    id: 'brocoli',
    name: 'Brocoli',
    emoji: '🥦',
    category: 'légume',
    currentPrice: 2.95,
    weeklyChange: -2.0,
    inSeason: true,
    unit: 'kg',
    history: [3.20, 3.15, 3.12, 3.10, 3.08, 3.05, 3.02, 3.00, 2.98, 3.00, 3.01, 2.95]
  }
];

// 8 French regions with price index vs national average (1.00 = national average)
const REGIONS = [
  { name: 'Île-de-France', index: 1.18, code: 'IDF' },
  { name: 'PACA', index: 1.09, code: 'PACA' },
  { name: 'Bretagne', index: 0.94, code: 'BRE' },
  { name: 'Occitanie', index: 0.96, code: 'OCC' },
  { name: 'Auvergne-Rhône-Alpes', index: 1.02, code: 'ARA' },
  { name: 'Normandie', index: 0.97, code: 'NOR' },
  { name: 'Grand Est', index: 1.00, code: 'GE' },
  { name: 'Nouvelle-Aquitaine', index: 0.92, code: 'NA' }
];

// Weeks for chart x-axis labels (12 weeks ending current week)
const WEEK_LABELS = [
  'S-11', 'S-10', 'S-9', 'S-8', 'S-7', 'S-6',
  'S-5', 'S-4', 'S-3', 'S-2', 'S-1', 'Actuelle'
];

// Hero stats
const STATS = {
  totalProducts: 42,
  avgFruit: 2.45,
  avgVegetable: 1.87
};
