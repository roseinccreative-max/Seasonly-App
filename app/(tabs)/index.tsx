import { ScrollView, View, Text, TouchableOpacity, StyleSheet, ImageBackground, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';
import { tips } from '@/constants/tips';
import { useLanguage } from '@/contexts/LanguageContext';
import { conceptCards } from '@/constants/concept';

const quickActionDefs = [
  { key: 'home_book_massage', icon: 'calendar-outline' as const, route: '/(tabs)/book' },
  { key: 'home_daily_challenge', icon: 'flash-outline' as const, route: '/(tabs)/rewards' },
  { key: 'home_shop', icon: 'bag-outline' as const, route: '/(tabs)/shop' },
  { key: 'home_borrow_device', icon: 'phone-portrait-outline' as const, route: '/(tabs)/book' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

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
          <View style={styles.grid}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.label}
                style={styles.actionCard}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.8}
              >
                <Ionicons name={action.icon} size={28} color={Colors.primary} />
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Education — The Seasonly Method */}
          <View style={styles.educationHeader}>
            <Text style={styles.sectionTitle}>The Seasonly Method</Text>
            <TouchableOpacity onPress={() => router.push({ pathname: '/(screens)/concept-detail', params: { id: '1' } })}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.educationSub}>Science-backed skincare & facial fitness</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.conceptRow}>
            {conceptCards.map(card => (
              <TouchableOpacity
                key={card.id}
                style={styles.conceptCard}
                onPress={() => router.push({ pathname: '/(screens)/concept-detail', params: { id: card.id } })}
                activeOpacity={0.85}
              >
                <Text style={styles.conceptEmoji}>{card.icon}</Text>
                <Text style={styles.conceptTitle}>
                  {lang === 'fr' ? card.titleFr : card.titleEn}
                </Text>
                <Text style={styles.conceptSummary} numberOfLines={2}>
                  {lang === 'fr' ? card.summaryFr : card.summaryEn}
                </Text>
                <View style={styles.conceptReadRow}>
                  <Text style={styles.conceptReadText}>Read more</Text>
                  <Ionicons name="arrow-forward" size={13} color={Colors.primary} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 8 },
  actionCard: {
    width: '47.5%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionLabel: { fontSize: 13, fontWeight: '600', color: Colors.dark, textAlign: 'center' },
  educationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 4 },
  educationSub: { fontSize: 13, color: Colors.subtle, marginBottom: 16 },
  seeAllText: { fontSize: 13, fontWeight: '600', color: Colors.gold },
  conceptRow: { paddingRight: 20, gap: 12 },
  conceptCard: {
    width: 180,
    borderRadius: 18,
    padding: 18,
    justifyContent: 'space-between',
    minHeight: 160,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  conceptEmoji: { fontSize: 32, marginBottom: 10 },
  conceptTitle: { fontSize: 15, fontWeight: '800', color: Colors.dark, marginBottom: 6 },
  conceptSummary: { fontSize: 12, color: Colors.medium, lineHeight: 17, flex: 1 },
  conceptReadRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 12 },
  conceptReadText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
});
