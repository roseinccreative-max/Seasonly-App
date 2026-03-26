import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = { progress: number }; // 0 to 1

export function ProgressBar({ progress }: Props) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, backgroundColor: Colors.primaryLight, borderRadius: 3 },
  fill: { height: 6, backgroundColor: Colors.primary, borderRadius: 3 },
});
