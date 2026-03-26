import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { ObjectivePill } from '@/components/onboarding/ObjectivePill';
import { Button } from '@/components/ui/Button';
import { onboardingObjectives } from '@/constants/mockData';
import { Colors } from '@/constants/colors';

export default function Step1() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected(prev =>
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );

  return (
    <OnboardingWrapper step={1} totalSteps={5}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Text style={styles.title}>Select your main objectives</Text>
        <Text style={styles.subtitle}>
          Help us personalize your facial fitness program by selecting what matters most to you. Choose as many as you like.
        </Text>
        <View style={styles.pillsRow}>
          {onboardingObjectives.map(obj => (
            <ObjectivePill
              key={obj}
              label={obj}
              selected={selected.includes(obj)}
              onPress={() => toggle(obj)}
            />
          ))}
        </View>
      </ScrollView>
      <Button
        label="Continue"
        onPress={() => router.push('/(onboarding)/step2')}
        disabled={selected.length === 0}
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
  },
  subtitle: {
    fontSize: 14,
    color: Colors.medium,
    lineHeight: 22,
    marginBottom: 24,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  btn: { marginBottom: 24 },
});
