import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
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
            { icon: '🔥', value: mockUser.streak, label: 'Day Streak' },
            { icon: '🏆', value: mockUser.skinMiles.toLocaleString(), label: 'Skin Miles' },
            { icon: '🎁', value: mockUser.rewardsCount, label: 'Rewards' },
          ].map(s => (
            <Card key={s.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </Card>
          ))}
        </View>

        {/* Today's Progress */}
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressCount}>{completedCount}/{total}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(completedCount / total) * 100}%` }]} />
          </View>
          <Text style={styles.progressHint}>Complete all challenges to earn 200 bonus points! 🎉</Text>
        </Card>

        {/* Self-Massage Routines */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Self-Massage Routines</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        {mockRoutines.map(routine => (
          <Card key={routine.id} style={styles.routineCard}>
            <View style={styles.routineIcon}>
              <Ionicons name={routine.completed ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={routine.completed ? Colors.green : Colors.subtle} />
            </View>
            <View style={styles.routineInfo}>
              <Text style={styles.routineName}>{routine.name}</Text>
              <Text style={styles.routineDesc}>{routine.description}</Text>
              <View style={styles.pointsRow}>
                <Ionicons name="trophy-outline" size={12} color={Colors.gold} />
                <Text style={styles.points}> {routine.points} points</Text>
              </View>
              {routine.completed && (
                <View style={styles.completedBadge}><Text style={styles.completedText}>✓ Completed</Text></View>
              )}
            </View>
          </Card>
        ))}

        {/* Redeem */}
        <Text style={styles.sectionTitle}>Redeem Your Points</Text>
        <View style={styles.redeemRow}>
          {mockRedeemItems.map(item => (
            <Card key={item.id} style={styles.redeemCard}>
              <Text style={styles.redeemIcon}>{item.icon}</Text>
              <Text style={styles.redeemName}>{item.name}</Text>
              <Text style={styles.redeemPoints}>{item.points} pts</Text>
            </Card>
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
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '800', color: Colors.dark },
  statLabel: { fontSize: 11, color: Colors.subtle, textAlign: 'center' },
  progressCard: { backgroundColor: '#EDE9F7', marginBottom: 24 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressTitle: { fontSize: 15, fontWeight: '700', color: Colors.dark },
  progressCount: { fontSize: 13, color: Colors.subtle },
  progressTrack: { height: 8, backgroundColor: '#D5CCF0', borderRadius: 4, marginBottom: 10 },
  progressFill: { height: 8, backgroundColor: Colors.primary, borderRadius: 4 },
  progressHint: { fontSize: 13, color: Colors.medium },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  seeAll: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  routineCard: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  routineIcon: { marginRight: 12, marginTop: 2 },
  routineInfo: { flex: 1 },
  routineName: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  routineDesc: { fontSize: 13, color: Colors.medium, marginTop: 2, marginBottom: 6 },
  pointsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  points: { fontSize: 12, color: Colors.gold },
  completedBadge: { backgroundColor: '#E8F5E9', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12, alignItems: 'center' },
  completedText: { color: Colors.green, fontWeight: '600', fontSize: 13 },
  redeemRow: { flexDirection: 'row', gap: 12 },
  redeemCard: { flex: 1, alignItems: 'center', paddingVertical: 20 },
  redeemIcon: { fontSize: 28, marginBottom: 8 },
  redeemName: { fontSize: 13, fontWeight: '600', color: Colors.dark, textAlign: 'center' },
  redeemPoints: { fontSize: 12, color: Colors.subtle, marginTop: 4 },
});
