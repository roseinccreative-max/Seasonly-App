import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { tips } from '@/constants/tips';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/colors';

const CATEGORY_ICONS: Record<string, string> = {
  Routine: 'sunny-outline',
  Ingredients: 'flask-outline',
  Technique: 'hand-left-outline',
  Science: 'cellular-outline',
  Technology: 'pulse-outline',
  Protection: 'shield-checkmark-outline',
};

export default function TipDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [earned, setEarned] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const tip = tips.find(tip => tip.id === id);
  if (!tip) return null;

  const title = lang === 'fr' ? tip.titleFr : tip.titleEn;
  const body = lang === 'fr' ? tip.bodyFr : tip.bodyEn;
  const steps = lang === 'fr' ? tip.stepsFr : tip.stepsEn;
  const iconName = (CATEGORY_ICONS[tip.category] ?? 'star-outline') as any;

  const toggleStep = (i: number) => {
    setCheckedSteps(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const allDone = completedCount === steps.length;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={Colors.dark} />
        </TouchableOpacity>
        <View style={styles.categoryPill}>
          <Ionicons name={iconName} size={13} color={Colors.primary} />
          <Text style={styles.categoryText}> {tip.category}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Meta row */}
        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Ionicons name="time-outline" size={13} color={Colors.subtle} />
            <Text style={styles.metaText}> {tip.readMinutes} min</Text>
          </View>
          <View style={styles.metaChip}>
            <Ionicons name="trophy-outline" size={13} color={Colors.gold} />
            <Text style={[styles.metaText, { color: Colors.gold }]}> +{tip.points} pts</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Intro */}
        <Text style={styles.body}>{body}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Steps */}
        <Text style={styles.stepsHeading}>Your Daily Routine</Text>
        <Text style={styles.stepsSub}>Tap each step as you complete it</Text>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(completedCount / steps.length) * 100}%` as any }]} />
        </View>
        <Text style={styles.progressLabel}>{completedCount}/{steps.length} steps completed</Text>

        <View style={styles.stepsList}>
          {steps.map((step, i) => {
            const done = !!checkedSteps[i];
            return (
              <TouchableOpacity
                key={i}
                style={[styles.stepRow, done && styles.stepRowDone]}
                onPress={() => toggleStep(i)}
                activeOpacity={0.7}
              >
                <View style={[styles.stepNumber, done && styles.stepNumberDone]}>
                  {done
                    ? <Ionicons name="checkmark" size={14} color="#fff" />
                    : <Text style={styles.stepNum}>{i + 1}</Text>
                  }
                </View>
                <Text style={[styles.stepText, done && styles.stepTextDone]}>{step}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.earnBtn, (earned || allDone) && styles.earnBtnDone]}
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
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  scroll: { padding: 20, paddingBottom: 24 },
  metaRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  metaText: { fontSize: 12, color: Colors.subtle, fontWeight: '600' },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 12,
    lineHeight: 34,
  },
  body: {
    fontSize: 15,
    color: Colors.medium,
    lineHeight: 24,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 24,
  },
  stepsHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 4,
  },
  stepsSub: {
    fontSize: 13,
    color: Colors.subtle,
    marginBottom: 16,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#EEE',
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: Colors.green,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.subtle,
    marginBottom: 20,
    textAlign: 'right',
  },
  stepsList: { gap: 12 },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  stepRowDone: {
    backgroundColor: '#F0FAF4',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumberDone: {
    backgroundColor: Colors.green,
  },
  stepNum: { fontSize: 13, fontWeight: '700', color: '#fff' },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: Colors.dark,
    lineHeight: 21,
    fontWeight: '500',
  },
  stepTextDone: {
    color: Colors.subtle,
    textDecorationLine: 'line-through',
  },
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
