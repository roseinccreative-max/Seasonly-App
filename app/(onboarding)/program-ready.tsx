import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

const programItems = [
  { icon: 'radio-button-on-outline', label: 'Your Main Objectives', value: '1 goals selected' },
  { icon: 'time-outline', label: 'Daily Training Time', value: 'Under 5 minutes' },
  { icon: 'calendar-outline', label: 'Program Duration', value: '4 weeks to visible results' },
  { icon: 'flash-outline', label: 'Personalized Exercises', value: '12 targeted routines' },
];

export default function ProgramReady() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sparkle}>✦</Text>
        <Text style={styles.title}>{mockUser.name}, your personalized program is ready!</Text>
        <Text style={styles.subtitle}>We've created a custom facial fitness plan based on your goals and AI analysis.</Text>
        {programItems.map(item => (
          <Card key={item.label} style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon as any} size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemValue}>{item.value}</Text>
            </View>
          </Card>
        ))}
        <Button label="Start My Program Now" onPress={() => router.push('/(onboarding)/welcome-modal')} style={styles.btn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 24 },
  sparkle: { color: Colors.gold, fontSize: 20, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.dark, marginBottom: 10 },
  subtitle: { fontSize: 14, color: Colors.medium, lineHeight: 20, marginBottom: 24 },
  card: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  itemLabel: { fontSize: 12, color: Colors.subtle },
  itemValue: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  btn: { marginTop: 8 },
});
