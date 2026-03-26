export const mockUser = {
  name: 'Marie',
  fullName: 'Marie Rousseau',
  email: 'marie.r@example.com',
  phone: '+33 6 12 34 56 78',
  initials: 'MR',
  streak: 7,
  skinMiles: 1245,
  rewardsCount: 3,
  membershipTier: 'Pro',
  membershipExpiry: 'Jan 2025',
  skinType: 'Combination • Dehydrated',
  skinConcerns: ['Fine Lines', 'Dark Circles', 'Dullness'],
  skinDiagnosticDate: 'Nov 15, 2024',
  skinScorePercent: 78,
  skinScoreAge: 32,
};

export const mockStudios = [
  {
    id: '1',
    name: 'Seasonly Paris – Marais',
    address: '42 Rue des Francs Bourgeois, 75003 Paris, France',
    phone: '+33 1 42 74 39 19',
    email: 'marais@seasonly.fr',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
  },
  {
    id: '2',
    name: 'Seasonly Paris – Saint-Germain',
    address: '15 Rue de Rennes, 75006 Paris, France',
    phone: '+33 1 45 48 20 10',
    email: 'saintgermain@seasonly.fr',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800',
  },
];

export const mockServices = [
  {
    id: '1',
    name: 'Sculpting Facial Massage',
    description: 'A soothing massage that relieves tension and promotes relaxation',
    duration: '30 min',
    price: 69,
  },
  {
    id: '2',
    name: 'Anti-Aging Treatment',
    description: 'Advanced facial treatment targeting fine lines and wrinkles',
    duration: '1 hour',
    price: 138,
  },
  {
    id: '3',
    name: 'Lymphatic Drainage',
    description: 'Specialized massage to reduce puffiness and improve circulation',
    duration: '30 min',
    price: 69,
  },
];

export const mockRoutines = [
  {
    id: '1',
    name: 'Morning Glow',
    description: 'Start your day with this energizing facial massage routine',
    points: 50,
    completed: true,
  },
  {
    id: '2',
    name: 'Evening Lift',
    description: 'End your day with a relaxing sculpting routine',
    points: 50,
    completed: false,
  },
  {
    id: '3',
    name: 'Hydration Boost',
    description: 'A quick routine to lock in moisture and reduce dryness',
    points: 50,
    completed: false,
  },
  {
    id: '4',
    name: 'Jawline Sculptor',
    description: 'Targeted exercises to define and slim the jawline',
    points: 50,
    completed: false,
  },
];

export const mockProducts = [
  {
    id: '1',
    name: 'Radiance Facial Serum',
    category: 'Serums',
    price: 89,
    rating: 4.8,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
  },
  {
    id: '2',
    name: 'Jade Facial Roller',
    category: 'Tools',
    price: 42,
    rating: 4.8,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400',
  },
  {
    id: '3',
    name: 'Hydrating Face Cream',
    category: 'Creams',
    price: 65,
    rating: 4.6,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
  },
  {
    id: '4',
    name: 'Rosehip Face Oil',
    category: 'Oils',
    price: 55,
    rating: 4.7,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',
  },
];

export const mockRedeemItems = [
  { id: '1', name: '10% Off Voucher', icon: '🎟️', points: 500 },
  { id: '2', name: 'Free Face Serum', icon: '💧', points: 1000 },
];

export const onboardingObjectives = [
  'Slim the jawline',
  'Reduce double chin',
  'Lift cheeks',
  'Improve skin firmness',
  'Reduce morning puffiness',
  'Improve skin glow',
  'Facial fat burning',
  'Self-care routine',
  'Build confidence',
];

export const skinTypes = [
  { id: 'normal', label: 'Normal skin', subtitle: 'Balanced, no major concerns', icon: 'sparkles' },
  { id: 'dry', label: 'Dry skin', subtitle: 'Feels tight, rough texture', icon: 'wind' },
  { id: 'oily', label: 'Oily skin', subtitle: 'Shiny appearance, visible pores', icon: 'sunny' },
  { id: 'combination', label: 'Combination skin', subtitle: 'Dry and oily in different zones', icon: 'water' },
];
