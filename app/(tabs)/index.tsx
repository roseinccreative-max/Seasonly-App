import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

const quickActions = [
  { label: 'Book Massage', icon: 'calendar-outline', route: '/(tabs)/book' },
  { label: 'Daily Challenge', icon: 'sparkles-outline', route: '/(tabs)/rewards' },
  { label: 'Shop', icon: 'bag-outline', route: '/(tabs)/shop' },
  { label: 'Borrow Device', icon: 'phone-portrait-outline', route: null },
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
          <View style={styles.proBadge}><Text style={styles.proText}>👑 Pro</Text></View>
        </View>

        {/* Streak + Miles */}
        <Card style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakNum}>{mockUser.streak} days</Text>
            <Text style={styles.streakIcon}>🔥</Text>
          </View>
          <Text style={styles.streakSub}>Keep your streak going!</Text>
          <View style={styles.milesRight}>
            <Text style={styles.milesIcon}>🏆</Text>
            <Text style={styles.milesNum}>{mockUser.skinMiles.toLocaleString()}</Text>
            <Text style={styles.milesSub}>Skin Miles</Text>
          </View>
        </Card>

        {/* Daily Wellness Tip */}
        <Card style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <View style={styles.tipLeft}>
              <Ionicons name="book-outline" size={16} color={Colors.purple} />
              <Text style={styles.tipTitle}> Daily Wellness Tip</Text>
            </View>
            <View style={styles.newBadge}><Text style={styles.newText}>New</Text></View>
          </View>
          <Text style={styles.tipHeading}>Morning Hydration Ritual</Text>
          <Text style={styles.tipDesc}>Start your day with this simple yet powerful hydration ritual...</Text>
          <Text style={styles.tipCta}>Tap to read & earn 10 points →</Text>
        </Card>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionCard}
              onPress={() => action.route && router.push(action.route as any)}
              activeOpacity={0.8}
            >
              <Ionicons name={action.icon as any} size={28} color={Colors.primary} />
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  greeting: { fontSize: 22, fontWeight: '800', color: Colors.dark },
  sub: { fontSize: 13, color: Colors.subtle, marginTop: 2 },
  proBadge: { backgroundColor: Colors.primaryLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  proText: { color: Colors.primary, fontWeight: '700', fontSize: 12 },
  streakCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, borderWidth: 1, borderColor: Colors.primaryLight },
  streakLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  streakIcon: { fontSize: 18 },
  streakNum: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  streakSub: { fontSize: 11, color: Colors.subtle, position: 'absolute', bottom: -14, left: 0 },
  milesRight: { alignItems: 'flex-end' },
  milesIcon: { fontSize: 16 },
  milesNum: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  milesSub: { fontSize: 11, color: Colors.subtle },
  tipCard: { backgroundColor: '#EDE9F7', marginBottom: 24 },
  tipHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tipLeft: { flexDirection: 'row', alignItems: 'center' },
  tipTitle: { color: Colors.purple, fontWeight: '600', fontSize: 13 },
  newBadge: { backgroundColor: Colors.green, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  newText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  tipHeading: { fontSize: 17, fontWeight: '700', color: Colors.dark, marginBottom: 6 },
  tipDesc: { fontSize: 13, color: Colors.medium, marginBottom: 8 },
  tipCta: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { width: '47%', backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  actionLabel: { fontSize: 13, fontWeight: '600', color: Colors.dark, textAlign: 'center' },
});
