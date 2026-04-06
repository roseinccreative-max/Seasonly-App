import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

// Comprehensive per-concept content with inline images
const conceptContent: Record<string, {
  titleEn: string; titleFr: string;
  image: string;
  sections: Array<{
    type: 'text' | 'heading' | 'image' | 'quote' | 'bullets';
    en?: string; fr?: string;
    items?: Array<{ en: string; fr: string }>;
    uri?: string;
  }>;
}> = {
  '1': {
    titleEn: 'Research & Expertise',
    titleFr: 'La recherche et l\'expertise',
    image: 'https://seasonly.fr/cdn/shop/files/La_recherche.jpg?v=1705051886&width=1200',
    sections: [
      { type: 'quote', en: 'Every formula is developed from scratch in our Parisian laboratory — no white-label products, ever.', fr: 'Chaque formule est développée de zéro dans notre laboratoire parisien — jamais de produits en marque blanche.' },
      { type: 'heading', en: 'Our laboratory', fr: 'Notre laboratoire' },
      { type: 'text', en: 'Since 2018, Seasonly has worked with leading cosmetic chemists in Paris to develop formulas that are both clinically effective and gentle on skin. We have tested over 1,000 formulas and analyzed more than 150,000 faces to understand what truly works.', fr: 'Depuis 2018, Seasonly travaille avec des chimistes cosmétiques de premier plan à Paris pour développer des formules à la fois cliniquement efficaces et douces pour la peau. Nous avons testé plus de 1 000 formules et analysé plus de 150 000 visages.' },
      { type: 'image', uri: 'https://seasonly.fr/cdn/shop/files/2023-tensiolift-devi-01.jpg?v=1696932424&width=800' },
      { type: 'heading', en: 'Formulation philosophy', fr: 'Philosophie de formulation' },
      { type: 'text', en: 'We never use white-label bases. Every product begins with a blank canvas — a brief, a target, and months of iteration with our chemists. The result is a formula engineered for both efficacy and skin compatibility.', fr: 'Nous n\'utilisons jamais de bases en marque blanche. Chaque produit commence par une page blanche — un brief, une cible, et des mois d\'itération avec nos chimistes.' },
      { type: 'bullets', items: [
        { en: 'Over 1,000 formulas tested since 2018', fr: 'Plus de 1 000 formules testées depuis 2018' },
        { en: '150,000+ faces analyzed', fr: 'Plus de 150 000 visages analysés' },
        { en: 'Each formula paired with a self-massage protocol', fr: 'Chaque formule associée à un protocole de self-massage' },
        { en: 'Constant innovation in active ingredients', fr: 'Innovation constante dans les actifs' },
      ]},
      { type: 'heading', en: 'Paired with gesture', fr: 'Associé au geste' },
      { type: 'text', en: 'What makes Seasonly unique is the pairing of each formula with an associated self-massage program. Products are designed to work in synergy with the massage techniques taught in our studios and app — maximising penetration, efficacy, and ritual.', fr: 'Ce qui rend Seasonly unique est l\'association de chaque formule à un programme de self-massage. Les produits sont conçus pour fonctionner en synergie avec les techniques de massage enseignées dans nos studios.' },
    ],
  },
  '2': {
    titleEn: 'Clean Formulas',
    titleFr: 'Notre charte de développement',
    image: 'https://seasonly.fr/cdn/shop/files/Notre_charte_de_dev.jpg?v=1705051886&width=1200',
    sections: [
      { type: 'quote', en: 'Skincare safety is about controlling your total daily exposure — not just individual ingredients.', fr: 'La sécurité des soins, c\'est contrôler votre exposition quotidienne totale — pas seulement des ingrédients individuels.' },
      { type: 'heading', en: 'The exposure problem', fr: 'Le problème de l\'exposition' },
      { type: 'text', en: 'The average person applies approximately 150 different ingredients to their skin every day — across moisturisers, serums, sunscreens, make-up, and hair products. Seasonly was founded on the belief that cumulative exposure matters as much as individual ingredient safety.', fr: 'La personne moyenne applique environ 150 ingrédients différents sur sa peau chaque jour. Seasonly a été fondé sur la conviction que l\'exposition cumulée compte autant que la sécurité des ingrédients individuels.' },
      { type: 'image', uri: 'https://seasonly.fr/cdn/shop/files/Creme_TensioLift_Packshot.png?v=1724937914&width=800' },
      { type: 'heading', en: 'What we exclude', fr: 'Ce que nous excluons' },
      { type: 'bullets', items: [
        { en: 'Parabens — linked to hormonal disruption', fr: 'Parabènes — liés à la perturbation hormonale' },
        { en: 'Sulphates — harsh surfactants that strip skin', fr: 'Sulfates — tensioactifs agressifs qui décapent la peau' },
        { en: 'Silicones — occlusive and non-biodegradable', fr: 'Silicones — occlusifs et non biodégradables' },
        { en: 'Synthetic fragrances — common allergens', fr: 'Parfums synthétiques — allergènes courants' },
        { en: 'Mineral oils — petrochemical derivatives', fr: 'Huiles minérales — dérivés pétrochimiques' },
        { en: 'PEGs — penetration enhancers of concern', fr: 'PEG — exhausteurs de pénétration préoccupants' },
      ]},
      { type: 'heading', en: 'Our guarantee', fr: 'Notre garantie' },
      { type: 'text', en: 'Every Seasonly formula contains a minimum of 95% naturally-derived ingredients. All products are 100% vegan, never tested on animals, and produced in France to our strict quality standards.', fr: 'Chaque formule Seasonly contient un minimum de 95% d\'ingrédients d\'origine naturelle. Tous les produits sont 100% vegan, jamais testés sur les animaux, et produits en France.' },
    ],
  },
  '3': {
    titleEn: 'Our Ingredients',
    titleFr: 'Nos ingrédients',
    image: 'https://seasonly.fr/cdn/shop/files/Nos_ingredients.jpg?v=1705051887&width=1200',
    sections: [
      { type: 'quote', en: 'We combine clinically-proven actives with the finest plant ingredients — each chosen for both efficacy and sensorial quality.', fr: 'Nous combinons des actifs cliniquement prouvés avec les meilleurs ingrédients végétaux — chacun choisi pour son efficacité et sa qualité sensorielle.' },
      { type: 'heading', en: 'Clinically-proven actives', fr: 'Actifs cliniquement prouvés' },
      { type: 'bullets', items: [
        { en: 'Hyaluronic Acid — draws moisture into skin, plumps and smooths', fr: 'Acide hyaluronique — attire l\'humidité dans la peau, repulpe et lisse' },
        { en: 'Vitamin C — brightens, protects against free radicals', fr: 'Vitamine C — éclaire, protège contre les radicaux libres' },
        { en: 'Niacinamide (B3) — refines pores, controls sebum, evens tone', fr: 'Niacinamide (B3) — resserre les pores, contrôle le sébum, unifie le teint' },
        { en: 'Panthenol (B5) — strengthens skin barrier, accelerates healing', fr: 'Panthénol (B5) — renforce la barrière cutanée, accélère la guérison' },
        { en: 'Bakuchiol — natural retinol alternative, firming without irritation', fr: 'Bakuchiol — alternative naturelle au rétinol, fermeté sans irritation' },
        { en: 'AHAs (Glycolic, Lactic) — gently exfoliate, reveal radiance', fr: 'AHAs (glycolique, lactique) — exfolient doucement, révèlent l\'éclat' },
      ]},
      { type: 'image', uri: 'https://seasonly.fr/cdn/shop/files/HuileTensioLiftPackshot30mlLiftOleoactifavecombre.png?v=1708612104&width=800' },
      { type: 'heading', en: 'Plant-based heroes', fr: 'Héros végétaux' },
      { type: 'bullets', items: [
        { en: 'Rosehip oil — rich in omega 3 & 6, regenerating and brightening', fr: 'Huile de rose musquée — riche en oméga 3 & 6, régénérante et éclairante' },
        { en: 'Jojoba — structurally similar to sebum, balancing and nourishing', fr: 'Jojoba — similaire au sébum, équilibrant et nourrissant' },
        { en: 'Avocado — deeply nourishing, rich in oleic acid and vitamins A, D, E', fr: 'Avocat — profondément nourrissant, riche en acide oléique et vitamines A, D, E' },
        { en: 'Annatto oil — potent antioxidant, protects against oxidative stress', fr: 'Huile d\'annatto — puissant antioxydant, protège contre le stress oxydatif' },
      ]},
      { type: 'text', en: 'Every ingredient in every Seasonly product has been selected for a specific purpose. We never use fillers, artificial dyes, or ingredients that exist purely for texture or shelf-appeal.', fr: 'Chaque ingrédient dans chaque produit Seasonly a été sélectionné dans un but précis. Nous n\'utilisons jamais de charges, de colorants artificiels ou d\'ingrédients qui n\'existent que pour la texture.' },
    ],
  },
  '4': {
    titleEn: 'Our Facial Expertise',
    titleFr: 'Notre expertise facialiste',
    image: 'https://seasonly.fr/cdn/shop/files/Soin_Geste_Pause_01_Zoom_Horizontale_16-9.jpg?v=1706629731&width=1200',
    sections: [
      { type: 'quote', en: 'The 57 muscles of your face are the foundation of lasting youth — not just what sits on top of them.', fr: 'Les 57 muscles de votre visage sont le fondement d\'une jeunesse durable — pas seulement ce qui les recouvre.' },
      { type: 'heading', en: 'The muscle-skin connection', fr: 'La connexion muscle-peau' },
      { type: 'text', en: 'As we age, the facial muscles weaken and lose tone. The skin above them — no longer supported from beneath — begins to sag and lose definition. This structural collapse is responsible for much of what we associate with ageing, and it cannot be addressed by topical products alone.', fr: 'En vieillissant, les muscles faciaux s\'affaiblissent et perdent leur tonus. La peau au-dessus d\'eux — n\'étant plus soutenue — commence à s\'affaisser. Cet effondrement structurel ne peut pas être traité par des produits topiques seuls.' },
      { type: 'image', uri: 'https://seasonly.fr/cdn/shop/files/sleep-massage-02_92a73607-7d98-4429-8610-396b1502c875.jpg?v=1696510141&width=800' },
      { type: 'heading', en: 'The three techniques', fr: 'Les trois techniques' },
      { type: 'text', en: 'Seasonly\'s proprietary protocol combines three complementary approaches for immediate, visible results:', fr: 'Le protocole propriétaire de Seasonly combine trois approches complémentaires pour des résultats immédiats et visibles:' },
      { type: 'bullets', items: [
        { en: 'Kobido Massage — Ancient Japanese technique stimulating all 57 facial muscles. Boosts micro-circulation, promotes collagen synthesis, delivers an immediate natural lifting effect.', fr: 'Massage Kobido — Technique japonaise ancestrale stimulant les 57 muscles faciaux. Booste la micro-circulation, favorise la synthèse du collagène, effet lifting naturel immédiat.' },
        { en: 'Lymphatic Drainage — Gentle rhythmic movements that activate the lymphatic system, reduce puffiness, eliminate toxins, and restore clarity and radiance to the complexion.', fr: 'Drainage Lymphatique — Mouvements doux et rythmés qui activent le système lymphatique, réduisent les gonflements, éliminent les toxines et restaurent la clarté du teint.' },
        { en: 'Face Sculpting® — Seasonly\'s signature technique. Targeted muscle work and contouring movements that define the jawline, lift the cheekbones, and restore volume to key facial areas.', fr: 'Face Sculpting® — La technique signature de Seasonly. Travail musculaire ciblé et mouvements de contourage qui définissent la mâchoire, soulèvent les pommettes et restaurent le volume.' },
      ]},
      { type: 'heading', en: 'The Seasonly Academy', fr: 'La Seasonly Academy' },
      { type: 'text', en: 'Every Seasonly facialist undergoes comprehensive training at the Seasonly Academy before treating a single client. The training programme covers anatomy, muscle mapping, all three techniques, product application and the full Seasonly protocol.', fr: 'Chaque facialiste Seasonly suit une formation complète à la Seasonly Academy avant de traiter un seul client. Le programme de formation couvre l\'anatomie, la cartographie musculaire, les trois techniques et le protocole complet Seasonly.' },
    ],
  },
  '5': {
    titleEn: 'Our Story',
    titleFr: 'Notre histoire',
    image: 'https://seasonly.fr/cdn/shop/files/Notre_histoire.jpg?v=1705051886&width=1200',
    sections: [
      { type: 'quote', en: 'Founded in Paris in 2018 with a single conviction: real skin transformation comes from within.', fr: 'Fondée à Paris en 2018 avec une conviction unique: la vraie transformation cutanée vient de l\'intérieur.' },
      { type: 'heading', en: 'The beginning', fr: 'Le début' },
      { type: 'text', en: 'Seasonly was born out of a frustration with the beauty industry. Founders noticed that skincare routines were growing increasingly complex — and increasingly ineffective. Products promised results but rarely delivered lasting change.', fr: 'Seasonly est né d\'une frustration vis-à-vis de l\'industrie de la beauté. Les fondateurs ont remarqué que les routines de soins devenaient de plus en plus complexes — et de moins en moins efficaces.' },
      { type: 'image', uri: 'https://seasonly.fr/cdn/shop/files/SEASONLY_JAN26_JULIETTE__87-extend_bg_1.png?v=1773931961&width=800' },
      { type: 'heading', en: 'A different approach', fr: 'Une approche différente' },
      { type: 'text', en: 'The insight was simple but radical: the skin\'s underlying structure — its muscles — had been completely ignored by the industry. By combining clean, clinically-effective formulas with professional massage techniques, Seasonly created a genuinely holistic approach to skin health.', fr: 'L\'insight était simple mais radical: la structure sous-jacente de la peau — ses muscles — avait été complètement ignorée par l\'industrie. En combinant des formules clean et cliniquement efficaces avec des techniques de massage professionnel, Seasonly a créé une approche véritablement holistique.' },
      { type: 'heading', en: 'Today', fr: 'Aujourd\'hui' },
      { type: 'bullets', items: [
        { en: '10 studios across France — Paris, Nice, Bordeaux, Lille, Lyon, Nantes, Montpellier', fr: '10 studios à travers la France — Paris, Nice, Bordeaux, Lille, Lyon, Nantes, Montpellier' },
        { en: '150,000+ faces analyzed and treated', fr: 'Plus de 150 000 visages analysés et traités' },
        { en: '1,000+ formulas tested before launch', fr: 'Plus de 1 000 formules testées avant le lancement' },
        { en: 'Featured in Vogue, ELLE, Madame Figaro and L\'Officiel', fr: 'Mentionné dans Vogue, ELLE, Madame Figaro et L\'Officiel' },
        { en: 'Available in studio and at-home via the Seasonly app', fr: 'Disponible en studio et à la maison via l\'application Seasonly' },
      ]},
      { type: 'text', en: 'Seasonly\'s mission remains unchanged: to give everyone access to the techniques and formulas that were once exclusive to Parisian skin professionals — and to make beautiful, healthy skin the result of intelligent daily ritual, not luck or genetics.', fr: 'La mission de Seasonly reste inchangée: donner à tous accès aux techniques et formules qui étaient autrefois exclusives aux professionnels de la peau parisiens.' },
    ],
  },
};

