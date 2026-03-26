import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { Colors } from '@/constants/colors';
import { mockServices } from '@/constants/mockData';

export default function BookService() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Book Treatment</Text>
      <StepperHeader currentStep={2} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {mockServices.map(service => (
          <TouchableOpacity key={service.id} style={styles.card} activeOpacity={0.85}
            onPress={() => router.push({ pathname: '/(tabs)/book/people', params: { serviceId: service.id } })}>
            <View style={styles.info}>
              <Text style={styles.name}>{service.name}</Text>
              <Text style={styles.desc}>{service.description}</Text>
              <Text style={styles.duration}>{service.duration}</Text>
              <Text style={styles.price}>€{service.price}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.subtle} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark, paddingHorizontal: 20, paddingTop: 16 },
  scroll: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  info: { flex: 1 },
  name: { fontSize: 17, fontWeight: '700', color: Colors.dark, marginBottom: 4 },
  desc: { fontSize: 13, color: Colors.medium, marginBottom: 6 },
  duration: { fontSize: 13, color: Colors.gold, marginBottom: 6 },
  price: { fontSize: 18, fontWeight: '700', color: Colors.dark },
});
