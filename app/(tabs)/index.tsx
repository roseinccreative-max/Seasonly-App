import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

const quickActions = [
  { label: 'Book Massage', icon: 'calendar-outline' as const, route: '/(tabs)/book' },
  { label: 'Daily Challenge', icon: 'flash-outline' as const, route: '/(tabs)/rewards' },
  { label: 'Shop', icon: 'bag-outline' as const, route: '/(tabs)/shop' },
  { label: 'Borrow Device', icon: 'phone-portrait-outline' as const, route: '/(tabs)/book' },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Welcome back, {mockUser.name}</Text>
            <Text style={styles.sub}>Let's take care of your skin today</Text>
          </View>
          <View style={styles.proBadge}>
            <Text style={styles.proText}>👑 Pro</Text>
          </View>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <View style={styles.streakNumRow}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <Text style={styles.streakNum}> {mockUser.streak}</Text>
            </View>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
          <View style={styles.streakRight}>
            <View style={styles.milesNumRow}>
              <Text style={styles.milesNum}>{mockUser.skinMiles.toLocaleString()}</Text>
              <Text style={styles.milesEmoji}> 🏆</Text>
            </View>
            <Text style={styles.milesLabel}>Skin Miles</Text>
          </View>
        </View>

        {/* Daily Wellness Tip */}
        <TouchableOpacity style={styles.tipCard} onPress={() => router.push('/(tabs)/rewards')} activeOpacity={0.85}>
          <View style={styles.tipHeader}>
            <View style={styles.tipLeft}>
              <Ionicons name="book-outline" size={16} color={Colors.purple} />
              <Text style={styles.tipTitle}> Daily Wellness Tip</Text>
            </View>
            <View style={styles.newBadge}>
              <Text style={styles.newText}>New</Text>
            </View>
          </View>
          <Text style={styles.tipHeading}>Morning Hydration Ritual</Text>
          <Text style={styles.tipDesc}>
            Start your day with this simple yet powerful hydration ritual for glowing skin.
          </Text>
          <Text style={styles.tipCta}>Tap to read & earn 10 points →</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
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
    backgroundColor: '#EDE9F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
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
});
