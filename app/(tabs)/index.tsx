import { Animated, ScrollView, View, Text, TouchableOpacity, StyleSheet, ImageBackground, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';
import { tips } from '@/constants/tips';
import { useLanguage } from '@/contexts/LanguageContext';
import { conceptCards } from '@/constants/concept';
import { products } from '@/constants/products';

const quickActionDefs = [
  {
    key: 'home_book_massage',
    route: '/(tabs)/book',
    image: 'https://seasonly.fr/cdn/shop/files/sleep-massage-02_92a73607-7d98-4429-8610-396b1502c875.jpg?v=1696510141&width=400',
  },
  {
    key: 'home_daily_challenge',
    route: '/(tabs)/rewards',
    image: 'https://seasonly.fr/cdn/shop/files/SEASONLY_JAN26_JULIETTE__87-extend_bg_1.png?v=1773931961&width=400',
  },
  {
    key: 'home_shop',
    route: '/(tabs)/shop',
    image: '',
    images: [
      'https://seasonly.fr/cdn/shop/files/Creme_TensioLift_Packshot.png?v=1724937914&width=300',
      'https://seasonly.fr/cdn/shop/files/HuileTensioLiftPackshot30mlLiftOleoactifavecombre.png?v=1708612104&width=300',
      'https://seasonly.fr/cdn/shop/files/SerumRegard.png?v=1700759931&width=300',
      'https://seasonly.fr/cdn/shop/files/HuiledeNuit30ml.png?v=1700758213&width=300',
    ],
  },
  {
    key: 'home_borrow_device',
    route: '/(tabs)/book',
    image: 'https://seasonly.fr/cdn/shop/files/2023-tensiolift-devi-01.jpg?v=1696932424&width=400',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Fade in the sticky header once user scrolls past the hero
  const pastHeroOpacity = scrollY.interpolate({ inputRange: [240, 320], outputRange: [0, 1], extrapolate: 'clamp' });

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const fix = () => {
      const img = document.querySelector('img') as HTMLImageElement | null;
      if (!img) return;
      const wrapper = img.parentElement as HTMLElement | null;
      if (!wrapper) return;
      // Make the wrapper fill the hero absolutely
      wrapper.style.position = 'absolute';
      wrapper.style.top = '0';
      wrapper.style.left = '0';
      wrapper.style.width = '100%';
      wrapper.style.height = '100%';
      wrapper.style.overflow = 'hidden';
      // Make the img cover the wrapper with proper scaling
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center';
      img.style.marginLeft = '0';
      img.style.marginTop = '0';
    };
    const t1 = setTimeout(fix, 50);
    const t2 = setTimeout(fix, 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  const { lang, t } = useLanguage();
  const todayTip = tips[0];
  const tipTitle = lang === 'fr' ? todayTip.titleFr : todayTip.titleEn;
  const quickActions = quickActionDefs.map(a => ({ ...a, label: t(a.key) }));
  const bestSellers = products.filter(p => p.description.toLowerCase().includes('best seller')).slice(0, 6);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>

      {/* ── Sticky floating header — fades in dark once past hero ─── */}
      <Animated.View
        style={[styles.floatingHeader, { paddingTop: insets.top + 14, opacity: pastHeroOpacity }]}
      >
        {/* Left spacer — matches icon row width so logo is truly centered */}
        <View style={styles.floatingHeaderSide} />
        {/* Logo centered */}
        <Image
          source={require('../../assets/LOGO_Seasonly_Paris_NOIR_2.png')}
          style={styles.heroLogo}
          resizeMode="contain"
        />
        {/* Icons right */}
        <View style={[styles.heroIconRow, styles.floatingHeaderSide, { justifyContent: 'flex-end' }]}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/shop' as any)} activeOpacity={0.8}>
            <Ionicons name="bag-outline" size={26} color={Colors.dark} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile' as any)} activeOpacity={0.8}>
            <Ionicons name="person-circle-outline" size={30} color={Colors.dark} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <Animated.ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >

        {/* ── Hero ──────────────────────────────────────────── */}
        <ImageBackground
          source={require('../../assets/hero2.png')}
          style={[styles.hero, { paddingTop: insets.top + 14 }]}
          imageStyle={styles.heroImg}
          {...(Platform.OS === 'web' ? { 'data-hero': '1' } as any : {})}
        >
          <View style={styles.heroDim} />

          {/* Top bar: logo left, icons right */}
          <View style={styles.heroTopRow}>
            <Image source={require('../../assets/LOGO_Seasonly_Paris_NOIR_2.png')} style={styles.heroLogo} resizeMode="contain" />
            <View style={styles.heroIconRow}>
              <TouchableOpacity onPress={() => router.push('/(tabs)/shop' as any)} activeOpacity={0.8}>
                <Ionicons name="bag-outline" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/(tabs)/profile' as any)} activeOpacity={0.8}>
                <Ionicons name="person-circle-outline" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome text at bottom of hero */}
          <View style={styles.heroBottom}>
            <Text style={styles.heroGreeting}>{t('home_greeting')}, {mockUser.name}</Text>
            <Text style={styles.heroSub}>{t('home_subtitle')}</Text>
            {/* Shop + Book buttons */}
            <View style={styles.heroBtns}>
              <TouchableOpacity style={styles.heroShopBtn} onPress={() => router.push('/(tabs)/shop' as any)} activeOpacity={0.85}>
                <Ionicons name="bag-outline" size={14} color="#fff" />
                <Text style={styles.heroShopBtnText}>Shop Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroBookBtn} onPress={() => router.push('/(tabs)/book' as any)} activeOpacity={0.85}>
                <Ionicons name="calendar-outline" size={14} color={Colors.dark} />
                <Text style={styles.heroBookBtnText}>Book a Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* ── Floating overlap card ──────────────────────────── */}
        <View style={styles.floatCard}>
          <View style={styles.floatItem}>
            <Text style={styles.floatEmoji}>🔥</Text>
            <View>
              <Text style={styles.floatNum}>{mockUser.streak}</Text>
              <Text style={styles.floatLabel}>{t('home_day_streak')}</Text>
            </View>
          </View>
          <View style={styles.floatDivider} />
          <View style={styles.floatItem}>
            <Text style={styles.floatEmoji}>🏆</Text>
            <View>
              <Text style={styles.floatNum}>{mockUser.skinMiles.toLocaleString()}</Text>
              <Text style={styles.floatLabel}>{t('home_skin_miles')}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/rewards' as any)} activeOpacity={0.7}>
            <Ionicons name="chevron-forward" size={20} color={Colors.subtle} />
          </TouchableOpacity>
        </View>

        {/* ── Main content ──────────────────────────────────── */}
        <View style={styles.content}>

          {/* Daily Wellness Tip */}
          <TouchableOpacity
            style={styles.tipCard}
            onPress={() => router.push({ pathname: '/(screens)/tip-detail', params: { id: todayTip.id } })}
            activeOpacity={0.85}
          >
            <View style={styles.tipHeader}>
              <View style={styles.tipLeft}>
                <Ionicons name="book-outline" size={16} color={Colors.medium} />
                <Text style={styles.tipTitle}> {t('home_daily_tip')}</Text>
              </View>
              <View style={styles.newBadge}>
                <Text style={styles.newText}>{t('home_new_badge')}</Text>
              </View>
            </View>
            <Text style={styles.tipHeading}>{tipTitle}</Text>
            <Text style={styles.tipDesc}>
              Start your day with this simple yet powerful hydration ritual for glowing skin.
            </Text>
            <Text style={styles.tipCta}>{t('home_tap_to_read')}</Text>
          </TouchableOpacity>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>{t('home_quick_actions')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.actionRow}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.label}
                style={styles.actionWrapper}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.85}
              >
                <View style={styles.actionCard}>
                  {action.images ? (
                    <View style={styles.actionGrid}>
                      {action.images.map((img, i) => (
                        <Image key={i} source={{ uri: img }} style={styles.actionGridImg} />
                      ))}
                    </View>
                  ) : (
                    <Image source={{ uri: action.image }} style={styles.actionImage} resizeMode="cover" />
                  )}
                </View>
                <Text style={styles.actionLabel}>{action.label.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Best Sellers */}
          <View style={styles.educationHeader}>
            <Text style={styles.sectionTitle}>Best Sellers</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/shop' as any)}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bsRow}>
            {bestSellers.map(p => (
              <TouchableOpacity
                key={p.id}
                style={styles.bsCard}
                onPress={() => router.push(`/(tabs)/shop/${p.id}` as any)}
                activeOpacity={0.85}
              >
                <View style={styles.bsImgWrap}>
                  <Image source={{ uri: p.imageUrl }} style={styles.bsImage} resizeMode="contain" />
                </View>
                <Text style={styles.bsName} numberOfLines={2}>{p.title}</Text>
                <Text style={styles.bsPrice} numberOfLines={1}>{p.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Education — The Seasonly Method */}
          <View style={styles.educationHeader}>
            <Text style={styles.sectionTitle}>The Seasonly Method</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/concept' as any)}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.educationSub}>Science-backed skincare & facial fitness</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.conceptRow}>
            {conceptCards.map(card => (
              <TouchableOpacity
                key={card.id}
                style={styles.conceptCard}
                onPress={() => router.push(`/(tabs)/concept/${card.id}` as any)}
                activeOpacity={0.85}
              >
                <Image source={{ uri: card.image }} style={styles.conceptImage} resizeMode="cover" />
                <View style={styles.conceptBody}>
                  <Text style={styles.conceptTitle} numberOfLines={2}>
                    {lang === 'fr' ? card.titleFr : card.titleEn}
                  </Text>
                  <View style={styles.conceptReadRow}>
                    <Text style={styles.conceptReadText}>Read more</Text>
                    <Ionicons name="arrow-forward" size={13} color={Colors.dark} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </View>
      </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  floatingHeaderSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 40 },

  // Hero
  hero: {
    height: 320,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  heroImg: { resizeMode: 'cover', objectFit: 'cover', objectPosition: 'center' } as any,
  heroDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLogo: {
    width: 110,
    height: 40,
  },
  heroIconRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  heroBottom: {},
  heroGreeting: { fontSize: 26, fontWeight: '300', color: Colors.dark, marginBottom: 4 },
  heroSub: { fontSize: 13, color: Colors.medium, marginBottom: 18 },
  heroBtns: { flexDirection: 'row', gap: 10 },
  heroShopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.dark,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
  },
  heroShopBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  heroBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
  },
  heroBookBtnText: { color: Colors.dark, fontWeight: '700', fontSize: 13 },

  // Floating overlap card
  floatCard: {
    marginHorizontal: 20,
    marginTop: -44,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 10,
  },
  floatItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  floatEmoji: { fontSize: 24 },
  floatNum: { fontSize: 20, fontWeight: '800', color: Colors.dark },
  floatLabel: { fontSize: 11, color: Colors.subtle, marginTop: 2 },
  floatDivider: { width: 1, height: 36, backgroundColor: Colors.border, marginHorizontal: 8 },

  // Main content
  content: { paddingHorizontal: 20, paddingTop: 20 },

  tipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipLeft: { flexDirection: 'row', alignItems: 'center' },
  tipTitle: { color: Colors.medium, fontWeight: '600', fontSize: 13 },
  newBadge: {
    backgroundColor: Colors.dark,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  newText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  tipHeading: { fontSize: 17, fontWeight: '700', color: Colors.dark, marginBottom: 6 },
  tipDesc: { fontSize: 13, color: Colors.medium, marginBottom: 10, lineHeight: 20 },
  tipCta: { color: Colors.medium, fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  actionRow: { gap: 12, paddingRight: 20, marginBottom: 32 },
  actionWrapper: { width: 200 },
  actionCard: {
    width: 200,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionImage: {
    width: '100%',
    aspectRatio: 1,
  },
  actionGrid: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionGridImg: {
    width: '50%',
    height: '50%',
    backgroundColor: '#F0EDE8',
  },
  actionLabel: { fontSize: 11, fontWeight: '700', color: Colors.dark, letterSpacing: 1.5, marginTop: 10 },
  bsRow: { gap: 12, paddingRight: 20, marginBottom: 28 },
  bsCard: { width: 140 },
  bsImgWrap: { width: 140, height: 140, backgroundColor: '#F5F5F5', borderRadius: 14, marginBottom: 10, alignItems: 'center', justifyContent: 'center' },
  bsImage: { width: '85%', height: '85%' },
  bsName: { fontSize: 12, fontWeight: '600', color: Colors.dark, marginBottom: 4, lineHeight: 17 },
  bsPrice: { fontSize: 11, color: Colors.subtle },
  educationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  educationSub: { fontSize: 13, color: Colors.subtle, marginBottom: 16 },
  seeAllText: { fontSize: 13, fontWeight: '600', color: Colors.gold },
  conceptRow: { paddingRight: 20, gap: 12 },
  conceptCard: {
    width: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  conceptImage: { width: '100%', height: 140 },
  conceptBody: { padding: 14 },
  conceptTitle: { fontSize: 14, fontWeight: '700', color: Colors.dark, marginBottom: 10 },
  conceptReadRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  conceptReadText: { fontSize: 12, fontWeight: '700', color: Colors.dark },
});
