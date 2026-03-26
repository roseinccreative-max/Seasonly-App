import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';

export default function WelcomeModal() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.overlay}>
      <View style={styles.sheet}>
        <View style={styles.iconCircle}>
          <Ionicons name="gift-outline" size={32} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Welcome to your Personalized Skin Coach!</Text>
        <Text style={styles.subtitle}>As a special welcome, we're gifting you 500 Skin Miles to start your wellness journey!</Text>
        <Card style={styles.milesCard}>
          <View style={styles.trophyCircle}>
            <Ionicons name="trophy-outline" size={24} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.miles}><Text style={styles.milesNum}>500</Text> Skin Miles</Text>
            <Text style={styles.milesSub}>✦ Start your rewards journey</Text>
          </View>
        </Card>
        <Button label="Claim Your Gift 🎉" onPress={() => router.replace('/(tabs)')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 28, alignItems: 'center' },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: Colors.dark, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: Colors.medium, textAlign: 'center', marginBottom: 24 },
  milesCard: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 24 },
  trophyCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  miles: { fontSize: 16, color: Colors.medium },
  milesNum: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  milesSub: { fontSize: 13, color: Colors.subtle, marginTop: 2 },
});
