# Owner Feedback Features Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 5 features from Seasonly business owner feedback: FR/EN language toggle, real tips from seasonly.fr, editable user profile with photo, notification preference toggles, and referral link sharing.

**Architecture:** Each feature is isolated — new context for language, new constants file for tips, AsyncStorage for all user preferences (profile data, notification prefs, language choice), native Share API for referral. No backend required; all state is local.

**Tech Stack:** Expo Router v3, React Native, TypeScript, AsyncStorage (`@react-native-async-storage/async-storage`), `expo-image-picker`, React Native `Share` API, `@expo/vector-icons`

---

## Chunk 1: i18n Language System (FR + EN)

### Task 1: Create i18n dictionary

**Files:**
- Create: `constants/i18n.ts`

- [ ] **Step 1: Create `constants/i18n.ts` with all app strings in FR and EN**

```typescript
export type Lang = 'en' | 'fr';

export const i18n: Record<Lang, Record<string, string>> = {
  en: {
    // Tabs
    tab_home: 'Home',
    tab_book: 'Book',
    tab_rewards: 'Rewards',
    tab_shop: 'Shop',
    tab_profile: 'Profile',

    // Home
    home_greeting: 'Welcome back',
    home_subtitle: "Let's take care of your skin today",
    home_day_streak: 'Day Streak',
    home_skin_miles: 'Skin Miles',
    home_daily_tip: 'Daily Wellness Tip',
    home_new_badge: 'New',
    home_tap_to_read: 'Tap to read & earn 10 points →',
    home_quick_actions: 'Quick Actions',
    home_book_massage: 'Book Massage',
    home_daily_challenge: 'Daily Challenge',
    home_shop: 'Shop',
    home_borrow_device: 'Borrow Device',

    // Book
    book_title: 'Book Treatment',
    book_choose_studio: 'Choose a Studio',
    book_choose_service: 'Choose a Service',
    book_number_people: 'Number of People',
    book_select_date: 'Select Date & Time',
    book_confirm: 'Confirm Booking',
    book_continue: 'Continue',

    // Rewards
    rewards_title: 'Rewards & Challenges',
    rewards_subtitle: 'Complete challenges to earn Skin Miles',
    rewards_today_progress: "Today's Progress",
    rewards_complete_all: 'Complete all challenges to earn 200 bonus points! 🎉',
    rewards_self_massage: 'Self-Massage Routines',
    rewards_see_all: 'See All',
    rewards_redeem_title: 'Redeem Your Points',
    rewards_how_to_earn: 'How to Earn Points',
    rewards_how_1: 'Complete daily self-massage routines',
    rewards_how_2: 'Read Tip To Glow',
    rewards_how_3: 'Book and attend appointments',
    rewards_how_4: 'Leave reviews on Google',
    rewards_redeem_btn: 'Redeem',
    rewards_locked: 'Locked',

    // Profile
    profile_edit: 'Edit Profile',
    profile_membership: 'Premium Membership',
    profile_active_until: 'Active until',
    profile_manage: 'Manage',
    profile_upgrade: 'Upgrade',
    profile_skin_analysis: 'Skin Analysis',
    profile_skin_profile: 'Your Skin Profile',
    profile_skin_type: 'Skin Type',
    profile_skin_concerns: 'Skin Concerns',
    profile_notifications: 'Notifications',
    profile_referral: 'Refer a Friend',
    profile_referral_desc: 'Share your link and earn 200 points per referral',
    profile_share_link: 'Share My Referral Link',
    profile_copy_link: 'Copy Link',
    profile_language: 'Language',
    profile_save: 'Save Changes',
    profile_cancel: 'Cancel',
    profile_name: 'Full Name',
    profile_email: 'Email',
    profile_phone: 'Phone',
    profile_change_photo: 'Change Photo',

    // Notifications
    notif_booking: 'Booking Reminders',
    notif_booking_desc: 'Reminders before your appointments',
    notif_tips: 'Tips & Advice',
    notif_tips_desc: 'Daily wellness tips from Seasonly',
    notif_rewards: 'Rewards & Points',
    notif_rewards_desc: 'Updates on your Skin Miles balance',
    notif_promos: 'Promotions & Offers',
    notif_promos_desc: 'Exclusive deals and new products',

    // Tips
    tip_read_more: 'Read Full Article',
    tip_earn: 'Earn 10 points',
    tip_points_earned: '✓ 10 points earned',
  },
  fr: {
    // Tabs
    tab_home: 'Accueil',
    tab_book: 'Réserver',
    tab_rewards: 'Récompenses',
    tab_shop: 'Boutique',
    tab_profile: 'Profil',

    // Home
    home_greeting: 'Bon retour',
    home_subtitle: 'Prenons soin de votre peau aujourd\'hui',
    home_day_streak: 'Jours consécutifs',
    home_skin_miles: 'Skin Miles',
    home_daily_tip: 'Conseil bien-être du jour',
    home_new_badge: 'Nouveau',
    home_tap_to_read: 'Lire & gagner 10 points →',
    home_quick_actions: 'Actions rapides',
    home_book_massage: 'Réserver un massage',
    home_daily_challenge: 'Défi du jour',
    home_shop: 'Boutique',
    home_borrow_device: 'Emprunter un appareil',

    // Book
    book_title: 'Réserver un soin',
    book_choose_studio: 'Choisir un studio',
    book_choose_service: 'Choisir un soin',
    book_number_people: 'Nombre de personnes',
    book_select_date: 'Choisir une date & heure',
    book_confirm: 'Confirmer la réservation',
    book_continue: 'Continuer',

    // Rewards
    rewards_title: 'Récompenses & Défis',
    rewards_subtitle: 'Complétez des défis pour gagner des Skin Miles',
    rewards_today_progress: "Progrès d'aujourd'hui",
    rewards_complete_all: 'Complétez tous les défis pour 200 points bonus ! 🎉',
    rewards_self_massage: 'Routines d\'auto-massage',
    rewards_see_all: 'Voir tout',
    rewards_redeem_title: 'Échanger vos points',
    rewards_how_to_earn: 'Comment gagner des points',
    rewards_how_1: 'Effectuez vos routines d\'auto-massage quotidiennes',
    rewards_how_2: 'Lisez Tip To Glow',
    rewards_how_3: 'Réservez et assistez à vos rendez-vous',
    rewards_how_4: 'Laissez des avis sur Google',
    rewards_redeem_btn: 'Échanger',
    rewards_locked: 'Verrouillé',

    // Profile
    profile_edit: 'Modifier le profil',
    profile_membership: 'Abonnement Premium',
    profile_active_until: 'Actif jusqu\'au',
    profile_manage: 'Gérer',
    profile_upgrade: 'Améliorer',
    profile_skin_analysis: 'Analyse de peau',
    profile_skin_profile: 'Votre profil cutané',
    profile_skin_type: 'Type de peau',
    profile_skin_concerns: 'Préoccupations cutanées',
    profile_notifications: 'Notifications',
    profile_referral: 'Parrainer un ami',
    profile_referral_desc: 'Partagez votre lien et gagnez 200 points par parrainage',
    profile_share_link: 'Partager mon lien de parrainage',
    profile_copy_link: 'Copier le lien',
    profile_language: 'Langue',
    profile_save: 'Enregistrer',
    profile_cancel: 'Annuler',
    profile_name: 'Nom complet',
    profile_email: 'E-mail',
    profile_phone: 'Téléphone',
    profile_change_photo: 'Changer la photo',

    // Notifications
    notif_booking: 'Rappels de rendez-vous',
    notif_booking_desc: 'Rappels avant vos rendez-vous',
    notif_tips: 'Conseils & Astuces',
    notif_tips_desc: 'Conseils bien-être quotidiens de Seasonly',
    notif_rewards: 'Récompenses & Points',
    notif_rewards_desc: 'Mises à jour de votre solde Skin Miles',
    notif_promos: 'Promotions & Offres',
    notif_promos_desc: 'Offres exclusives et nouveaux produits',

    // Tips
    tip_read_more: 'Lire l\'article complet',
    tip_earn: 'Gagner 10 points',
    tip_points_earned: '✓ 10 points gagnés',
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add constants/i18n.ts
git commit -m "feat: add FR/EN i18n dictionary"
```

