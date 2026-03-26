import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';

export default function WelcomeModal() {
  const router = useRouter();
  return (
    <View style={styles.overlay}>
      <View style={styles.sheet}>
        {/* Drag handle */}
        <View style={styles.dragHandle} />

        {/* Gift icon circle */}
        <View style={styles.iconCircle}>
          <Ionicons name="gift" size={36} color={Colors.primary} />
        </View>

        <Text style={styles.title}>Welcome to your Personalized Skin Coach!</Text>
        <Text style={styles.subtitle}>
          As a special welcome, we're gifting you 500 Skin Miles to start your wellness journey!
        </Text>

        {/* Miles reward card */}
        <View style={styles.milesCard}>
          <View style={styles.trophyCircle}>
            <Ionicons name="trophy" size={24} color={Colors.primary} />
          </View>
          <View style={styles.milesRight}>
            <View style={styles.milesRow}>
              <Text style={styles.milesNum}>500</Text>
              <Text style={styles.milesSuffix}> Skin Miles</Text>
            </View>
            <Text style={styles.milesSub}>✦ Start your rewards journey</Text>
          </View>
        </View>

        <Button
          label="Claim Your Gift 🎉"
          onPress={() => router.replace('/(tabs)')}
          style={{ width: '100%' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    alignItems: 'center',
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    marginBottom: 20,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.medium,
    textAlign: 'center',
    marginBottom: 28,
  },
  milesCard: {
    borderRadius: 16,
    backgroundColor: '#FFF8F0',
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 28,
  },
  trophyCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  milesRight: { flex: 1 },
  milesRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  milesNum: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
  },
  milesSuffix: {
    fontSize: 16,
    color: Colors.medium,
  },
  milesSub: {
    color: Colors.gold,
    fontSize: 13,
    marginTop: 4,
  },
});
