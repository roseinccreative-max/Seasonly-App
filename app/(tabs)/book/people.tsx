import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookPeople() {
  const router = useRouter();
  const { t } = useLanguage();
  const [count, setCount] = useState(1);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('book_title')}</Text>
      </View>
      <StepperHeader currentStep={3} />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{t('book_number_people')}</Text>

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
      </View>

      {/* Sticky Continue button */}
      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => router.push({ pathname: '/(tabs)/book/date', params: { people: count } })}
        >
          <Text style={styles.continueBtnText}>{t('book_continue')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 16 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 16 },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 28,
  },
  circleNum: { fontSize: 26, fontWeight: '800', color: '#fff' },
  circleLabel: { fontSize: 12, color: '#fff', marginTop: 2 },
  hint: { textAlign: 'center', color: Colors.subtle, fontSize: 13, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridItem: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  gridItemActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  gridLabel: { fontSize: 13, fontWeight: '600', color: Colors.dark },
  gridLabelActive: { color: '#fff' },
  bottomBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 8 : 12,
  },
  continueBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
