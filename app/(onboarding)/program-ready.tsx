import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
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
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sparkle}>✦</Text>
        <Text style={styles.title}>{mockUser.name}, your personalized program is ready!</Text>
        <Text style={styles.subtitle}>
          We've created a custom facial fitness plan based on your goals and AI analysis.
        </Text>

        {programItems.map(item => (
          <View key={item.label} style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon as any} size={22} color="#fff" />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemValue}>{item.value}</Text>
            </View>
          </View>
        ))}

        <Button
          label="Start My Program Now"
          onPress={() => router.push('/(onboarding)/welcome-modal')}
          style={styles.btn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 24 },
  sparkle: {
    color: Colors.gold,
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.medium,
    lineHeight: 22,
    marginBottom: 28,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardText: { flex: 1 },
  itemLabel: { fontSize: 12, color: Colors.subtle, marginBottom: 2 },
  itemValue: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  btn: { marginTop: 8, marginBottom: 24 },
});
