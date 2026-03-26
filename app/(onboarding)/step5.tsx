import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

export default function Step5() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step 5 of 5</Text>
        <Text style={styles.percentText}>100%</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.trophyCircle}>
          <Ionicons name="trophy-outline" size={36} color="#fff" />
        </View>
        <Text style={styles.title}>You did it!</Text>
        <Text style={styles.subtitle}>Your personalized facial fitness analysis is complete</Text>
        <Card style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Ionicons name="ribbon-outline" size={18} color={Colors.subtle} />
            <Text style={styles.scoreLabel}> Great News!</Text>
          </View>
          <Text style={styles.scorePercent}>{mockUser.skinScorePercent}%</Text>
          <Text style={styles.scoreDesc}>Your skin condition is better than {mockUser.skinScorePercent}% of people your age ({mockUser.skinScoreAge} years old)</Text>
          <View style={styles.improveBox}>
            <Text style={styles.improveText}>With our facial fitness program, you can improve even further!</Text>
          </View>
        </Card>
        <Text style={styles.priorityText}>However, we detected the following priorities:</Text>
        <Button label="See My Program" onPress={() => router.push('/(onboarding)/program-ready')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 24, paddingBottom: 8 },
  stepText: { color: Colors.subtle, fontSize: 13 },
  percentText: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  scroll: { padding: 24, alignItems: 'center' },
  trophyCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.purple, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.dark, marginBottom: 8 },
  subtitle: { fontSize: 14, color: Colors.medium, textAlign: 'center', marginBottom: 24 },
  scoreCard: { width: '100%', alignItems: 'center', marginBottom: 24 },
  scoreHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  scoreLabel: { color: Colors.medium, fontWeight: '600' },
  scorePercent: { fontSize: 48, fontWeight: '800', color: Colors.purple },
  scoreDesc: { fontSize: 14, color: Colors.medium, textAlign: 'center', marginBottom: 12 },
  improveBox: { backgroundColor: Colors.background, borderRadius: 12, padding: 12 },
  improveText: { fontSize: 13, color: Colors.medium, textAlign: 'center', fontStyle: 'italic' },
  priorityText: { fontSize: 18, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginBottom: 24 },
});
