export interface ConceptCard {
  id: string;
  titleEn: string;
  titleFr: string;
  summaryEn: string;
  summaryFr: string;
  bodyEn: string;
  bodyFr: string;
  image: string;
}

export const conceptCards: ConceptCard[] = [
  {
    id: '1',
    image: 'https://seasonly.fr/cdn/shop/files/La_recherche.jpg?v=1705051886&width=800',
    titleEn: 'Research & Expertise',
    titleFr: 'La recherche et l\'expertise',
    summaryEn: 'Custom formulas developed from scratch in our Parisian laboratory',
    summaryFr: 'Formules développées de zéro dans notre laboratoire parisien',
    bodyEn: `Seasonly develops every formula from scratch in our Parisian laboratory — no white-label products, ever.\n\nConstant innovation in actives, coupled with an associated self-massage program, ensures our products deliver measurable results.\n\n**Our approach:** We work with leading cosmetic chemists to source and test cutting-edge ingredients, testing over 1,000 formulas since 2018 to find what truly works for your skin.`,
    bodyFr: `Seasonly développe chaque formule de zéro dans notre laboratoire parisien — jamais de produits en marque blanche.\n\nL'innovation constante dans les actifs, couplée à un programme de self-massage associé, garantit des résultats mesurables.\n\n**Notre approche:** Nous travaillons avec des chimistes cosmétiques de premier plan pour sourcer et tester des ingrédients de pointe, testant plus de 1 000 formules depuis 2018.`,
  },
  {
    id: '2',
    image: 'https://seasonly.fr/cdn/shop/files/Notre_charte_de_dev.jpg?v=1705051886&width=800',
    titleEn: 'Clean Formulas',
    titleFr: 'Notre charte de développement',
    summaryEn: '95% natural origin, no controversial ingredients',
    summaryFr: '95% d\'origine naturelle, sans ingrédients controversés',
    bodyEn: `At Seasonly, skincare safety depends on controlling your total daily exposure. The average person applies approximately 150 ingredients to their skin each day.\n\nSeasonly gives you control by eliminating controversial ingredients entirely from every formula.\n\n**Key actives we use:**\n• Hyaluronic Acid — deep hydration and plumping\n• Vitamin C — brightening and antioxidant protection\n• Niacinamide (B3) — pore refinement and sebum control\n• Bakuchiol — natural retinol alternative\n• AHAs — gentle exfoliation and radiance`,
    bodyFr: `Chez Seasonly, la sécurité des soins dépend du contrôle de votre exposition quotidienne totale. La personne moyenne applique environ 150 ingrédients sur sa peau chaque jour.\n\nSeasonly vous donne le contrôle en éliminant les ingrédients controversés de chaque formule.\n\n**Actifs clés:**\n• Acide hyaluronique — hydratation profonde\n• Vitamine C — éclat et protection antioxydante\n• Niacinamide (B3) — resserrement des pores\n• Bakuchiol — alternative naturelle au rétinol\n• AHAs — exfoliation douce et radiance`,
  },
  {
    id: '3',
    image: 'https://seasonly.fr/cdn/shop/files/Nos_ingredients.jpg?v=1705051887&width=800',
    titleEn: 'Our Ingredients',
    titleFr: 'Nos ingrédients',
    summaryEn: 'Clinically-proven actives and raw plant ingredients',
    summaryFr: 'Actifs cliniquement prouvés et ingrédients végétaux bruts',
    bodyEn: `Our formulas combine clinically-proven actives with the finest raw plant ingredients:\n\n**Clinically-proven actives:** Hyaluronic acid, niacinamide, vitamin C, bakuchiol, AHAs — each selected for measurable skin benefits.\n\n**Plant-based heroes:**\n• Rosehip — regenerating and brightening\n• Jojoba — balancing and nourishing\n• Avocado — rich in omega fatty acids\n• Annatto oil — antioxidant-rich and protective\n\nEvery ingredient is chosen for both its proven efficacy and its sensorial quality.`,
    bodyFr: `Nos formules combinent des actifs cliniquement prouvés avec les meilleurs ingrédients végétaux bruts:\n\n**Actifs cliniquement prouvés:** Acide hyaluronique, niacinamide, vitamine C, bakuchiol, AHAs.\n\n**Héros végétaux:**\n• Rose musquée — régénérante et éclairante\n• Jojoba — équilibrante et nourrissante\n• Avocat — riche en acides gras oméga\n• Huile d'annatto — riche en antioxydants`,
  },
  {
    id: '4',
    image: 'https://seasonly.fr/cdn/shop/files/Soin_Geste_Pause_01_Zoom_Horizontale_16-9.jpg?v=1706629731&width=800',
    titleEn: 'Our Facial Expertise',
    titleFr: 'Notre expertise facialiste',
    summaryEn: 'Kobido + Lymphatic Drainage + Face Sculpting®',
    summaryFr: 'Kobido + Drainage Lymphatique + Face Sculpting®',
    bodyEn: `Seasonly's proprietary protocol combines three complementary techniques to deliver immediate, lasting results — a natural alternative to aesthetic surgery.\n\n**Kobido Massage** — An ancient Japanese technique stimulating the 57 facial muscles, boosting circulation and promoting collagen production for a natural lifting effect.\n\n**Lymphatic Drainage** — Gentle rhythmic movements that activate the lymphatic system, reducing puffiness and restoring radiance.\n\n**Face Sculpting®** — Seasonly's signature technique combining targeted muscle work and contouring movements to define facial structure.\n\nAll Seasonly facialists are trained at the Seasonly Academy.`,
    bodyFr: `Le protocole Seasonly combine trois techniques complémentaires pour des résultats immédiats et durables.\n\n**Massage Kobido** — Technique ancestrale japonaise stimulant les 57 muscles du visage pour un effet lifting naturel.\n\n**Drainage Lymphatique** — Mouvements doux réduisant les gonflements et restaurant l'éclat.\n\n**Face Sculpting®** — La technique signature Seasonly pour définir la structure faciale.\n\nTous les facialistes Seasonly sont formés à la Seasonly Academy.`,
  },
  {
    id: '5',
    image: 'https://seasonly.fr/cdn/shop/files/Notre_histoire.jpg?v=1705051886&width=800',
    titleEn: 'Our Story',
    titleFr: 'Notre histoire',
    summaryEn: 'Since 2018, redefining skincare through science and gesture',
    summaryFr: 'Depuis 2018, redéfinir les soins par la science et le geste',
    bodyEn: `Since 2018, Seasonly has pioneered a new approach to skincare — one that combines clean, clinically-proven formulas with professional facial massage techniques.\n\nFounded in Paris, Seasonly started with a simple belief: that the skin's structure, particularly its underlying muscles, is the key to lasting youth.\n\n**By the numbers:**\n• 150,000+ faces analyzed since 2018\n• 1,000+ formulas tested\n• 10 studios across France\n• Trusted by Vogue, ELLE, Madame Figaro and L'Officiel`,
    bodyFr: `Depuis 2018, Seasonly a inauguré une nouvelle approche des soins — combinant des formules clean et cliniquement prouvées avec des techniques de massage facial professionnel.\n\nFondée à Paris, Seasonly a débuté avec une conviction simple: que la structure de la peau, en particulier ses muscles sous-jacents, est la clé d'une jeunesse durable.\n\n**En chiffres:**\n• Plus de 150 000 visages analysés depuis 2018\n• Plus de 1 000 formules testées\n• 10 studios en France\n• Cité par Vogue, ELLE, Madame Figaro et L'Officiel`,
  },
];
