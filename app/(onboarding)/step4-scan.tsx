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
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.stepText}>Step 4 of 5</Text>
          <Text style={styles.percentText}>80%</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>AI Face Analysis</Text>
        <Text style={styles.statusText}>{status}</Text>

        {/* Camera box */}
        <View style={styles.cameraBox}>
          {/* Corner brackets */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          {/* Face silhouette hint */}
          <View style={styles.faceSilhouette} />
        </View>

        {/* Progress circle */}
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>

        {/* Status row */}
        <View style={styles.statusRow}>
          <View style={styles.dot} />
          <Text style={styles.statusLabel}>{status}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  inner: { flex: 1, padding: 24 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stepText: { color: Colors.subtle, fontSize: 13 },
  percentText: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 4,
  },
  statusText: {
    color: Colors.gold,
    fontStyle: 'italic',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  cameraBox: {
    width: '100%',
    height: 260,
    backgroundColor: '#DCE9F0',
    borderRadius: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#4A90C4',
    borderWidth: 3,
  },
  topLeft: {
    top: 20,
    left: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 20,
    right: 20,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  faceSilhouette: {
    width: 100,
    height: 140,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(74,144,196,0.3)',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: '#7AAAC4',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 8,
  },
  statusLabel: { color: Colors.medium, fontSize: 14 },
});