---

### Task 2: Create LanguageContext

**Files:**
- Create: `contexts/LanguageContext.tsx`

- [ ] **Step 1: Create `contexts/LanguageContext.tsx`**

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { i18n, Lang } from '@/constants/i18n';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    AsyncStorage.getItem('language').then(stored => {
      if (stored === 'fr' || stored === 'en') setLangState(stored);
    });
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem('language', l);
  };

  const t = (key: string): string => i18n[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
```

- [ ] **Step 2: Wrap app root in LanguageProvider — edit `app/_layout.tsx`**

Add `import { LanguageProvider } from '@/contexts/LanguageContext';` and wrap `<Stack>` inside `<LanguageProvider>`.

- [ ] **Step 3: Commit**

```bash
git add contexts/LanguageContext.tsx app/_layout.tsx
git commit -m "feat: add LanguageContext with AsyncStorage persistence"
```

---

### Task 3: Wire i18n into tab bar labels

**Files:**
- Modify: `app/(tabs)/_layout.tsx`

- [ ] **Step 1: Replace hardcoded tab labels with `t()` calls**

In `app/(tabs)/_layout.tsx`, import `useLanguage` and replace each `tabBarLabel` string:
- `'Home'` → `t('tab_home')`
- `'Book'` → `t('tab_book')`
- `'Rewards'` → `t('tab_rewards')`
- `'Shop'` → `t('tab_shop')`
- `'Profile'` → `t('tab_profile')`

- [ ] **Step 2: Add language toggle to Profile screen**

In `app/(tabs)/profile.tsx`, add a row below the Skin Analysis section:

```tsx
import { useLanguage } from '@/contexts/LanguageContext';
// inside component:
const { lang, setLang, t } = useLanguage();

// JSX row:
<View style={styles.langRow}>
  <Text style={styles.langLabel}>{t('profile_language')}</Text>
  <View style={styles.langToggle}>
    <TouchableOpacity
      style={[styles.langBtn, lang === 'en' && styles.langBtnActive]}
      onPress={() => setLang('en')}
    >
      <Text style={[styles.langBtnText, lang === 'en' && styles.langBtnTextActive]}>EN</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.langBtn, lang === 'fr' && styles.langBtnActive]}
      onPress={() => setLang('fr')}
    >
      <Text style={[styles.langBtnText, lang === 'fr' && styles.langBtnTextActive]}>FR</Text>
    </TouchableOpacity>
  </View>
