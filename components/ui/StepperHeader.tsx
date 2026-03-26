import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const STEPS = ['Studio', 'Service', 'People', 'Date', 'Confirm'];

type Props = { currentStep: number }; // 1–5

export function StepperHeader({ currentStep }: Props) {
  return (
    <View style={styles.row}>
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < currentStep;
        const active = stepNum === currentStep;
        return (
          <View key={label} style={styles.stepWrapper}>
            {i > 0 && (
              <View style={[styles.line, done && styles.lineDone]} />
            )}
            <View style={[styles.circle, done && styles.circleDone, active && styles.circleActive]}>
              {done ? (
                <Ionicons name="checkmark" size={14} color="#fff" />
              ) : (
                <Text style={[styles.num, active && styles.numActive]}>{stepNum}</Text>
              )}
            </View>
            <Text style={[styles.stepLabel, active && styles.stepLabelActive, done && styles.stepLabelDone]}>
              {label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  stepWrapper: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  line: {
    position: 'absolute',
    top: 14,
    left: '-50%',
    right: '50%',
    height: 2,
    backgroundColor: '#DDD',
    zIndex: 0,
  },
  lineDone: { backgroundColor: Colors.green },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  circleDone: { backgroundColor: Colors.green },
  circleActive: { backgroundColor: Colors.green },
  num: { fontSize: 12, color: '#999', fontWeight: '600' },
  numActive: { color: '#fff', fontWeight: '700' },
  stepLabel: { fontSize: 10, color: '#999', marginTop: 4, textAlign: 'center' },
  stepLabelActive: { color: Colors.green, fontWeight: '600' },
  stepLabelDone: { color: Colors.green },
});
