import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { StudioCard } from '@/components/book/StudioCard';
import { Colors } from '@/constants/colors';
import { mockStudios } from '@/constants/mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookStudio() {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('book_title')}</Text>
      </View>
      <StepperHeader currentStep={1} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {mockStudios.map(studio => (
          <StudioCard
            key={studio.id}
            studio={studio}
            onPress={() => router.push({ pathname: '/(tabs)/book/service', params: { studioId: studio.id } })}
          />
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
});