export default function ConceptDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lang } = useLanguage();

  const content = conceptContent[id as string];
  if (!content) return null;

  const title = lang === 'fr' ? content.titleFr : content.titleEn;

  const renderSection = (section: typeof content.sections[0], idx: number) => {
    switch (section.type) {
      case 'heading':
        return (
          <Text key={idx} style={styles.sectionHeading}>
            {lang === 'fr' ? section.fr : section.en}
          </Text>
        );
      case 'text':
        return (
          <Text key={idx} style={styles.bodyText}>
            {lang === 'fr' ? section.fr : section.en}
          </Text>
        );
      case 'quote':
        return (
          <View key={idx} style={styles.quoteBlock}>
            <View style={styles.quoteLine} />
            <Text style={styles.quoteText}>
              {lang === 'fr' ? section.fr : section.en}
            </Text>
          </View>
        );
      case 'image':
        return (
          <Image key={idx} source={{ uri: section.uri }} style={styles.inlineImage} resizeMode="cover" />
        );
      case 'bullets':
        return (
          <View key={idx} style={styles.bulletList}>
            {section.items?.map((item, j) => (
              <View key={j} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{lang === 'fr' ? item.fr : item.en}</Text>
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: content.image }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.heroTitleWrap}>
            <Text style={styles.heroTitle}>{title}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {content.sections.map((section, idx) => renderSection(section, idx))}
        </View>

        {/* Next article */}
        <View style={styles.nextWrap}>
          <Text style={styles.nextLabel}>NEXT</Text>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => {
              const nextId = String((parseInt(id as string) % 5) + 1);
              router.replace(`/(tabs)/concept/${nextId}` as any);
            }}
          >
            <Text style={styles.nextTitle}>
              {lang === 'fr'
                ? conceptContent[String((parseInt(id as string) % 5) + 1)]?.titleFr
                : conceptContent[String((parseInt(id as string) % 5) + 1)]?.titleEn}
            </Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.dark} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  heroWrap: { position: 'relative', height: 380 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitleWrap: {
    position: 'absolute',
    bottom: 28,
    left: 24,
    right: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 0.5,
    lineHeight: 40,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  quoteBlock: {
    flexDirection: 'row',
    marginBottom: 28,
    gap: 16,
  },
  quoteLine: {
    width: 3,
    backgroundColor: Colors.dark,
    borderRadius: 2,
  },
  quoteText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '300',
    color: Colors.dark,
    lineHeight: 28,
    fontStyle: 'italic',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
    marginTop: 28,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  bodyText: {
    fontSize: 15,
    color: Colors.medium,
    lineHeight: 26,
    marginBottom: 16,
  },
  inlineImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginVertical: 24,
  },
  bulletList: { marginBottom: 16 },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 12,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.dark,
    marginTop: 9,
    flexShrink: 0,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: Colors.medium,
    lineHeight: 23,
  },
  nextWrap: {
    marginHorizontal: 24,
    marginTop: 8,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  nextLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: Colors.subtle,
    marginBottom: 10,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
    flex: 1,
    marginRight: 12,
  },
});
