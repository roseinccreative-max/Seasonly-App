import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { SkinTypeCard } from '@/components/onboarding/SkinTypeCard';
import { Button } from '@/components/ui/Button';
import { skinTypes } from '@/constants/mockData';
import { Colors } from '@/constants/colors';

export default function Step2() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingWrapper step={2} totalSteps={5}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Text style={styles.title}>How would you describe your skin?</Text>
        <Text style={styles.subtitle}>
          Understanding your skin type helps us recommend the most effective facial exercises and techniques for you.
        </Text>
        {skinTypes.map(type => (
          <SkinTypeCard
            key={type.id}
            label={type.label}
            subtitle={type.subtitle}
            icon={type.icon}
            selected={selected === type.id}
            onPress={() => setSelected(type.id)}
          />
        ))}
      </ScrollView>
      <Button
        label="Continue"
        onPress={() => router.push('/(onboarding)/step3')}
        disabled={!selected}
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
  btn: { marginBottom: 24 },
});
