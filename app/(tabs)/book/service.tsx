import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { Colors } from '@/constants/colors';
import { mockServices } from '@/constants/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookService() {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('book_title')}</Text>
      </View>
      <StepperHeader currentStep={2} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {mockServices.map(service => (
          <TouchableOpacity
            key={service.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => router.push({ pathname: '/(tabs)/book/people', params: { serviceId: service.id } })}
          >
            <View style={styles.info}>
              <Text style={styles.name}>{service.name}</Text>
              <Text style={styles.desc}>{service.description}</Text>
              <View style={styles.durationRow}>
                <Ionicons name="time-outline" size={14} color={Colors.gold} />
                <Text style={styles.duration}> {service.duration}</Text>
              </View>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>€{service.price}</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.subtle} style={styles.chevron} />
            </View>
          </TouchableOpacity>
        ))}
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
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  info: { flex: 1 },
  name: { fontSize: 17, fontWeight: '700', color: Colors.dark, marginBottom: 4 },
  desc: { fontSize: 13, color: Colors.medium, marginBottom: 6, lineHeight: 20 },
  durationRow: { flexDirection: 'row', alignItems: 'center' },
  duration: { fontSize: 13, color: Colors.gold, fontWeight: '600' },
  right: { alignItems: 'flex-end' },
  price: { fontSize: 22, fontWeight: '800', color: Colors.dark, textAlign: 'right' },
  chevron: { marginTop: 4 },
});
