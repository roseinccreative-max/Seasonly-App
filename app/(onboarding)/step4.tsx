import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export default function Step4() {
  const router = useRouter();
  return (
    <OnboardingWrapper step={4} totalSteps={5}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Text style={styles.title}>
          Personalize your program through AI skin analysis
        </Text>
        <Text style={styles.subtitle}>
          Get a precise assessment of your facial zones to create the most effective program for you.
        </Text>

        {/* Scan graphic */}
        <View style={styles.scanCircleOuter}>
          {/* Outer ring */}
          <View style={styles.outerRing} />
          {/* Camera icon */}
          <Ionicons name="camera-outline" size={72} color="#7AAAC4" />
          {/* Corner brackets */}
          <View style={[styles.bracket, styles.bracketTL]} />
          <View style={[styles.bracket, styles.bracketTR]} />
          <View style={[styles.bracket, styles.bracketBL]} />
          <View style={[styles.bracket, styles.bracketBR]} />
        </View>

        {/* Feature bullets */}
        <View style={styles.features}>
          {[
            {
              icon: 'flash-outline',
              title: 'Takes only 10 seconds',
              sub: 'Quick and easy facial scan',
            },
            {
              icon: 'scan-outline',
              title: 'Adapted to your skin condition',
              sub: '',
            },
          ].map(f => (
            <View key={f.title} style={styles.featureRow}>
              <View style={styles.featureIconBox}>
                <Ionicons name={f.icon as any} size={18} color={Colors.subtle} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                {f.sub ? <Text style={styles.featureSub}>{f.sub}</Text> : null}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Button
        label="Start AI Analysis"
        onPress={() => router.push('/(onboarding)/step4-scan')}
        style={styles.btn}
      />
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.dark,
    marginTop: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.medium,
    lineHeight: 22,
    marginBottom: 32,
    textAlign: 'center',
  },
  scanCircleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E8EFF8',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  outerRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: '#C4D8E8',
  },
  bracket: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  bracketTL: {
    top: 28,
    left: 28,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  bracketTR: {
    top: 28,
    right: 28,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bracketBL: {
    bottom: 28,
    left: 28,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bracketBR: {
    bottom: 28,
    right: 28,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  features: { marginTop: 32, marginBottom: 32 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F5F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 2,
  },
  featureSub: { fontSize: 13, color: Colors.subtle },
  btn: { marginBottom: 24 },
});
