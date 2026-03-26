import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';

export default function Step3() {
  const router = useRouter();
  return (
    <OnboardingWrapper step={3} totalSteps={5}>
      <View style={styles.container}>
        <Text style={styles.title}>Are you ready to see visible results in just 4 weeks?</Text>
        <Text style={styles.subtitle}>Join thousands of people who have transformed their skin with facial fitness.</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400' }} style={styles.image} />
            <View style={styles.badge}><Text style={styles.badgeText}>Before</Text></View>
          </View>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' }} style={styles.image} />
            <View style={[styles.badge, styles.badgeAfter]}><Text style={styles.badgeText}>After</Text></View>
          </View>
        </View>
        <Text style={styles.stars}>★★★★★</Text>
        <Button label="Yes, absolutely!" onPress={() => router.push('/(onboarding)/step4')} />
      </View>
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 24 },
  title: { fontSize: 26, fontWeight: '700', color: Colors.dark, marginBottom: 10 },
  subtitle: { fontSize: 14, color: Colors.medium, lineHeight: 20, marginBottom: 24, textAlign: 'center' },
  imageRow: { flexDirection: 'row', gap: 4, borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  imageWrapper: { flex: 1, position: 'relative' },
  image: { width: '100%', height: 200 },
  badge: { position: 'absolute', bottom: 8, left: 8, backgroundColor: '#000', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeAfter: { left: undefined, right: 8, backgroundColor: Colors.primary },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  stars: { fontSize: 24, color: '#F5C518', textAlign: 'center', marginBottom: 24 },
});
