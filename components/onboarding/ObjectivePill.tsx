import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = { label: string; selected: boolean; onPress: () => void };

export function ObjectivePill({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.pill, selected && styles.pillSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 30, borderWidth: 1.5, borderColor: Colors.border,
    paddingHorizontal: 16, paddingVertical: 10, margin: 4, backgroundColor: '#fff',
  },
  pillSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  label: { color: Colors.dark, fontSize: 14 },
  labelSelected: { color: Colors.primary, fontWeight: '600' },
});
