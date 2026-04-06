import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
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

  const renderBody = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <Text key={i} style={styles.boldLine}>{line.replace(/\*\*/g, '')}</Text>;
      }
      if (line.startsWith('•')) {
        return (
          <View key={i} style={styles.bulletRow}>
            <Text style={styles.bullet}>·</Text>
            <Text style={styles.bulletText}>{line.slice(1).trim()}</Text>
          </View>
        );
      }
      if (line === '') return <View key={i} style={{ height: 12 }} />;
      return <Text key={i} style={styles.bodyText}>{line}</Text>;
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: card.image }} style={styles.heroImage} resizeMode="cover" />
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={Colors.dark} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.divider} />
          {renderBody(body)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  heroWrap: { position: 'relative' },
  heroImage: { width: '100%', height: 300 },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 24, paddingBottom: 48 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 20,
    letterSpacing: 0.3,
    lineHeight: 36,
  },
  divider: { height: 1, backgroundColor: Colors.border, marginBottom: 24 },
  bodyText: { fontSize: 15, color: Colors.medium, lineHeight: 26 },
  boldLine: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
    marginTop: 8,
    marginBottom: 4,
  },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  bullet: { fontSize: 18, color: Colors.dark, marginRight: 10, lineHeight: 26 },
  bulletText: { flex: 1, fontSize: 15, color: Colors.medium, lineHeight: 26 },
});
