import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = { progress: number };

export function ProgressBar({ progress }: Props) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(progress * 100, 100)}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, backgroundColor: '#E8E0D8', borderRadius: 3 },
  fill: { height: 6, backgroundColor: '#C4826A', borderRadius: 3 },
});
