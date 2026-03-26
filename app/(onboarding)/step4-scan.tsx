import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

export default function Step4Scan() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing camera...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          router.push('/(onboarding)/step5');
          return 100;
        }
        if (p === 30) setStatus('Analyzing skin zones...');
        if (p === 60) setStatus('Mapping facial structure...');
        if (p === 85) setStatus('Finalizing analysis...');
        return p + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step 4 of 5</Text>
        <Text style={styles.percentText}>80%</Text>
      </View>
      <Text style={styles.title}>AI Face Analysis</Text>
      <Text style={styles.statusText}>{status}</Text>
      <View style={styles.cameraBox}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
      <View style={styles.progressCircle}>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
      <View style={styles.statusRow}>
        <View style={styles.dot} />
        <Text style={styles.statusLabel}>{status}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stepText: { color: Colors.subtle, fontSize: 13 },
  percentText: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  title: { fontSize: 26, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginBottom: 4 },
  statusText: { color: Colors.gold, textAlign: 'center', marginBottom: 20, fontSize: 14 },
  cameraBox: { width: '100%', height: 280, backgroundColor: '#E0E8F0', borderRadius: 16, marginBottom: 32, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  corner: { position: 'absolute', width: 24, height: 24, borderColor: '#7BB8D4', borderWidth: 3 },
  topLeft: { top: 16, left: 16, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 16, right: 16, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 16, left: 16, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 16, right: 16, borderLeftWidth: 0, borderTopWidth: 0 },
  progressCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#A8CCD8', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  progressText: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginRight: 8 },
  statusLabel: { color: Colors.medium, fontSize: 14 },
});
