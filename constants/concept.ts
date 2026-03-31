export interface ConceptCard {
  id: string;
  icon: string;
  titleEn: string;
  titleFr: string;
  summaryEn: string;
  summaryFr: string;
  bodyEn: string;
  bodyFr: string;
  color: string;
}

export const conceptCards: ConceptCard[] = [
  {
    id: '1',
    icon: '🧬',
    titleEn: 'Our Method',
    titleFr: 'Notre méthode',
    summaryEn: 'Kobido + Lymphatic Drainage + Face Sculpting®',
    summaryFr: 'Kobido + Drainage Lymphatique + Face Sculpting®',
    bodyEn: `Seasonly's protocol blends three complementary techniques to deliver immediate, lasting results — positioned as a natural alternative to aesthetic surgery.\n\n**Kobido Massage** — An ancient Japanese facial massage technique that stimulates the 57 facial muscles, boosts circulation, and promotes collagen production for a natural lifting effect.\n\n**Lymphatic Drainage** — Gentle rhythmic movements that activate the lymphatic system, reducing puffiness, eliminating toxins, and restoring radiance.\n\n**Face Sculpting®** — Seasonly's signature technique combining targeted muscle work and contouring movements to define facial structure and restore volume where it matters most.\n\nAll Seasonly facialists undergo comprehensive training at the Seasonly Academy to master these techniques.`,
    bodyFr: `Le protocole Seasonly combine trois techniques complémentaires pour des résultats immédiats et durables — une alternative naturelle à la chirurgie esthétique.\n\n**Massage Kobido** — Technique ancestrale japonaise qui stimule les 57 muscles du visage, booste la circulation et favorise la production de collagène pour un effet lifting naturel.\n\n**Drainage Lymphatique** — Mouvements doux et rythmés qui activent le système lymphatique, réduisant les gonflements et éliminant les toxines.\n\n**Face Sculpting®** — La technique signature Seasonly combinant un travail musculaire ciblé pour définir la structure faciale et restaurer le volume.`,
    color: '#EDE9F7',
  },
  {
    id: '2',
    icon: '🌿',
    titleEn: 'Clean Formulas',
    titleFr: 'Formules clean',
    summaryEn: '95% natural origin, no controversial ingredients',
    summaryFr: '95% d\'origine naturelle, sans ingrédients controversés',
    bodyEn: `At Seasonly, every formula is developed from scratch in our Parisian laboratory — no white-label products, ever.\n\n**Our ingredient philosophy:** We believe skincare safety depends on controlling your total daily exposure. The average person applies approximately 150 ingredients to their skin each day. Seasonly gives you control by eliminating controversial ingredients entirely.\n\n**Key actives we use:**\n• Hyaluronic Acid — deep hydration and plumping\n• Vitamin C — brightening and antioxidant protection\n• Niacinamide (B3) — pore refinement and sebum control\n• Panthenol (B5) — healing and barrier strengthening\n• Bakuchiol — natural retinol alternative\n• AHAs — gentle exfoliation and radiance\n\n**Plant-based heroes:** Annatto oil, rosehip, jojoba, and avocado — each chosen for their proven skin benefits and sensorial qualities.`,
    bodyFr: `Chez Seasonly, chaque formule est développée de zéro dans notre laboratoire parisien — jamais de produits en marque blanche.\n\n**Notre philosophie:** La sécurité des soins dépend du contrôle de votre exposition quotidienne totale. La personne moyenne applique environ 150 ingrédients sur sa peau chaque jour. Seasonly vous donne le contrôle en éliminant les ingrédients controversés.\n\n**Actifs clés:** Acide hyaluronique, vitamine C, niacinamide (B3), panthénol (B5), bakuchiol, AHAs.\n\n**Héros végétaux:** Huile d'annatto, rose musquée, jojoba et avocat.`,
    color: '#E8F5E9',
  },
  {
    id: '3',
    icon: '🔬',
    titleEn: 'Skin Science',
    titleFr: 'Science de la peau',
    summaryEn: 'Muscle is the foundation of lasting youth',
    summaryFr: 'Le muscle est le fondement d\'une jeunesse durable',
    bodyEn: `Seasonly was founded on a revolutionary insight: the key to lasting skin youth lies beneath the surface — in the 57 muscles of the face.\n\n**The muscle-skin connection:** As facial muscles weaken and lose tone with age, the skin above them loses its support structure. This causes sagging, loss of definition, and the appearance of fine lines — not just from collagen loss, but from structural collapse.\n\n**Our approach:** By actively stimulating facial muscles through targeted massage and sculpting techniques, Seasonly treatments rebuild the foundation from within. The result is a lifted, defined appearance that goes beyond what topical products alone can achieve.\n\n**The numbers:** Since 2018, Seasonly has analyzed over 150,000 faces and tested more than 1,000 formulas to develop protocols that deliver clinically measurable results.`,
    bodyFr: `Seasonly a été fondé sur une idée révolutionnaire : la clé d'une jeunesse durable se trouve sous la surface — dans les 57 muscles du visage.\n\n**Le lien muscle-peau:** À mesure que les muscles faciaux s'affaiblissent avec l'âge, la peau au-dessus perd son soutien, causant relâchement et perte de définition.\n\n**Notre approche:** En stimulant activement les muscles faciaux, les soins Seasonly reconstruisent la fondation de l'intérieur. Depuis 2018, Seasonly a analysé plus de 150 000 visages et testé plus de 1 000 formules.`,
    color: '#FFF8E7',
  },
  {
    id: '4',
    icon: '♻️',
    titleEn: 'Our Commitments',
    titleFr: 'Nos engagements',
    summaryEn: 'Sustainable, vegan, made in France',
    summaryFr: 'Durable, vegan, fabriqué en France',
    bodyEn: `Seasonly believes that beautiful skin and a beautiful planet go hand in hand. Our sustainability commitments are embedded in every product decision.\n\n**Packaging:**\n• All secondary packaging is FSC-certified and recyclable\n• Produced in France to minimize transport emissions\n• Ongoing elimination of plastic components\n• Glue-free packaging designs where possible\n\n**Formulation:**\n• 95% minimum natural-origin ingredients across all products\n• 100% vegan — no animal-derived ingredients\n• Never tested on animals\n• No controversial or harmful ingredients\n\n**Local production:** By manufacturing in France, Seasonly supports local craftsmanship, ensures quality control, and reduces the carbon footprint of every product that reaches your hands.`,
    bodyFr: `Seasonly croit que beauté et planète vont de pair. Nos engagements durables sont intégrés dans chaque décision produit.\n\n**Emballages:** Certifiés FSC, recyclables, produits en France, réduction continue des plastiques.\n\n**Formulation:** 95% minimum d'ingrédients d'origine naturelle, 100% vegan, jamais testé sur les animaux, sans ingrédients controversés.\n\n**Production locale:** En fabriquant en France, Seasonly soutient l'artisanat local et réduit l'empreinte carbone.`,
    color: '#E8F5E9',
  },
];
