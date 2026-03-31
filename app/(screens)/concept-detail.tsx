import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { conceptCards } from '@/constants/concept';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function ConceptDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lang } = useLanguage();
  const card = conceptCards.find(c => c.id === id);

  if (!card) return null;

  const title = lang === 'fr' ? card.titleFr : card.titleEn;
  const body = lang === 'fr' ? card.bodyFr : card.bodyEn;

  // Render body with **bold** markdown-style
  const renderBody = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <Text key={i} style={styles.boldLine}>
            {line.replace(/\*\*/g, '')}
          </Text>
        );
      }
      if (line.startsWith('•')) {
        return (
          <View key={i} style={styles.bulletRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{line.slice(1).trim()}</Text>
          </View>
        );
      }
      if (line === '') return <View key={i} style={{ height: 12 }} />;
      return <Text key={i} style={styles.bodyText}>{line}</Text>;
    });
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: card.color }]} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.dark} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.icon}>{card.icon}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.bodyCard}>
          {renderBody(body)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  icon: { fontSize: 52, textAlign: 'center', marginBottom: 16, marginTop: 8 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 36,
  },
  bodyCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  bodyText: {
    fontSize: 15,
    color: Colors.medium,
    lineHeight: 24,
  },
  boldLine: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
    marginTop: 8,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 15,
    color: '#C4826A',
    marginRight: 8,
    lineHeight: 24,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: Colors.medium,
    lineHeight: 24,
  },
});
