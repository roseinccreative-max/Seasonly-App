import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';
import { tips } from '@/constants/tips';
import { useLanguage } from '@/contexts/LanguageContext';
import { conceptCards } from '@/constants/concept';
import { HeaderIcons } from '@/components/ui/HeaderIcons';

const quickActionDefs = [
  { key: 'home_book_massage', icon: 'calendar-outline' as const, route: '/(tabs)/book' },
  { key: 'home_daily_challenge', icon: 'flash-outline' as const, route: '/(tabs)/rewards' },
  { key: 'home_shop', icon: 'bag-outline' as const, route: '/(tabs)/shop' },
  { key: 'home_borrow_device', icon: 'phone-portrait-outline' as const, route: '/(tabs)/book' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const todayTip = tips[0];
  const tipTitle = lang === 'fr' ? todayTip.titleFr : todayTip.titleEn;
  const quickActions = quickActionDefs.map(a => ({ ...a, label: t(a.key) }));
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>{t('home_greeting')}, {mockUser.name}</Text>
            <Text style={styles.sub}>{t('home_subtitle')}</Text>
          </View>
          <View style={styles.headerRight}>
            <HeaderIcons />
          </View>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <View style={styles.streakNumRow}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <Text style={styles.streakNum}> {mockUser.streak}</Text>
            </View>
            <Text style={styles.streakLabel}>{t('home_day_streak')}</Text>
          </View>
          <View style={styles.streakRight}>
            <View style={styles.milesNumRow}>
              <Text style={styles.milesNum}>{mockUser.skinMiles.toLocaleString()}</Text>
              <Text style={styles.milesEmoji}> 🏆</Text>
            </View>
            <Text style={styles.milesLabel}>{t('home_skin_miles')}</Text>
          </View>
        </View>

        {/* Daily Wellness Tip */}
        <TouchableOpacity style={styles.tipCard} onPress={() => router.push({ pathname: '/(screens)/tip-detail', params: { id: todayTip.id } })} activeOpacity={0.85}>
          <View style={styles.tipHeader}>
            <View style={styles.tipLeft}>
              <Ionicons name="book-outline" size={16} color={Colors.purple} />
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  greeting: { fontSize: 22, fontWeight: '800', color: Colors.dark },
  sub: { fontSize: 13, color: Colors.subtle, marginTop: 3 },
  proBadge: {
    backgroundColor: '#FFF3E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  proText: { color: Colors.gold, fontWeight: '700', fontSize: 12 },
  streakCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  streakLeft: { alignItems: 'flex-start' },
  streakNumRow: { flexDirection: 'row', alignItems: 'center' },
  streakEmoji: { fontSize: 20 },
  streakNum: { fontSize: 24, fontWeight: '800', color: Colors.dark },
  streakLabel: { fontSize: 12, color: Colors.subtle, marginTop: 2 },
  streakRight: { alignItems: 'flex-end' },
  milesNumRow: { flexDirection: 'row', alignItems: 'center' },
  milesNum: { fontSize: 24, fontWeight: '800', color: Colors.dark },
  milesEmoji: { fontSize: 20 },
  milesLabel: { fontSize: 12, color: Colors.subtle, marginTop: 2 },
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
  tipTitle: { color: Colors.purple, fontWeight: '600', fontSize: 13 },
  newBadge: {
    backgroundColor: Colors.green,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  newText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  tipHeading: { fontSize: 17, fontWeight: '700', color: Colors.dark, marginBottom: 6 },
  tipDesc: { fontSize: 13, color: Colors.medium, marginBottom: 10, lineHeight: 20 },
  tipCta: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
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
