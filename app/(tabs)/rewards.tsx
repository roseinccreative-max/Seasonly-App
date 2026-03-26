import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { mockUser, mockRoutines, mockRedeemItems } from '@/constants/mockData';

export default function RewardsScreen() {
  const completedCount = mockRoutines.filter(r => r.completed).length;
  const total = mockRoutines.length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Rewards & Challenges</Text>
        <Text style={styles.subtitle}>Complete challenges to earn Skin Miles</Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { emoji: '🔥', value: String(mockUser.streak), label: 'Day Streak' },
            { emoji: '🏆', value: mockUser.skinMiles.toLocaleString(), label: 'Skin Miles' },
            { emoji: '🎁', value: String(mockUser.rewardsCount), label: 'Rewards' },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statEmoji}>{s.emoji}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Today's Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressCount}>{completedCount}/{total}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(completedCount / total) * 100}%` as any }]} />
          </View>
          <Text style={styles.progressHint}>Complete all challenges to earn 200 bonus points! 🎉</Text>
        </View>

        {/* Self-Massage Routines */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Self-Massage Routines</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {mockRoutines.map(routine => (
          <View key={routine.id} style={styles.routineCard}>
            <Ionicons
              name={routine.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={26}
              color={routine.completed ? Colors.green : Colors.subtle}
              style={styles.routineIcon}
            />
            <View style={styles.routineInfo}>
              <Text style={styles.routineName}>{routine.name}</Text>
              <Text style={styles.routineDesc}>{routine.description}</Text>
              <View style={styles.pointsRow}>
                <Ionicons name="trophy-outline" size={12} color={Colors.gold} />
                <Text style={styles.points}> {routine.points} points</Text>
              </View>
              {routine.completed && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>✓ Completed</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* Redeem */}
        <Text style={styles.redeemTitle}>Redeem Your Points</Text>
        <View style={styles.redeemRow}>
          {mockRedeemItems.map(item => (
            <View key={item.id} style={styles.redeemCard}>
              <Text style={styles.redeemEmoji}>{item.icon}</Text>
              <Text style={styles.redeemName}>{item.name}</Text>
              <Text style={styles.redeemPoints}>{item.points} pts</Text>
              <TouchableOpacity style={styles.redeemBtn}>
                <Text style={styles.redeemBtnText}>Redeem</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark, marginBottom: 4 },
  subtitle: { fontSize: 13, color: Colors.subtle, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statEmoji: { fontSize: 22, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.dark },
  statLabel: { fontSize: 11, color: Colors.subtle, textAlign: 'center' },
  progressCard: {
    backgroundColor: '#EDE9F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTitle: { fontSize: 15, fontWeight: '700', color: Colors.dark },
  progressCount: { fontSize: 13, color: Colors.subtle },
  progressTrack: {
    height: 8,
    backgroundColor: '#D5CCF0',
    borderRadius: 4,
    marginVertical: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressHint: { fontSize: 13, color: Colors.medium },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  seeAll: { color: Colors.gold, fontWeight: '600', fontSize: 13 },
  routineCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  routineIcon: { marginRight: 12, marginTop: 2 },
  routineInfo: { flex: 1 },
  routineName: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  routineDesc: { fontSize: 13, color: Colors.medium, marginTop: 2, marginBottom: 8 },
  pointsRow: { flexDirection: 'row', alignItems: 'center' },
  points: { fontSize: 12, color: Colors.gold },
  completedBadge: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  completedText: { color: Colors.green, fontWeight: '600', fontSize: 12 },
  redeemTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12, marginTop: 8 },
  redeemRow: { flexDirection: 'row', gap: 12 },
  redeemCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  redeemEmoji: { fontSize: 32, marginBottom: 10 },
  redeemName: { fontSize: 13, fontWeight: '600', color: Colors.dark, textAlign: 'center' },
  redeemPoints: { fontSize: 12, color: Colors.subtle, marginTop: 4 },
  redeemBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  redeemBtnText: { color: Colors.primary, fontWeight: '600', fontSize: 13 },
});
