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
    name: 'Studio Paris Lune',
    address: '2 Rue de la Lune, 75002 Paris',
    phone: '06 65 96 52 31',
    hours: 'Mon–Sat 10am–8pm · Sun 10am–6pm',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
  },
  {
    id: '2',
    name: 'Studio Paris Passy',
    address: '25 rue de l\'Annonciation, 75016 Paris',
    phone: '07 63 65 18 04',
    hours: 'Tue–Sun 10am–7:15pm',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800',
  },
  {
    id: '3',
    name: 'Studio Paris Batignolles',
    address: '28 rue Lemercier, 75017 Paris',
    phone: '07 63 99 60 17',
    hours: 'Tue–Sat 10:45am–7:15pm',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
  },
  {
    id: '4',
    name: 'Studio Paris Haussmann',
    address: 'Galeries Lafayette Haussmann, 40 Bd Haussmann, 75009 Paris',
    phone: '06 60 83 76 95',
    hours: 'Mon–Sat 10am–8pm · Sun & holidays 11am–8pm',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
  },
  {
    id: '5',
    name: 'Studio Nice',
    address: '4 rue Massena, 06000 Nice',
    phone: '07 62 41 56 78',
    hours: 'Tue–Sat 10am–6:30pm',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800',
  },
  {
    id: '6',
    name: 'Studio Bordeaux',
    address: '1 cours Georges Clémenceau, 33000 Bordeaux',
    phone: '06 65 94 58 57',
    hours: 'Tue–Sat 10am–7pm',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800',
  },
  {
    id: '7',
    name: 'Studio Lille',
    address: '38 rue de la Barre, 59800 Lille',
    phone: '06 67 34 01 36',
    hours: 'Mon–Sat 10am–7:30pm',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800',
  },
  {
    id: '8',
    name: 'Studio Lyon',
    address: '4 rue Childebert, 69002 Lyon',
    phone: '06 68 86 52 94',
    hours: 'Tue–Sat 10:30am–7:15pm',
    image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800',
  },
  {
    id: '9',
    name: 'Studio Nantes',
    address: '22 rue Crébillon, 44000 Nantes (1st floor)',
    phone: '06 64 56 25 06',
    hours: 'Tue–Fri 10:30am–7pm · Sat 9:30am–6pm',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800',
  },
  {
    id: '10',
    name: 'Studio Montpellier',
    address: '21 Rue Saint-Guilhem, 34000 Montpellier',
    phone: '07 45 89 09 65',
    hours: 'Tue–Sat 10am–7pm',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800',
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
  { id: '3', name: 'Luxury Cream', icon: '✨', points: 1500 },
  { id: '4', name: 'Free Massage', icon: '🧖', points: 2000 },
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
