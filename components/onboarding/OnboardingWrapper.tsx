import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { ProgressBar } from '@/components/ui/ProgressBar';

type Props = {
  step: number;
  totalSteps: number;
  children: React.ReactNode;
};

export function OnboardingWrapper({ step, totalSteps, children }: Props) {
  const percent = Math.round((step / totalSteps) * 100);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step {step} of {totalSteps}</Text>
        <Text style={styles.percentText}>{percent}%</Text>
      </View>
      <ProgressBar progress={step / totalSteps} />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 },
  stepText: { color: Colors.subtle, fontSize: 13 },
  percentText: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 24 },
});
