import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { HeaderIcons } from '@/components/ui/HeaderIcons';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function BookDate() {
  const router = useRouter();
  const { t } = useLanguage();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('book_title')}</Text>
        <HeaderIcons />
      </View>
      <StepperHeader currentStep={4} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Calendar */}
        <View style={styles.calCard}>
          <View style={styles.calHeader}>
            <TouchableOpacity onPress={prevMonth}>
              <Ionicons name="chevron-back" size={20} color={Colors.dark} />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{monthName}</Text>
            <TouchableOpacity onPress={nextMonth}>
              <Ionicons name="chevron-forward" size={20} color={Colors.dark} />
            </TouchableOpacity>
          </View>
          <View style={styles.dayRow}>
            {DAYS.map(d => (
              <Text key={d} style={styles.dayLabel}>{d}</Text>
            ))}
          </View>
          <View style={styles.grid}>
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <View key={`e${i}`} style={styles.dayCell} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayCell,
                    isToday && !isSelected && styles.todayCell,
                    isSelected && styles.selectedCell,
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text style={[
                    styles.dayNum,
                    isToday && !isSelected && styles.todayNum,
                    isSelected && styles.selectedNum,
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Time slots */}
        {selectedDay && (
          <>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timesGrid}>
              {TIMES.map(slot => (
                <TouchableOpacity
                  key={slot}
                  style={[styles.timeSlot, selectedTime === slot && styles.timeSlotActive]}
                  onPress={() => setSelectedTime(slot)}
                >
                  <Ionicons name="time-outline" size={14} color={selectedTime === slot ? '#fff' : Colors.gold} />
                  <Text style={[styles.timeLabel, selectedTime === slot && styles.timeLabelActive]}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

      </ScrollView>

      {selectedDay && selectedTime && (
        <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => router.push({
              pathname: '/(tabs)/book/confirm',
              params: { day: selectedDay, month: month + 1, year, time: selectedTime },
            })}
          >
            <Text style={styles.continueBtnText}>{t('book_continue')}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark },
  scroll: { padding: 20 },
  calCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  calHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthLabel: { fontSize: 17, fontWeight: '700', color: Colors.dark },
  dayRow: { flexDirection: 'row', marginBottom: 8 },
  dayLabel: { flex: 1, textAlign: 'center', fontSize: 12, color: Colors.subtle, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  dayNum: { fontSize: 14, color: Colors.dark },
  todayCell: { borderWidth: 1.5, borderColor: '#A8D0E8', borderRadius: 8 },
  todayNum: { color: '#4A90C4' },
  selectedCell: { backgroundColor: Colors.primary, borderRadius: 8 },
  selectedNum: { color: '#fff', fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  timesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  timeSlot: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  timeSlotActive: { backgroundColor: Colors.primary },
  timeLabel: { fontSize: 13, fontWeight: '600', color: Colors.dark },
  timeLabelActive: { color: '#fff' },
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
