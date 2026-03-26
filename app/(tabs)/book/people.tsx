import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';

export default function BookPeople() {
  const router = useRouter();
  const [count, setCount] = useState(1);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Treatment</Text>
      </View>
      <StepperHeader currentStep={3} />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Number of People</Text>

        {/* Circle picker */}
        <View style={styles.pickerRow}>
          <TouchableOpacity style={styles.arrow} onPress={() => setCount(c => Math.max(1, c - 1))}>
            <Ionicons name="chevron-back" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.circle}>
            <Ionicons name="people-outline" size={28} color="#fff" />
            <Text style={styles.circleNum}>{count}</Text>
            <Text style={styles.circleLabel}>Person{count > 1 ? 's' : ''}</Text>
          </View>
          <TouchableOpacity style={styles.arrow} onPress={() => setCount(c => Math.min(6, c + 1))}>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>Select the number of people for this booking</Text>

        {/* Grid */}
        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <TouchableOpacity
              key={n}
              style={[styles.gridItem, count === n && styles.gridItemActive]}
              onPress={() => setCount(n)}
            >
              <Ionicons name="people-outline" size={22} color={count === n ? '#fff' : Colors.dark} />
              <Text style={[styles.gridLabel, count === n && styles.gridLabelActive]}>
                {n} Person{n > 1 ? 's' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          label="Continue"
          onPress={() => router.push({ pathname: '/(tabs)/book/date', params: { people: count } })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 0,
  },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 24 },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  arrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 28,
  },
  circleNum: { fontSize: 28, fontWeight: '800', color: '#fff' },
  circleLabel: { fontSize: 12, color: '#fff', marginTop: 2 },
  hint: { textAlign: 'center', color: Colors.subtle, fontSize: 13, marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
  gridItem: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  gridItemActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  gridLabel: { fontSize: 13, fontWeight: '600', color: Colors.dark },
  gridLabelActive: { color: '#fff' },
});
