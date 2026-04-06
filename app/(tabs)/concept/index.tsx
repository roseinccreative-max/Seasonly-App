import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { conceptCards } from '@/constants/concept';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ConceptListScreen() {
  const router = useRouter();
  const { lang } = useLanguage();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={Colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>THE SEASONLY METHOD</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero intro block */}
        <View style={styles.introBlock}>
          <Text style={styles.introTitle}>
            {lang === 'fr' ? 'Science, geste & formules' : 'Science, gesture & formulas'}
          </Text>
          <Text style={styles.introText}>
            {lang === 'fr'
              ? 'Notre méthode repose sur trois piliers indissociables : des formules clean développées en laboratoire, une expertise facialiste brevetée et des ingrédients rigoureusement sélectionnés.'
              : 'Our method rests on three inseparable pillars: clean formulas developed in-lab, a patented facial expertise, and rigorously selected ingredients.'}
          </Text>
        </View>

        {/* Editorial list */}
        {conceptCards.map((card, i) => {
          const title = lang === 'fr' ? card.titleFr : card.titleEn;
          const summary = lang === 'fr' ? card.summaryFr : card.summaryEn;
          const isEven = i % 2 === 0;
          return (
            <TouchableOpacity
              key={card.id}
              style={styles.item}
              onPress={() => router.push(`/(tabs)/concept/${card.id}` as any)}
              activeOpacity={0.88}
            >
              <Image source={{ uri: card.image }} style={styles.itemImage} resizeMode="cover" />
              <View style={[styles.itemBody, isEven ? styles.itemBodyLeft : styles.itemBodyRight]}>
                <Text style={styles.itemNum}>{String(i + 1).padStart(2, '0')}</Text>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemSummary} numberOfLines={2}>{summary}</Text>
                <View style={styles.itemCta}>
                  <Text style={styles.itemCtaText}>{lang === 'fr' ? 'Découvrir' : 'Discover'}</Text>
                  <Ionicons name="arrow-forward" size={13} color={Colors.dark} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
    color: Colors.dark,
  },
  introBlock: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.dark,
    letterSpacing: 0.5,
    marginBottom: 14,
    lineHeight: 32,
  },
  introText: {
    fontSize: 14,
    color: Colors.medium,
    lineHeight: 23,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemImage: {
    width: '100%',
    height: 260,
  },
  itemBody: {
    padding: 24,
  },
  itemBodyLeft: {},
  itemBodyRight: {},
  itemNum: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: Colors.subtle,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 10,
    letterSpacing: 0.2,
    lineHeight: 30,
  },
  itemSummary: {
    fontSize: 14,
    color: Colors.medium,
    lineHeight: 22,
    marginBottom: 18,
  },
  itemCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemCtaText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
