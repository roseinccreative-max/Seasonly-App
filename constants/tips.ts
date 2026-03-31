export interface Tip {
  id: string;
  titleEn: string;
  titleFr: string;
  bodyEn: string;
  bodyFr: string;
  category: string;
  readMinutes: number;
  points: number;
}

export const tips: Tip[] = [
  {
    id: '1',
    titleEn: 'Morning Hydration Ritual',
    titleFr: "Rituel d'hydratation du matin",
    bodyEn: 'Start your day with this simple yet powerful hydration ritual. Apply your serum on damp skin to lock in moisture, then follow with a lightweight cream. Gently massage upward in circular motions to activate circulation and give your skin a natural glow.',
    bodyFr: "Commencez votre journée avec ce rituel d'hydratation puissant. Appliquez votre sérum sur une peau humide pour fixer l'humidité, puis suivez avec une crème légère. Massez doucement vers le haut en mouvements circulaires pour activer la circulation.",
    category: 'Routine',
    readMinutes: 2,
    points: 10,
  },
  {
    id: '2',
    titleEn: 'The Power of Vitamin C for Radiance',
    titleFr: "Le pouvoir de la vitamine C pour l'éclat",
    bodyEn: 'Vitamin C is one of the most researched antioxidants in skincare. It neutralizes free radicals caused by UV exposure and pollution, brightens dark spots, and stimulates collagen production. Apply it every morning before SPF for maximum protection and glow.',
    bodyFr: "La vitamine C est l'un des antioxydants les plus étudiés en soins de la peau. Elle neutralise les radicaux libres, illumine les taches sombres et stimule la production de collagène. Appliquez-la chaque matin avant l'écran solaire.",
    category: 'Ingredients',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '3',
    titleEn: 'Facial Massage: The Natural Facelift',
    titleFr: 'Massage facial : le lifting naturel',
    bodyEn: 'Regular facial massage is the foundation of the Seasonly method. It activates 57 facial muscles, boosts lymphatic drainage to reduce puffiness, and increases blood flow for a natural lift. Even 5 minutes daily shows visible results within 2 weeks.',
    bodyFr: 'Le massage facial régulier est au cœur de la méthode Seasonly. Il active les 57 muscles du visage, stimule le drainage lymphatique pour réduire les gonflements et augmente la circulation sanguine pour un effet lifting naturel.',
    category: 'Technique',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '4',
    titleEn: 'Double Cleansing: The Ritual That Changes Everything',
    titleFr: 'Double nettoyage : le rituel qui change tout',
    bodyEn: 'Double cleansing is essential for removing all traces of SPF, makeup, and pollution. Start with an oil-based cleanser to dissolve impurities, then follow with a gentle water-based cleanser to clear pores. Your subsequent skincare products will absorb up to 30% better.',
    bodyFr: "Le double nettoyage est essentiel pour éliminer toutes les traces de protection solaire, maquillage et pollution. Commencez par un nettoyant à base d'huile, puis suivez avec un nettoyant aqueux doux. Vos soins suivants s'absorberont jusqu'à 30% mieux.",
    category: 'Routine',
    readMinutes: 2,
    points: 10,
  },
  {
    id: '5',
    titleEn: 'Hyaluronic Acid: How to Use It Correctly',
    titleFr: "Acide hyaluronique : comment bien l'utiliser",
    bodyEn: 'Hyaluronic acid works by drawing moisture from the environment into your skin — but only when applied to damp skin. Apply it right after cleansing while your face is still slightly wet, then seal it in with your moisturizer. This one trick triples its effectiveness.',
    bodyFr: "L'acide hyaluronique attire l'humidité de l'environnement vers votre peau — mais uniquement si appliqué sur peau humide. Appliquez-le juste après le nettoyage pendant que votre visage est encore légèrement humide, puis scellez avec votre hydratant.",
    category: 'Ingredients',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '6',
    titleEn: 'Collagen & Elastin: Protecting Your Skin Structure',
    titleFr: 'Collagène & Élastine : préserver la structure de votre peau',
    bodyEn: 'Collagen gives your skin its firmness and structure, while elastin provides elasticity. After 25, your body produces 1% less collagen per year. The best defense: SPF every day, vitamin C serums, retinol at night, and regular facial massage to stimulate fibroblasts.',
    bodyFr: "Le collagène donne à votre peau sa fermeté, tandis que l'élastine lui donne son élasticité. Après 25 ans, votre corps produit 1% de collagène en moins par an. La meilleure défense : protection solaire quotidienne, sérum vitamine C, rétinol le soir.",
    category: 'Science',
    readMinutes: 4,
    points: 10,
  },
  {
    id: '7',
    titleEn: 'Red Light Therapy: Science Behind the Glow',
    titleFr: "Luminothérapie rouge : la science derrière l'éclat",
    bodyEn: "Red light (630–700nm) penetrates deep into skin tissue, energizing cells to produce more collagen and elastin. Clinical studies show visible reduction in fine lines after 8–12 weeks of consistent use. Seasonly's Borrow Device program gives you access to professional-grade devices.",
    bodyFr: "La lumière rouge (630–700nm) pénètre profondément dans les tissus cutanés, stimulant les cellules à produire plus de collagène et d'élastine. Des études cliniques montrent une réduction visible des rides après 8 à 12 semaines d'utilisation régulière.",
    category: 'Technology',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '8',
    titleEn: 'Vitamin B3 & B5: The Skin-Strengthening Duo',
    titleFr: 'Vitamines B3 & B5 : le duo renforçant',
    bodyEn: 'Niacinamide (B3) reduces pore appearance, controls sebum, and evens skin tone — ideal for combination and acne-prone skin. Panthenol (B5) deeply hydrates and accelerates healing. Together, they build a stronger, more resilient skin barrier.',
    bodyFr: "La niacinamide (B3) réduit l'apparence des pores, contrôle le sébum et unifie le teint — idéale pour les peaux mixtes. Le panthénol (B5) hydrate en profondeur et accélère la guérison. Ensemble, ils renforcent la barrière cutanée.",
    category: 'Ingredients',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '9',
    titleEn: 'Jaw & Neck: The Forgotten Zones',
    titleFr: 'Mâchoire & cou : les zones oubliées',
    bodyEn: 'The jawline and neck are among the first areas to show signs of aging, yet most skincare routines stop at the chin. Extend all your skincare products down to your décolleté, and add 2 minutes of lymphatic drainage massage along the neck to reduce tension and define the contour.',
    bodyFr: "La mâchoire et le cou sont parmi les premières zones à montrer des signes de vieillissement, pourtant la plupart des routines s'arrêtent au menton. Étendez tous vos soins jusqu'au décolleté et ajoutez 2 minutes de massage de drainage lymphatique.",
    category: 'Technique',
    readMinutes: 2,
    points: 10,
  },
  {
    id: '10',
    titleEn: 'SPF Every Day: Non-Negotiable',
    titleFr: 'SPF chaque jour : non-négociable',
    bodyEn: "Up to 80% of visible skin aging is caused by UV exposure — including on cloudy days and through windows. Apply SPF 30–50 as the last step of your morning routine, every single day, all year round. It's the single most effective anti-aging product you can use.",
    bodyFr: "Jusqu'à 80% du vieillissement cutané visible est causé par l'exposition aux UV — même par temps nuageux ou à travers les vitres. Appliquez un SPF 30–50 en dernière étape de votre routine matinale, chaque jour, toute l'année.",
    category: 'Protection',
    readMinutes: 2,
    points: 10,
  },
];