</View>
```

Styles to add:
```typescript
langRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 8 },
langLabel: { fontSize: 15, fontWeight: '600', color: Colors.dark },
langToggle: { flexDirection: 'row', backgroundColor: '#F0EBE6', borderRadius: 20, padding: 3 },
langBtn: { paddingHorizontal: 18, paddingVertical: 7, borderRadius: 17 },
langBtnActive: { backgroundColor: Colors.primary },
langBtnText: { fontWeight: '700', fontSize: 13, color: Colors.medium },
langBtnTextActive: { color: '#fff' },
```

- [ ] **Step 3: Commit**

```bash
git add app/(tabs)/_layout.tsx app/(tabs)/profile.tsx
git commit -m "feat: wire i18n into tab bar and add language toggle in profile"
```

---

## Chunk 2: Real Tips from Seasonly.fr

### Task 4: Create tips data

**Files:**
- Create: `constants/tips.ts`

- [ ] **Step 1: Create `constants/tips.ts` with 10 real Seasonly tips in EN and FR**

```typescript
export interface Tip {
  id: string;
  titleEn: string;
  titleFr: string;
  bodyEn: string;
  bodyFr: string;
  category: string;
  readMinutes: number;
  points: number;
}

export const tips: Tip[] = [
  {
    id: '1',
    titleEn: 'Morning Hydration Ritual',
    titleFr: 'Rituel d\'hydratation du matin',
    bodyEn: 'Start your day with this simple yet powerful hydration ritual. Apply your serum on damp skin to lock in moisture, then follow with a lightweight cream. Gently massage upward in circular motions to activate circulation and give your skin a natural glow.',
    bodyFr: 'Commencez votre journée avec ce rituel d\'hydratation puissant. Appliquez votre sérum sur une peau humide pour fixer l\'humidité, puis suivez avec une crème légère. Massez doucement vers le haut en mouvements circulaires pour activer la circulation.',
    category: 'Routine',
    readMinutes: 2,
    points: 10,
  },
  {
    id: '2',
    titleEn: 'The Power of Vitamin C for Radiance',
    titleFr: 'Le pouvoir de la vitamine C pour l\'éclat',
    bodyEn: 'Vitamin C is one of the most researched antioxidants in skincare. It neutralizes free radicals caused by UV exposure and pollution, brightens dark spots, and stimulates collagen production. Apply it every morning before SPF for maximum protection and glow.',
    bodyFr: 'La vitamine C est l\'un des antioxydants les plus étudiés en soins de la peau. Elle neutralise les radicaux libres, illumine les taches sombres et stimule la production de collagène. Appliquez-la chaque matin avant l\'écran solaire.',
    category: 'Ingredients',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '3',
    titleEn: 'Facial Massage: The Natural Facelift',
    titleFr: 'Massage facial : le lifting naturel',
    bodyEn: 'Regular facial massage is the foundation of the Seasonly method. It activates 57 facial muscles, boosts lymphatic drainage to reduce puffiness, and increases blood flow for a natural lift. Even 5 minutes daily shows visible results within 2 weeks.',
    bodyFr: 'Le massage facial régulier est au cœur de la méthode Seasonly. Il active les 57 muscles du visage, stimule le drainage lymphatique pour réduire les gonflements et augmente la circulation sanguine pour un effet lifting naturel.',
    category: 'Technique',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '4',
    titleEn: 'Double Cleansing: The Ritual That Changes Everything',
    titleFr: 'Double nettoyage : le rituel qui change tout',
    bodyEn: 'Double cleansing is essential for removing all traces of SPF, makeup, and pollution. Start with an oil-based cleanser to dissolve impurities, then follow with a gentle water-based cleanser to clear pores. Your subsequent skincare products will absorb up to 30% better.',
    bodyFr: 'Le double nettoyage est essentiel pour éliminer toutes les traces de protection solaire, maquillage et pollution. Commencez par un nettoyant à base d\'huile, puis suivez avec un nettoyant aqueux doux. Vos soins suivants s\'absorberont jusqu\'à 30% mieux.',
    category: 'Routine',
    readMinutes: 2,
    points: 10,
  },
  {
    id: '5',
    titleEn: 'Hyaluronic Acid: How to Use It Correctly',
    titleFr: 'Acide hyaluronique : comment bien l\'utiliser',
    bodyEn: 'Hyaluronic acid works by drawing moisture from the environment into your skin — but only when applied to damp skin. Apply it right after cleansing while your face is still slightly wet, then seal it in with your moisturizer. This one trick triples its effectiveness.',
    bodyFr: 'L\'acide hyaluronique attire l\'humidité de l\'environnement vers votre peau — mais uniquement si appliqué sur peau humide. Appliquez-le juste après le nettoyage pendant que votre visage est encore légèrement humide, puis scellez avec votre hydratant.',
    category: 'Ingredients',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '6',
    titleEn: 'Collagen & Elastin: Protecting Your Skin Structure',
    titleFr: 'Collagène & Élastine : préserver la structure de votre peau',
    bodyEn: 'Collagen gives your skin its firmness and structure, while elastin provides elasticity. After 25, your body produces 1% less collagen per year. The best defense: SPF every day (UV destroys collagen), vitamin C serums, retinol at night, and regular facial massage to stimulate fibroblasts.',
    bodyFr: 'Le collagène donne à votre peau sa fermeté, tandis que l\'élastine lui donne son élasticité. Après 25 ans, votre corps produit 1% de collagène en moins par an. La meilleure défense : protection solaire quotidienne, sérum vitamine C, rétinol le soir.',
    category: 'Science',
    readMinutes: 4,
    points: 10,
  },
  {
    id: '7',
    titleEn: 'Red Light Therapy: Science Behind the Glow',
    titleFr: 'Luminothérapie rouge : la science derrière l\'éclat',
    bodyEn: 'Red light (630–700nm) penetrates deep into skin tissue, energizing cells to produce more collagen and elastin. Clinical studies show visible reduction in fine lines after 8–12 weeks of consistent use. Seasonly\'s Borrow Device program gives you access to professional-grade devices.',
    bodyFr: 'La lumière rouge (630–700nm) pénètre profondément dans les tissus cutanés, stimulant les cellules à produire plus de collagène et d\'élastine. Des études cliniques montrent une réduction visible des rides après 8 à 12 semaines d\'utilisation régulière.',
    category: 'Technology',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '8',
    titleEn: 'Vitamin B3 & B5: The Skin-Strengthening Duo',
    titleFr: 'Vitamines B3 & B5 : le duo renforçant',
    bodyEn: 'Niacinamide (B3) reduces pore appearance, controls sebum, and evens skin tone — ideal for combination and acne-prone skin. Panthenol (B5) deeply hydrates and accelerates healing. Together, they build a stronger, more resilient skin barrier that better resists external aggressors.',
    bodyFr: 'La niacinamide (B3) réduit l\'apparence des pores, contrôle le sébum et unifie le teint — idéale pour les peaux mixtes. Le panthénol (B5) hydrate en profondeur et accélère la guérison. Ensemble, ils renforcent la barrière cutanée.',
    category: 'Ingredients',
    readMinutes: 3,
    points: 10,
  },
  {
    id: '9',
    titleEn: 'Jaw & Neck: The Forgotten Zones',
    titleFr: 'Mâchoire & cou : les zones oubliées',
    bodyEn: 'The jawline and neck are among the first areas to show signs of aging, yet most skincare routines stop at the chin. Extend all your skincare products down to your décolleté, and add 2 minutes of lymphatic drainage massage along the neck to reduce tension and define the contour.',
    bodyFr: 'La mâchoire et le cou sont parmi les premières zones à montrer des signes de vieillissement, pourtant la plupart des routines s\'arrêtent au menton. Étendez tous vos soins jusqu\'au décolleté et ajoutez 2 minutes de massage de drainage lymphatique.',
    category: 'Technique',
    readMinutes: 2,
    points: 10,
  },
  {
    id: '10',
    titleEn: 'SPF Every Day: Non-Negotiable',
    titleFr: 'SPF chaque jour : non-négociable',
    bodyEn: 'Up to 80% of visible skin aging is caused by UV exposure — including on cloudy days and through windows. Apply SPF 30–50 as the last step of your morning routine, every single day, all year round. It\'s the single most effective anti-aging product you can use.',
    bodyFr: 'Jusqu\'à 80% du vieillissement cutané visible est causé par l\'exposition aux UV — même par temps nuageux ou à travers les vitres. Appliquez un SPF 30–50 en dernière étape de votre routine matinale, chaque jour, toute l\'année.',
    category: 'Protection',
    readMinutes: 2,
    points: 10,
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add constants/tips.ts
git commit -m "feat: add 10 real Seasonly tips in EN and FR"
```

---

### Task 5: Create Tip Detail screen

**Files:**
- Create: `app/(tabs)/tip/[id].tsx`

- [ ] **Step 1: Create `app/(tabs)/tip/[id].tsx`**

```tsx
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  categoryPill: { backgroundColor: Colors.primaryLight, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  categoryText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  scroll: { padding: 20, paddingBottom: 20 },
  readTime: { fontSize: 12, color: Colors.subtle, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: '800', color: Colors.dark, marginBottom: 20, lineHeight: 34 },
  body: { fontSize: 16, color: Colors.medium, lineHeight: 26 },
  bottomBar: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: Colors.border, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12 },
  earnBtn: { backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  earnBtnDone: { backgroundColor: '#E8F5E9' },
  earnBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  earnBtnTextDone: { color: Colors.green },
});
```

- [ ] **Step 2: Update Home screen tip card to link to tip detail**

In `app/(tabs)/index.tsx`, find the "Tap to read & earn 10 points" `TouchableOpacity` and change its `onPress` to:
```typescript
onPress={() => router.push({ pathname: '/(tabs)/tip/[id]', params: { id: tips[0].id } })}
```

Add at top of file:
```typescript
import { useRouter } from 'expo-router';
import { tips } from '@/constants/tips';
import { useLanguage } from '@/contexts/LanguageContext';
```

Replace the hardcoded tip title and subtitle with:
```typescript
const { lang, t } = useLanguage();
const todayTip = tips[0];
const tipTitle = lang === 'fr' ? todayTip.titleFr : todayTip.titleEn;
```

- [ ] **Step 3: Commit**

```bash
git add "app/(tabs)/tip/[id].tsx" app/(tabs)/index.tsx
git commit -m "feat: add tip detail screen with real Seasonly content and points earn button"
```

---

## Chunk 3: Editable Profile (name, photo, phone, email)

### Task 6: Create Edit Profile screen

**Files:**
- Create: `app/(tabs)/profile/edit.tsx`
- Modify: `app/(tabs)/profile.tsx` (or restructure as `app/(tabs)/profile/index.tsx` if needed)

> **Note:** Check if `app/(tabs)/profile.tsx` already exists as a file (not a folder). If so, we'll add an edit modal instead of a separate screen to avoid restructuring.

- [ ] **Step 1: Install expo-image-picker if not already installed**

```bash
npx expo install expo-image-picker
```

- [ ] **Step 2: Create `app/(tabs)/profile/edit.tsx`**

```tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

export default function EditProfileScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [name, setName] = useState(mockUser.fullName);
  const [email, setEmail] = useState(mockUser.email);
  const [phone, setPhone] = useState(mockUser.phone);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.multiGet(['profile_name', 'profile_email', 'profile_phone', 'profile_photo']).then(pairs => {
      const obj = Object.fromEntries(pairs.map(([k, v]) => [k, v]));
      if (obj.profile_name) setName(obj.profile_name);
      if (obj.profile_email) setEmail(obj.profile_email);
      if (obj.profile_phone) setPhone(obj.profile_phone);
      if (obj.profile_photo) setPhotoUri(obj.profile_photo);
    });
  }, []);

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow photo access to change your profile picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const save = async () => {
    await AsyncStorage.multiSet([
      ['profile_name', name],
      ['profile_email', email],
      ['profile_phone', phone],
      ['profile_photo', photoUri ?? ''],
    ]);
    router.back();
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar picker */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={pickPhoto} style={styles.avatarWrapper}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatarImg} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.initials}>{initials}</Text>
              </View>
            )}
            <View style={styles.cameraOverlay}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.changePhotoText}>{t('profile_change_photo')}</Text>
        </View>

        {/* Fields */}
        {[
          { label: t('profile_name'), value: name, setter: setName, keyboardType: 'default' as const },
          { label: t('profile_email'), value: email, setter: setEmail, keyboardType: 'email-address' as const },
          { label: t('profile_phone'), value: phone, setter: setPhone, keyboardType: 'phone-pad' as const },
        ].map(({ label, value, setter, keyboardType }) => (
          <View key={label} style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={setter}
              keyboardType={keyboardType}
              autoCapitalize="none"
            />
          </View>
        ))}
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveBtn} onPress={save}>
          <Text style={styles.saveBtnText}>{t('profile_save')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.dark },
  scroll: { padding: 20, paddingBottom: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  avatarImg: { width: 88, height: 88, borderRadius: 44 },
  initials: { fontSize: 30, fontWeight: '700', color: Colors.primary },
  cameraOverlay: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  changePhotoText: { marginTop: 10, fontSize: 13, color: Colors.primary, fontWeight: '600' },
  fieldGroup: { marginBottom: 20 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: Colors.subtle, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: Colors.dark, borderWidth: 1, borderColor: Colors.border },
  bottomBar: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: Colors.border, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12 },
  saveBtn: { backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
```

- [ ] **Step 3: Update profile.tsx to load saved data and show real photo**

At the top of `ProfileScreen`, load saved profile data from AsyncStorage on mount:
```typescript
const [profileName, setProfileName] = useState(mockUser.fullName);
const [profileEmail, setProfileEmail] = useState(mockUser.email);
const [profilePhone, setProfilePhone] = useState(mockUser.phone);
const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

useFocusEffect(useCallback(() => {
  AsyncStorage.multiGet(['profile_name', 'profile_email', 'profile_phone', 'profile_photo']).then(pairs => {
    const obj = Object.fromEntries(pairs.map(([k, v]) => [k, v]));
    if (obj.profile_name) setProfileName(obj.profile_name);
    if (obj.profile_email) setProfileEmail(obj.profile_email);
    if (obj.profile_phone) setProfilePhone(obj.profile_phone);
    if (obj.profile_photo) setProfilePhoto(obj.profile_photo);
  });
}, []));
```

Add imports: `useFocusEffect`, `useCallback` from react, `AsyncStorage`, `Image`.

Change "Edit Profile" button `onPress` to `() => router.push('/(tabs)/profile/edit')`.

Replace avatar `View` with conditional: if `profilePhoto`, show `<Image source={{ uri: profilePhoto }} style={styles.avatar} />`, else show initials `View`.

Replace `{mockUser.fullName}`, `{mockUser.email}`, `{mockUser.phone}` with `{profileName}`, `{profileEmail}`, `{profilePhone}`.

- [ ] **Step 4: Commit**

```bash
git add "app/(tabs)/profile/edit.tsx" app/(tabs)/profile.tsx
git commit -m "feat: add editable profile with photo picker and AsyncStorage persistence"
```

---

## Chunk 4: Notification Settings

### Task 7: Create Notifications settings screen

**Files:**
- Create: `app/(tabs)/profile/notifications.tsx`

- [ ] **Step 1: Create `app/(tabs)/profile/notifications.tsx`**

```tsx
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/colors';

interface NotifPrefs {
  booking: boolean;
  tips: boolean;
  rewards: boolean;
  promos: boolean;
}

const DEFAULTS: NotifPrefs = { booking: true, tips: true, rewards: true, promos: false };

export default function NotificationsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [prefs, setPrefs] = useState<NotifPrefs>(DEFAULTS);

  useEffect(() => {
    AsyncStorage.getItem('notif_prefs').then(val => {
      if (val) setPrefs(JSON.parse(val));
    });
  }, []);

  const toggle = (key: keyof NotifPrefs) => {
    setPrefs(prev => {
      const next = { ...prev, [key]: !prev[key] };
      AsyncStorage.setItem('notif_prefs', JSON.stringify(next));
      return next;
    });
  };

  const rows: { key: keyof NotifPrefs; icon: string; label: string; desc: string }[] = [
    { key: 'booking', icon: 'calendar-outline', label: t('notif_booking'), desc: t('notif_booking_desc') },
    { key: 'tips', icon: 'bulb-outline', label: t('notif_tips'), desc: t('notif_tips_desc') },
    { key: 'rewards', icon: 'trophy-outline', label: t('notif_rewards'), desc: t('notif_rewards_desc') },
    { key: 'promos', icon: 'pricetag-outline', label: t('notif_promos'), desc: t('notif_promos_desc') },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile_notifications')}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.hint}>Manage which notifications you receive from Seasonly.</Text>
        {rows.map(row => (
          <View key={row.key} style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name={row.icon as any} size={20} color={Colors.primary} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowDesc}>{row.desc}</Text>
            </View>
            <Switch
              value={prefs[row.key]}
              onValueChange={() => toggle(row.key)}
              trackColor={{ false: '#E0D9D3', true: Colors.primaryLight }}
              thumbColor={prefs[row.key] ? Colors.primary : '#fff'}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.dark },
  scroll: { padding: 20 },
  hint: { fontSize: 13, color: Colors.subtle, marginBottom: 24 },
  row: { backgroundColor: '#fff', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  rowText: { flex: 1 },
  rowLabel: { fontSize: 15, fontWeight: '700', color: Colors.dark, marginBottom: 2 },
  rowDesc: { fontSize: 12, color: Colors.subtle },
});
```

- [ ] **Step 2: Add Notifications row to Profile screen**

In `app/(tabs)/profile.tsx`, add a notifications row that navigates to the new screen. Place it after the language toggle row:

```tsx
<TouchableOpacity style={styles.settingsRow} onPress={() => router.push('/(tabs)/profile/notifications')}>
  <Ionicons name="notifications-outline" size={20} color={Colors.dark} />
  <Text style={styles.settingsRowText}>{t('profile_notifications')}</Text>
  <Ionicons name="chevron-forward" size={18} color={Colors.subtle} />
</TouchableOpacity>
```

Styles:
```typescript
settingsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 10 },
settingsRowText: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.dark },
```

- [ ] **Step 3: Commit**

```bash
git add "app/(tabs)/profile/notifications.tsx" app/(tabs)/profile.tsx
git commit -m "feat: add notification preferences screen with per-category toggles"
```

---

## Chunk 5: Referral Link

### Task 8: Add Referral Link section to Profile

**Files:**
- Modify: `app/(tabs)/profile.tsx`

- [ ] **Step 1: Add referral link section to profile.tsx**

Add the following imports at the top:
```typescript
import { Share, Clipboard } from 'react-native';
```

Add a `referralLink` constant inside the component:
```typescript
const referralLink = `https://seasonly.fr/refer/${profileName.split(' ')[0].toUpperCase()}${new Date().getFullYear()}`;
```

Add a referral card section after the notifications row:
```tsx
<View style={styles.referralCard}>
  <View style={styles.referralHeader}>
    <Ionicons name="gift-outline" size={20} color={Colors.primary} />
    <Text style={styles.referralTitle}>{t('profile_referral')}</Text>
  </View>
  <Text style={styles.referralDesc}>{t('profile_referral_desc')}</Text>
  <View style={styles.referralLinkBox}>
    <Text style={styles.referralLinkText} numberOfLines={1}>{referralLink}</Text>
  </View>
  <View style={styles.referralBtns}>
    <TouchableOpacity
      style={styles.referralShareBtn}
      onPress={() => Share.share({ message: `Join me on Seasonly! Use my referral link: ${referralLink}` })}
    >
      <Ionicons name="share-outline" size={16} color="#fff" />
      <Text style={styles.referralShareBtnText}>{t('profile_share_link')}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.referralCopyBtn}
      onPress={() => { Clipboard.setString(referralLink); }}
    >
      <Ionicons name="copy-outline" size={16} color={Colors.primary} />
    </TouchableOpacity>
  </View>
