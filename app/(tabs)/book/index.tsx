import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { StudioCard } from '@/components/book/StudioCard';
import { Colors } from '@/constants/colors';
import { mockStudios } from '@/constants/mockData';

export default function BookStudio() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Book Treatment</Text>
      <StepperHeader currentStep={1} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {mockStudios.map(studio => (
          <StudioCard key={studio.id} studio={studio}
            onPress={() => router.push({ pathname: '/(tabs)/book/service', params: { studioId: studio.id } })} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark, paddingHorizontal: 20, paddingTop: 16 },
  scroll: { padding: 20 },
});
