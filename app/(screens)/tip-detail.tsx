import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { tips } from '@/constants/tips';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/colors';

export default function TipDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [earned, setEarned] = useState(false);
  const tip = tips.find(tip => tip.id === id);

  if (!tip) return null;

  const title = lang === 'fr' ? tip.titleFr : tip.titleEn;
  const body = lang === 'fr' ? tip.bodyFr : tip.bodyEn;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.dark} />
        </TouchableOpacity>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{tip.category}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.readTime}>{tip.readMinutes} min read</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.earnBtn, earned && styles.earnBtnDone]}
          onPress={() => setEarned(true)}
          disabled={earned}
        >
          <Ionicons name="trophy-outline" size={18} color={earned ? Colors.green : '#fff'} />
          <Text style={[styles.earnBtnText, earned && styles.earnBtnTextDone]}>
            {earned ? t('tip_points_earned') : t('tip_earn')}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryPill: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  categoryText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  scroll: { padding: 20, paddingBottom: 20 },
  readTime: { fontSize: 12, color: Colors.subtle, marginBottom: 8 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 20,
    lineHeight: 34,
  },
  body: { fontSize: 16, color: Colors.medium, lineHeight: 26 },
  bottomBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  earnBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  earnBtnDone: { backgroundColor: '#E8F5E9' },
  earnBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  earnBtnTextDone: { color: Colors.green },
});
