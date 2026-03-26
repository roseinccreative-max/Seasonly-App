import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

export default function Step5() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.stepText}>Step 5 of 5</Text>
        <Text style={styles.percentText}>100%</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Trophy circle */}
        <View style={styles.trophyCircle}>
          <Ionicons name="trophy" size={36} color="#fff" />
        </View>

        <Text style={styles.title}>You did it!</Text>
        <Text style={styles.subtitle}>Your personalized facial fitness analysis is complete</Text>

        {/* Score card */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Ionicons name="ribbon-outline" size={18} color={Colors.gold} />
            <Text style={styles.scoreLabel}> Great News!</Text>
          </View>
          <Text style={styles.scorePercent}>{mockUser.skinScorePercent}%</Text>
          <Text style={styles.scoreDesc}>
            Your skin condition is better than {mockUser.skinScorePercent}% of people your age ({mockUser.skinScoreAge} years old)
          </Text>
          <View style={styles.improveBox}>
            <Text style={styles.improveText}>
              With our facial fitness program, you can improve even further!
            </Text>
          </View>
        </View>

        <Text style={styles.priorityText}>
          However, we detected the following priorities:
        </Text>

        <Button
          label="See My Program"
          onPress={() => router.push('/(onboarding)/program-ready')}
          style={{ alignSelf: 'stretch' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  stepText: { color: Colors.subtle, fontSize: 13 },
  percentText: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  scroll: { paddingHorizontal: 24, paddingBottom: 32, alignItems: 'center' },
  trophyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.dark,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.medium,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  scoreCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 0,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreLabel: { color: Colors.gold, fontWeight: '600', fontSize: 15 },
  scorePercent: {
    fontSize: 56,
    fontWeight: '800',
    color: Colors.purple,
    textAlign: 'center',
  },
  scoreDesc: {
    fontSize: 14,
    color: Colors.medium,
    textAlign: 'center',
    marginBottom: 12,
  },
  improveBox: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    width: '100%',
  },
  improveText: {
    fontSize: 13,
    color: Colors.medium,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  priorityText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.dark,
    textAlign: 'center',
    marginVertical: 20,
  },
});
