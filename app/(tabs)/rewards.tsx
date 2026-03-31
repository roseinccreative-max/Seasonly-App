import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Colors } from '@/constants/colors';
import { mockUser, mockRoutines, mockRedeemItems } from '@/constants/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeaderIcons } from '@/components/ui/HeaderIcons';

export default function RewardsScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { t } = useLanguage();
  const completedCount = mockRoutines.filter(r => r.completed).length;
  const total = mockRoutines.length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screenHeader}>
        <Text style={styles.headerTitle}>Rewards</Text>
        <HeaderIcons />
      </View>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll}>
        <Text style={styles.subtitle}>{t('rewards_subtitle')}</Text>

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
            <Text style={styles.progressTitle}>{t('rewards_today_progress')}</Text>
            <Text style={styles.progressCount}>{completedCount}/{total}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(completedCount / total) * 100}%` as any }]} />
          </View>
          <Text style={styles.progressHint}>{t('rewards_complete_all')}</Text>
        </View>

        {/* Self-Massage Routines */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('rewards_self_massage')}</Text>
          <TouchableOpacity onPress={() => scrollRef.current?.scrollToEnd({ animated: true })}>
            <Text style={styles.seeAll}>{t('rewards_see_all')}</Text>
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

        {/* Redeem Your Points */}
        <Text style={styles.redeemTitle}>{t('rewards_redeem_title')}</Text>
        <View style={styles.redeemGrid}>
          {mockRedeemItems.map(item => {
            const unlocked = mockUser.skinMiles >= item.points;
            return (
              <View key={item.id} style={styles.redeemCard}>
                <Text style={styles.redeemEmoji}>{item.icon}</Text>
                <Text style={styles.redeemName}>{item.name}</Text>
                <View style={styles.redeemPtsRow}>
                  <Ionicons name="trophy-outline" size={12} color={Colors.gold} />
                  <Text style={styles.redeemPts}> {item.points} pts</Text>
                </View>
                {unlocked ? (
                  <TouchableOpacity
                    style={styles.redeemBtn}
                    onPress={() => Alert.alert('Redeem Points', `Redeem ${item.points} pts for "${item.name}"?`, [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Confirm', onPress: () => Alert.alert('Success!', `Your "${item.name}" reward is on its way. Check your email.`) },
                    ])}
                  >
                    <Text style={styles.redeemBtnText}>{t('rewards_redeem_btn')}</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.lockedBtn}>
                    <Ionicons name="lock-closed-outline" size={13} color={Colors.subtle} style={{ marginRight: 4 }} />
                    <Text style={styles.lockedBtnText}>{t('rewards_locked')}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* How to Earn Points */}
        <View style={styles.howToCard}>
          <Text style={styles.howToTitle}>{t('rewards_how_to_earn')}</Text>
          {[t('rewards_how_1'), t('rewards_how_2'), t('rewards_how_3'), t('rewards_how_4')].map((item, i) => (
            <View key={i} style={styles.howToRow}>
              <Text style={styles.howToBullet}>·</Text>
              <Text style={styles.howToText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.dark },
  scroll: { padding: 20, paddingBottom: 40 },
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
  progressFill: { height: 8, backgroundColor: Colors.primary, borderRadius: 4 },
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
  redeemTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 14, marginTop: 8 },
  redeemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  redeemCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  redeemEmoji: { fontSize: 32, marginBottom: 10 },
  redeemName: { fontSize: 13, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginBottom: 6 },
  redeemPtsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  redeemPts: { fontSize: 12, color: Colors.gold, fontWeight: '600' },
  redeemBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  redeemBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  lockedBtn: {
    backgroundColor: '#F0EBE6',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  lockedBtnText: { color: Colors.subtle, fontWeight: '600', fontSize: 13 },
  howToCard: {
    backgroundColor: '#FFF8F0',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F2E8DC',
  },
  howToTitle: { fontSize: 15, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  howToRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  howToBullet: { fontSize: 16, color: Colors.primary, marginRight: 8, lineHeight: 20 },
  howToText: { fontSize: 13, color: Colors.primary, flex: 1, lineHeight: 20 },
});
