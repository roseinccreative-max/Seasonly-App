import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const STEPS = ['Studio', 'Service', 'People', 'Date', 'Confirm'];
const CIRCLE_SIZE = 28;

type Props = { currentStep: number }; // 1–5

export function StepperHeader({ currentStep }: Props) {
  return (
    <View style={styles.container}>
      {/* Single row: [stepCol] [line] [stepCol] [line] … */}
      <View style={styles.row}>
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const done = stepNum < currentStep;
          const active = stepNum === currentStep;
          return (
            <React.Fragment key={label}>
              {/* Connecting line between steps — purely a flex item, no z-index needed */}
              {i > 0 && (
                <View style={[styles.line, done && styles.lineDone]} />
              )}

              {/* Circle + label column */}
              <View style={styles.stepCol}>
                <View
                  style={[
                    styles.circle,
                    done && styles.circleDone,
                    active && styles.circleActive,
                  ]}
                >
                  {done ? (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  ) : (
                    <Text style={[styles.num, active && styles.numActive]}>
                      {stepNum}
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    active && styles.stepLabelActive,
                    done && styles.stepLabelDone,
                  ]}
                >
                  {label}
                </Text>
              </View>
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  // Horizontal row — circles and lines sit side by side (no stacking at all)
  row: {
    flexDirection: 'row',
    alignItems: 'center', // vertically centres the line with the circles
  },
  // The connecting line — flex:1 fills the gap between circles, height is the track
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E0E0',
    // Shift line up slightly so it sits at the centre of the circle,
    // accounting for the label below the circle
    marginBottom: 18, // approx label height + marginTop
  },
  lineDone: { backgroundColor: Colors.dark },
  // Column holding circle + label
  stepCol: {
    alignItems: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: { backgroundColor: Colors.dark },
  circleActive: { backgroundColor: Colors.dark },
  num: { fontSize: 12, color: '#999', fontWeight: '600' },
  numActive: { color: '#fff', fontWeight: '700' },
  stepLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
  stepLabelActive: { color: Colors.dark, fontWeight: '600' },
  stepLabelDone: { color: Colors.dark },
});
