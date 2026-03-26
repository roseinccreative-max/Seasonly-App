import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';
import { mockStudios, mockServices } from '@/constants/mockData';

export default function BookConfirm() {
  const router = useRouter();
  const { studioId = '1', serviceId = '1', people = '1', day, month, year, time } = useLocalSearchParams<any>();
  const studio = mockStudios.find(s => s.id === studioId) ?? mockStudios[0];
  const service = mockServices.find(s => s.id === serviceId) ?? mockServices[0];
  const total = service.price * Number(people);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateObj = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
  const dateStr = `${dayNames[dateObj.getDay()]}, ${monthNames[Number(month) - 1]} ${day}`;

  const rows = [
    { icon: 'location-outline' as const, label: 'Studio', value: studio.name, sub: studio.address },
    { icon: 'checkmark-circle-outline' as const, label: 'Service', value: service.name, sub: service.duration },
    { icon: 'people-outline' as const, label: 'Number of People', value: `${people} Person${Number(people) > 1 ? 's' : ''}`, sub: '' },
    { icon: 'calendar-outline' as const, label: 'Date & Time', value: dateStr, sub: time as string },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Treatment</Text>
      </View>
      <StepperHeader currentStep={5} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          {rows.map(row => (
            <View key={row.label} style={styles.row}>
              <View style={styles.iconCircle}>
                <Ionicons name={row.icon} size={18} color={Colors.subtle} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={styles.rowValue}>{row.value}</Text>
                {row.sub ? <Text style={styles.rowSub}>{row.sub}</Text> : null}
              </View>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Price</Text>
            <Text style={styles.priceVal}>€{service.price}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Number of People</Text>
            <Text style={styles.priceVal}>× {people}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalVal}>€{total}</Text>
          </View>
        </View>
        <Button
          label="Confirm Booking"
          onPress={() => router.replace('/(tabs)')}
          style={styles.btn}
        />
      </ScrollView>
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
  scroll: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 18 },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowContent: { flex: 1 },
  rowLabel: { fontSize: 12, color: Colors.subtle, marginBottom: 2 },
  rowValue: { fontSize: 15, fontWeight: '700', color: Colors.dark },
  rowSub: { fontSize: 13, color: Colors.medium, marginTop: 2 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 16 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { fontSize: 14, color: Colors.subtle },
  priceVal: { fontSize: 14, color: Colors.dark },
  totalLabel: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  totalVal: { fontSize: 16, fontWeight: '700', color: Colors.gold },
  btn: { marginTop: 20, marginBottom: 32 },
});
