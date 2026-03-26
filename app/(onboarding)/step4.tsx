import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export default function Step4() {
  const router = useRouter();
  return (
    <OnboardingWrapper step={4} totalSteps={5}>
      <View style={styles.container}>
        <Text style={styles.title}>Personalize your program through AI skin analysis</Text>
        <Text style={styles.subtitle}>Get a precise assessment of your facial zones to create the most effective program for you.</Text>
        <View style={styles.scanCircle}>
          <Ionicons name="scan-outline" size={64} color={Colors.primaryLight} />
        </View>
        <View style={styles.features}>
          {[
            { icon: 'flash-outline', title: 'Takes only 10 seconds', sub: 'Quick and easy facial scan using your camera' },
            { icon: 'scan-outline', title: 'Adapted to your skin condition', sub: '' },
          ].map(f => (
            <View key={f.title} style={styles.featureRow}>
              <Ionicons name={f.icon as any} size={20} color={Colors.subtle} style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                {f.sub ? <Text style={styles.featureSub}>{f.sub}</Text> : null}
              </View>
            </View>
          ))}
        </View>
        <Button label="Start AI Analysis" onPress={() => router.push('/(onboarding)/step4-scan')} />
      </View>
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 24 },
  title: { fontSize: 26, fontWeight: '700', color: Colors.dark, marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, color: Colors.medium, lineHeight: 20, marginBottom: 32, textAlign: 'center' },
  scanCircle: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#E8EFF5', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  features: { marginBottom: 32 },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  featureTitle: { fontSize: 15, fontWeight: '600', color: Colors.dark },
  featureSub: { fontSize: 13, color: Colors.subtle, marginTop: 2 },
});
