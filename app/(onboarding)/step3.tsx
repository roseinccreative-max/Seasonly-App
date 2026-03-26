import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';

export default function Step3() {
  const router = useRouter();
  return (
    <OnboardingWrapper step={3} totalSteps={5}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Text style={styles.title}>
          Are you ready to see visible results in just 4 weeks?
        </Text>
        <Text style={styles.subtitle}>
          Join thousands of people who have transformed their skin with facial fitness.
        </Text>

        {/* Before/After image row */}
        <View style={styles.imageRow}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400' }}
              style={styles.image}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Before</Text>
            </View>
          </View>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' }}
              style={styles.image}
            />
            <View style={[styles.badge, styles.badgeAfter]}>
              <Text style={styles.badgeText}>After</Text>
            </View>
          </View>
        </View>

        {/* Star rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>★★★★★</Text>
          <Text style={styles.clientsText}>+ 2,847 happy clients</Text>
        </View>
      </ScrollView>

      <Button
        label="Yes, absolutely!"
        onPress={() => router.push('/(onboarding)/step4')}
        style={styles.btn}
      />
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark,
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.medium,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    gap: 2,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    marginBottom: 0,
  },
  imageWrapper: { flex: 1, position: 'relative' },
  image: { width: '100%', height: 200 },
  badge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeAfter: {
    left: undefined,
    right: 8,
    backgroundColor: Colors.primary,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  ratingContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  stars: { fontSize: 22, color: '#F5C518' },
  clientsText: {
    fontSize: 13,
    color: Colors.subtle,
    marginTop: 4,
    textAlign: 'center',
  },
  btn: { marginBottom: 24 },
});
