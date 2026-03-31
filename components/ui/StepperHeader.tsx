import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const STEPS = ['Studio', 'Service', 'People', 'Date', 'Confirm'];

type Props = { currentStep: number }; // 1–5

export function StepperHeader({ currentStep }: Props) {
  return (
    <View style={styles.container}>
      {/* Line layer — rendered first so circles sit on top */}
      <View style={styles.lineLayer} pointerEvents="none">
        {STEPS.map((label, i) => {
          if (i === 0) return null;
          const done = i < currentStep;
          return (
            <View key={label + '-line'} style={[styles.lineSegment, done && styles.lineDone]} />
          );
        })}
      </View>

      {/* Circle + label layer */}
      <View style={styles.row}>
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const done = stepNum < currentStep;
          const active = stepNum === currentStep;
          return (
            <View key={label} style={styles.stepWrapper}>
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
    </View>
  );
}

const CIRCLE_SIZE = 28;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  // Absolutely positioned line layer sits behind the circles
  lineLayer: {
    position: 'absolute',
    top: 16 + CIRCLE_SIZE / 2, // paddingVertical + half circle height
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  lineSegment: {
    flex: 1,
    height: 2,
    backgroundColor: '#DDD',
    // Each segment sits between two circles; offset by half a circle width on each end
    marginHorizontal: CIRCLE_SIZE / 2,
  },
  lineDone: { backgroundColor: Colors.green },
  // Circle row rendered on top of the line layer
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  stepWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    // White border so line doesn't bleed through
    borderWidth: 2,
    borderColor: '#fff',
  },
  circleDone: { backgroundColor: Colors.green },
  circleActive: { backgroundColor: Colors.green },
  num: { fontSize: 12, color: '#999', fontWeight: '600' },
  numActive: { color: '#fff', fontWeight: '700' },
  stepLabel: { fontSize: 10, color: '#999', marginTop: 4, textAlign: 'center' },
  stepLabelActive: { color: Colors.green, fontWeight: '600' },
  stepLabelDone: { color: Colors.green },
});
