import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type Props = {
  label: string;
  subtitle: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
};

export function SkinTypeCard({ label, subtitle, icon, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconBox, selected && styles.iconBoxSelected]}>
        <Ionicons name={icon as any} size={20} color={selected ? Colors.primary : Colors.subtle} />
      </View>
      <View style={styles.text}>
        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 16, padding: 16, marginBottom: 12,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  cardSelected: { borderColor: Colors.primary },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  iconBoxSelected: { backgroundColor: Colors.primaryLight },
  text: { flex: 1 },
  label: { fontSize: 16, fontWeight: '600', color: Colors.dark },
  labelSelected: { color: Colors.primary },
  subtitle: { fontSize: 13, color: Colors.subtle, marginTop: 2 },
});