</View>
```

Styles to add:
```typescript
referralCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginTop: 8, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
referralHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
referralTitle: { fontSize: 16, fontWeight: '700', color: Colors.dark },
referralDesc: { fontSize: 13, color: Colors.medium, marginBottom: 14 },
referralLinkBox: { backgroundColor: Colors.background, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
referralLinkText: { fontSize: 13, color: Colors.subtle, fontFamily: 'monospace' },
referralBtns: { flexDirection: 'row', gap: 10 },
referralShareBtn: { flex: 1, backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
referralShareBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
referralCopyBtn: { width: 46, height: 46, backgroundColor: Colors.primaryLight, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
```

- [ ] **Step 2: Commit**

```bash
git add app/(tabs)/profile.tsx
git commit -m "feat: add referral link card with native share sheet and clipboard copy"
```

---

## Chunk 6: Wire i18n across remaining screens

### Task 9: Apply `t()` to Home, Rewards, Book screens

- [ ] **Step 1: Update Home screen**

In `app/(tabs)/index.tsx`, import and use `useLanguage()`. Replace all hardcoded strings:
- `'Welcome back, Marie'` → `` `${t('home_greeting')}, ${profileName}` ``
- `"Let's take care of your skin today"` → `t('home_subtitle')`
- `'Day Streak'` → `t('home_day_streak')`
- `'Skin Miles'` → `t('home_skin_miles')`
- `'Daily Wellness Tip'` → `t('home_daily_tip')`
- `'New'` → `t('home_new_badge')`
- `'Tap to read & earn 10 points →'` → `t('home_tap_to_read')`
- `'Quick Actions'` → `t('home_quick_actions')`
- `'Book Massage'` → `t('home_book_massage')`
- `'Daily Challenge'` → `t('home_daily_challenge')`
- `'Shop'` → `t('home_shop')`
- `'Borrow Device'` → `t('home_borrow_device')`

- [ ] **Step 2: Update Rewards screen**

In `app/(tabs)/rewards.tsx`, import and use `useLanguage()`. Replace:
- `'Rewards & Challenges'` → `t('rewards_title')`
- `'Complete challenges to earn Skin Miles'` → `t('rewards_subtitle')`
- `"Today's Progress"` → `t('rewards_today_progress')`
- `'Complete all challenges...'` → `t('rewards_complete_all')`
- `'Self-Massage Routines'` → `t('rewards_self_massage')`
- `'See All'` → `t('rewards_see_all')`
- `'Redeem Your Points'` → `t('rewards_redeem_title')`
- `'How to Earn Points'` → `t('rewards_how_to_earn')`
- HOW_TO_EARN array entries → use `t('rewards_how_1')` through `t('rewards_how_4')`
- `'Redeem'` buttons → `t('rewards_redeem_btn')`
- `'Locked'` → `t('rewards_locked')`

- [ ] **Step 3: Update Book screens**

In `app/(tabs)/book/index.tsx`, `service.tsx`, `people.tsx`, `date.tsx`, `confirm.tsx`:
- Title `'Book Treatment'` → `t('book_title')`
- `'Continue'` buttons → `t('book_continue')`
- `'Confirm Booking'` → `t('book_confirm')`

- [ ] **Step 4: Commit**

```bash
git add "app/(tabs)/index.tsx" "app/(tabs)/rewards.tsx" "app/(tabs)/book/"
git commit -m "feat: apply i18n t() across Home, Rewards, and Book screens"
```

---

## Final: Push to GitHub and deploy

- [ ] **Step 1: Push all commits**

```bash
git push origin master
```

- [ ] **Step 2: Verify Vercel auto-deploys** — visit your Vercel dashboard, confirm deployment triggered.

- [ ] **Step 3: Build new APK**

```bash
npx eas build --platform android --profile preview --non-interactive
```
