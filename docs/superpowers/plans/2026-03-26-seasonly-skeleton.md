# Seasonly Mobile App — Skeleton Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full UI skeleton for the Seasonly mobile app — auth, onboarding, and all 5 main tabs — using Expo Router + TypeScript with hardcoded mock data.

**Architecture:** Expo Router file-based navigation with three zones: (auth), (onboarding), and (tabs). All data is hardcoded in `constants/mockData.ts`. No backend, no real auth.

**Tech Stack:** Expo SDK 51+, Expo Router v3, TypeScript, @expo/vector-icons, expo-camera, react-native-safe-area-context

---

## Chunk 1: Project Setup + Design System

### Task 1: Initialize Expo project

**Files:**
- Create: `package.json`, `app.json`, `tsconfig.json`, `app/_layout.tsx`

- [ ] **Step 1: Scaffold Expo project with TypeScript template**

Run inside `D:/Library/Desktop/Seasonly Mobile App`:
```bash
npx create-expo-app@latest . --template blank-typescript
```
Expected: Project files created, `package.json` present.

- [ ] **Step 2: Install Expo Router and dependencies**
```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar expo-camera @react-native-async-storage/async-storage expo-linear-gradient
```

- [ ] **Step 3: Update `package.json` main entry**

Set `"main": "expo-router/entry"` in `package.json`.

- [ ] **Step 4: Update `app.json`**
```json
{
  "expo": {
    "name": "Seasonly",
    "slug": "seasonly-app",
    "scheme": "seasonly",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "assetBundlePatterns": ["**/*"]
  }
}
```

- [ ] **Step 5: Verify app starts**
```bash
npx expo start
```
Expected: QR code shown, no errors.

- [ ] **Step 6: Commit**
```bash
git init
git add .
git commit -m "feat: initialize Expo Router + TypeScript project"
```

---

### Task 2: Design system constants

**Files:**
- Create: `constants/colors.ts`
- Create: `constants/mockData.ts`

- [ ] **Step 1: Create `constants/colors.ts`**
```typescript
export const Colors = {
  background: '#FAF5F0',
  primary: '#C4826A',
  primaryLight: '#E8C4B4',
  gold: '#C8960C',
  green: '#4CAF50',
  purple: '#7C6FAE',
  purpleLight: '#EDE9F7',
  dark: '#1A1A1A',
  medium: '#555555',
  subtle: '#888888',
  border: '#E8E0D8',
  card: '#FFFFFF',
  orange: '#F28C38',
};
```

- [ ] **Step 2: Create `constants/mockData.ts`**
```typescript
export const mockUser = {
  name: 'Marie',
  fullName: 'Marie Rousseau',
  email: 'marie.r@example.com',
  phone: '+33 6 12 34 56 78',
  initials: 'MR',
  streak: 7,
  skinMiles: 1245,
  rewardsCount: 3,
  membershipTier: 'Pro',
  membershipExpiry: 'Jan 2025',
  skinType: 'Combination • Dehydrated',
  skinConcerns: ['Fine Lines', 'Dark Circles', 'Dullness'],
  skinDiagnosticDate: 'Nov 15, 2024',
  skinScorePercent: 78,
  skinScoreAge: 32,
};

export const mockStudios = [
  {
    id: '1',
    name: 'Seasonly Paris – Marais',
    address: '42 Rue des Francs Bourgeois, 75003 Paris, France',
    phone: '+33 1 42 74 39 19',
    email: 'marais@seasonly.fr',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
  },
  {
    id: '2',
    name: 'Seasonly Paris – Saint-Germain',
    address: '15 Rue de Rennes, 75006 Paris, France',
    phone: '+33 1 45 48 20 10',
    email: 'saintgermain@seasonly.fr',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800',
  },
];

export const mockServices = [
  {
    id: '1',
    name: 'Sculpting Facial Massage',
    description: 'A soothing massage that relieves tension and promotes relaxation',
    duration: '30 min',
    price: 69,
  },
  {
    id: '2',
    name: 'Anti-Aging Treatment',
    description: 'Advanced facial treatment targeting fine lines and wrinkles',
    duration: '1 hour',
    price: 138,
  },
  {
    id: '3',
    name: 'Lymphatic Drainage',
    description: 'Specialized massage to reduce puffiness and improve circulation',
    duration: '30 min',
    price: 69,
  },
];

export const mockRoutines = [
  {
    id: '1',
    name: 'Morning Glow',
    description: 'Start your day with this energizing facial massage routine',
    points: 50,
    completed: true,
  },
  {
    id: '2',
    name: 'Evening Lift',
    description: 'End your day with a relaxing sculpting routine',
    points: 50,
    completed: false,
  },
  {
    id: '3',
    name: 'Hydration Boost',
    description: 'A quick routine to lock in moisture and reduce dryness',
    points: 50,
    completed: false,
  },
  {
    id: '4',
    name: 'Jawline Sculptor',
    description: 'Targeted exercises to define and slim the jawline',
    points: 50,
    completed: false,
  },
];

export const mockProducts = [
  {
    id: '1',
    name: 'Radiance Facial Serum',
    category: 'Serums',
    price: 89,
    rating: 4.8,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
  },
  {
    id: '2',
    name: 'Jade Facial Roller',
    category: 'Tools',
    price: 42,
    rating: 4.8,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400',
  },
  {
    id: '3',
    name: 'Hydrating Face Cream',
    category: 'Creams',
    price: 65,
    rating: 4.6,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
  },
  {
    id: '4',
    name: 'Rosehip Face Oil',
    category: 'Oils',
    price: 55,
    rating: 4.7,
    isBestSeller: false,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400',
  },
];

export const mockRedeemItems = [
  { id: '1', name: '10% Off Voucher', icon: '🎟️', points: 500 },
  { id: '2', name: 'Free Face Serum', icon: '💧', points: 1000 },
];

export const onboardingObjectives = [
  'Slim the jawline',
  'Reduce double chin',
  'Lift cheeks',
  'Improve skin firmness',
  'Reduce morning puffiness',
  'Improve skin glow',
  'Facial fat burning',
  'Self-care routine',
  'Build confidence',
];

export const skinTypes = [
  { id: 'normal', label: 'Normal skin', subtitle: 'Balanced, no major concerns', icon: 'sparkles' },
  { id: 'dry', label: 'Dry skin', subtitle: 'Feels tight, rough texture', icon: 'wind' },
  { id: 'oily', label: 'Oily skin', subtitle: 'Shiny appearance, visible pores', icon: 'sunny' },
  { id: 'combination', label: 'Combination skin', subtitle: 'Dry and oily in different zones', icon: 'water' },
];
```

- [ ] **Step 3: Commit**
```bash
git add constants/
git commit -m "feat: add design system colors and mock data"
```

---

## Chunk 2: Reusable UI Components

### Task 3: Core UI components

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/ProgressBar.tsx`
- Create: `components/ui/StepperHeader.tsx`

- [ ] **Step 1: Create `components/ui/Button.tsx`**
```typescript
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export function Button({ label, onPress, variant = 'primary', disabled, loading, style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : Colors.primary} />
      ) : (
        <Text style={[styles.label, variant !== 'primary' && styles.labelAlt]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 30, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: Colors.primary },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.primary },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.5 },
  label: { color: '#fff', fontWeight: '600', fontSize: 16 },
  labelAlt: { color: Colors.primary },
});
```

- [ ] **Step 2: Create `components/ui/Card.tsx`**
```typescript
import { View, StyleSheet, ViewStyle } from 'react-native';

type Props = { children: React.ReactNode; style?: ViewStyle };

export function Card({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
```

- [ ] **Step 3: Create `components/ui/ProgressBar.tsx`**
```typescript
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = { progress: number }; // 0 to 1

export function ProgressBar({ progress }: Props) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, backgroundColor: Colors.primaryLight, borderRadius: 3 },
  fill: { height: 6, backgroundColor: Colors.primary, borderRadius: 3 },
});
```

- [ ] **Step 4: Create `components/ui/StepperHeader.tsx`**
```typescript
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

const STEPS = ['Studio', 'Service', 'People', 'Date', 'Confirm'];

type Props = { currentStep: number }; // 1–5

export function StepperHeader({ currentStep }: Props) {
  return (
    <View style={styles.row}>
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < currentStep;
        const active = stepNum === currentStep;
        return (
          <View key={label} style={styles.stepWrapper}>
            {i > 0 && <View style={[styles.line, done && styles.lineDone]} />}
            <View style={[styles.circle, done && styles.circleDone, active && styles.circleActive]}>
              {done ? (
                <Ionicons name="checkmark" size={14} color="#fff" />
              ) : (
                <Text style={[styles.num, active && styles.numActive]}>{stepNum}</Text>
              )}
            </View>
            <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', paddingVertical: 16 },
  stepWrapper: { alignItems: 'center', flex: 1, position: 'relative' },
  line: { position: 'absolute', top: 14, left: '-50%', right: '50%', height: 2, backgroundColor: '#DDD', zIndex: 0 },
  lineDone: { backgroundColor: Colors.green },
  circle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E0E0E0', alignItems: 'center', justifyContent: 'center' },
  circleDone: { backgroundColor: Colors.green },
  circleActive: { backgroundColor: Colors.green },
  num: { fontSize: 12, color: '#999', fontWeight: '600' },
  numActive: { color: '#fff' },
  stepLabel: { fontSize: 10, color: '#999', marginTop: 4, textAlign: 'center' },
  stepLabelActive: { color: Colors.green, fontWeight: '600' },
});
```

- [ ] **Step 5: Commit**
```bash
git add components/ui/
git commit -m "feat: add core UI components (Button, Card, ProgressBar, StepperHeader)"
```

---

### Task 4: Onboarding-specific components

**Files:**
- Create: `components/onboarding/ObjectivePill.tsx`
- Create: `components/onboarding/SkinTypeCard.tsx`

- [ ] **Step 1: Create `components/onboarding/ObjectivePill.tsx`**
```typescript
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = { label: string; selected: boolean; onPress: () => void };

export function ObjectivePill({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.pill, selected && styles.pillSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 30, borderWidth: 1.5, borderColor: Colors.border,
    paddingHorizontal: 16, paddingVertical: 10, margin: 4, backgroundColor: '#fff',
  },
  pillSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  label: { color: Colors.dark, fontSize: 14 },
  labelSelected: { color: Colors.primary, fontWeight: '600' },
});
```

- [ ] **Step 2: Create `components/onboarding/SkinTypeCard.tsx`**
```typescript
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type Props = {
  label: string;
  subtitle: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
};

export function SkinTypeCard({ label, subtitle, icon, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconBox, selected && styles.iconBoxSelected]}>
        <Ionicons name={icon as any} size={20} color={selected ? Colors.primary : Colors.subtle} />
      </View>
      <View style={styles.text}>
        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 16, padding: 16, marginBottom: 12,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  cardSelected: { borderColor: Colors.primary },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  iconBoxSelected: { backgroundColor: Colors.primaryLight },
  text: { flex: 1 },
  label: { fontSize: 16, fontWeight: '600', color: Colors.dark },
  labelSelected: { color: Colors.primary },
  subtitle: { fontSize: 13, color: Colors.subtle, marginTop: 2 },
});
```

- [ ] **Step 3: Commit**
```bash
git add components/onboarding/
git commit -m "feat: add onboarding pill and skin type card components"
```

---

## Chunk 3: Auth + Root Layout

### Task 5: Root layout and auth screen

**Files:**
- Create/Modify: `app/_layout.tsx`
- Create: `app/(auth)/_layout.tsx`
- Create: `app/(auth)/index.tsx`

- [ ] **Step 1: Update `app/_layout.tsx`**
```typescript
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
```

- [ ] **Step 2: Create `app/(auth)/_layout.tsx`**
```typescript
import { Stack } from 'expo-router';
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

- [ ] **Step 3: Create `app/(auth)/index.tsx`**
```typescript
import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/ui/Button';

export default function AuthScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => router.replace('/(onboarding)/step1');

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <View style={styles.logoArea}>
            <Text style={styles.logoText}>seasonly</Text>
            <Text style={styles.logoSub}>PARIS</Text>
            <Text style={styles.tagline}>Take your Skin to the Gym</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            {/* Tab toggle */}
            <View style={styles.tabs}>
              <TouchableOpacity style={[styles.tabBtn, tab === 'login' && styles.tabActive]} onPress={() => setTab('login')}>
                <Text style={[styles.tabLabel, tab === 'login' && styles.tabLabelActive]}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabBtn, tab === 'signup' && styles.tabActive]} onPress={() => setTab('signup')}>
                <Text style={[styles.tabLabel, tab === 'signup' && styles.tabLabelActive]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.heading}>{tab === 'login' ? 'Welcome Back' : 'Create Account'}</Text>

            {/* Email */}
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={18} color={Colors.subtle} style={styles.inputIcon} />
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.subtle}
                value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>

            {/* Password */}
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={18} color={Colors.subtle} style={styles.inputIcon} />
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="Password" placeholderTextColor={Colors.subtle}
                value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.subtle} />
              </TouchableOpacity>
            </View>

            {tab === 'login' && (
              <TouchableOpacity style={styles.forgotRow}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            <Button label={tab === 'login' ? 'Login' : 'Sign Up'} onPress={handleSubmit} style={styles.btn} />

            {/* Social */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} /><Text style={styles.dividerText}>Or continue with</Text><View style={styles.divider} />
            </View>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialLabel}>G  Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Text style={styles.socialLabel}>f  Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, padding: 24, alignItems: 'center' },
  logoArea: { alignItems: 'center', marginVertical: 32 },
  logoText: { fontSize: 36, fontWeight: '300', letterSpacing: 2, color: Colors.dark },
  logoSub: { fontSize: 12, letterSpacing: 6, color: Colors.dark, marginTop: -4 },
  tagline: { color: Colors.gold, fontSize: 14, marginTop: 8, fontStyle: 'italic' },
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 4 },
  tabs: { flexDirection: 'row', backgroundColor: Colors.background, borderRadius: 30, padding: 4, marginBottom: 24 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 26, alignItems: 'center' },
  tabActive: { backgroundColor: Colors.primary },
  tabLabel: { color: Colors.subtle, fontWeight: '600' },
  tabLabelActive: { color: '#fff' },
  heading: { fontSize: 22, fontWeight: '700', color: Colors.dark, marginBottom: 20, textAlign: 'center' },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 12 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: Colors.dark },
  forgotRow: { alignItems: 'flex-end', marginBottom: 20 },
  forgotText: { color: Colors.gold, fontSize: 13 },
  btn: { marginBottom: 20 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  divider: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { marginHorizontal: 10, color: Colors.subtle, fontSize: 13 },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: { flex: 1, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  socialLabel: { color: Colors.dark, fontWeight: '500' },
});
```

- [ ] **Step 4: Commit**
```bash
git add app/
git commit -m "feat: add root layout and auth login/signup screen"
```

---

## Chunk 4: Onboarding Screens

### Task 6: Onboarding layout + shared wrapper

**Files:**
- Create: `app/(onboarding)/_layout.tsx`
- Create: `components/onboarding/OnboardingWrapper.tsx`

- [ ] **Step 1: Create `app/(onboarding)/_layout.tsx`**
```typescript
import { Stack } from 'expo-router';
export default function OnboardingLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

- [ ] **Step 2: Create `components/onboarding/OnboardingWrapper.tsx`**
```typescript
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { ProgressBar } from '@/components/ui/ProgressBar';

type Props = {
  step: number;
  totalSteps: number;
  children: React.ReactNode;
};

export function OnboardingWrapper({ step, totalSteps, children }: Props) {
  const percent = Math.round((step / totalSteps) * 100);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step {step} of {totalSteps}</Text>
        <Text style={styles.percentText}>{percent}%</Text>
      </View>
      <ProgressBar progress={step / totalSteps} />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 },
  stepText: { color: Colors.subtle, fontSize: 13 },
  percentText: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 24 },
});
```

- [ ] **Step 3: Commit**
```bash
git add app/(onboarding)/ components/onboarding/OnboardingWrapper.tsx
git commit -m "feat: add onboarding layout and shared wrapper"
```

---

### Task 7: Onboarding Steps 1–3

**Files:**
- Create: `app/(onboarding)/step1.tsx`
- Create: `app/(onboarding)/step2.tsx`
- Create: `app/(onboarding)/step3.tsx`

- [ ] **Step 1: Create `app/(onboarding)/step1.tsx`**
```typescript
import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { ObjectivePill } from '@/components/onboarding/ObjectivePill';
import { Button } from '@/components/ui/Button';
import { onboardingObjectives } from '@/constants/mockData';
import { Colors } from '@/constants/colors';

export default function Step1() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) =>
    setSelected(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);

  return (
    <OnboardingWrapper step={1} totalSteps={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Select your main objectives</Text>
        <Text style={styles.subtitle}>Help us personalize your facial fitness program by selecting what matters most to you. Choose as many as you like.</Text>
        <View style={styles.pillsRow}>
          {onboardingObjectives.map(obj => (
            <ObjectivePill key={obj} label={obj} selected={selected.includes(obj)} onPress={() => toggle(obj)} />
          ))}
        </View>
        <Button label="Continue" onPress={() => router.push('/(onboarding)/step2')}
          disabled={selected.length === 0} style={styles.btn} />
      </ScrollView>
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700', color: Colors.dark, marginTop: 24, marginBottom: 10 },
  subtitle: { fontSize: 14, color: Colors.medium, lineHeight: 20, marginBottom: 24 },
  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 },
  btn: { marginBottom: 24 },
});
```

- [ ] **Step 2: Create `app/(onboarding)/step2.tsx`**
```typescript
import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { SkinTypeCard } from '@/components/onboarding/SkinTypeCard';
import { Button } from '@/components/ui/Button';
import { skinTypes } from '@/constants/mockData';
import { Colors } from '@/constants/colors';

export default function Step2() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <OnboardingWrapper step={2} totalSteps={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>How would you describe your skin?</Text>
        <Text style={styles.subtitle}>Understanding your skin type helps us recommend the most effective facial exercises and techniques for you.</Text>
        {skinTypes.map(type => (
          <SkinTypeCard key={type.id} label={type.label} subtitle={type.subtitle} icon={type.icon}
            selected={selected === type.id} onPress={() => setSelected(type.id)} />
        ))}
        <Button label="Continue" onPress={() => router.push('/(onboarding)/step3')}
          disabled={!selected} style={styles.btn} />
      </ScrollView>
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700', color: Colors.dark, marginTop: 24, marginBottom: 10 },
  subtitle: { fontSize: 14, color: Colors.medium, lineHeight: 20, marginBottom: 24 },
  btn: { marginBottom: 24 },
});
```

- [ ] **Step 3: Create `app/(onboarding)/step3.tsx`**
```typescript
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';

export default function Step3() {
  const router = useRouter();
  return (
    <OnboardingWrapper step={3} totalSteps={5}>
      <View style={styles.container}>
        <Text style={styles.title}>Are you ready to see visible results in just 4 weeks?</Text>
        <Text style={styles.subtitle}>Join thousands of people who have transformed their skin with facial fitness.</Text>
        <View style={styles.imageRow}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400' }} style={styles.image} />
            <View style={styles.badge}><Text style={styles.badgeText}>Before</Text></View>
          </View>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400' }} style={styles.image} />
            <View style={[styles.badge, styles.badgeAfter]}><Text style={styles.badgeText}>After</Text></View>
          </View>
        </View>
        <Text style={styles.stars}>★★★★★</Text>
        <Button label="Yes, absolutely!" onPress={() => router.push('/(onboarding)/step4')} />
      </View>
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 24 },
  title: { fontSize: 26, fontWeight: '700', color: Colors.dark, marginBottom: 10 },
  subtitle: { fontSize: 14, color: Colors.medium, lineHeight: 20, marginBottom: 24, textAlign: 'center' },
  imageRow: { flexDirection: 'row', gap: 4, borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  imageWrapper: { flex: 1, position: 'relative' },
  image: { width: '100%', height: 200 },
  badge: { position: 'absolute', bottom: 8, left: 8, backgroundColor: '#000', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  badgeAfter: { left: undefined, right: 8, backgroundColor: Colors.primary },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  stars: { fontSize: 24, color: '#F5C518', textAlign: 'center', marginBottom: 24 },
});
```

- [ ] **Step 4: Commit**
```bash
git add app/(onboarding)/step1.tsx app/(onboarding)/step2.tsx app/(onboarding)/step3.tsx
git commit -m "feat: add onboarding steps 1-3"
```

---

### Task 8: Onboarding Steps 4–5 + Program Ready + Welcome Modal

**Files:**
- Create: `app/(onboarding)/step4.tsx`
- Create: `app/(onboarding)/step4-scan.tsx`
- Create: `app/(onboarding)/step5.tsx`
- Create: `app/(onboarding)/program-ready.tsx`
- Create: `app/(onboarding)/welcome-modal.tsx`

- [ ] **Step 1: Create `app/(onboarding)/step4.tsx`**
```typescript
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingWrapper } from '@/components/onboarding/OnboardingWrapper';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export default function Step4() {
  const router = useRouter();
  return (
    <OnboardingWrapper step={4} totalSteps={5}>
      <View style={styles.container}>
        <Text style={styles.title}>Personalize your program through AI skin analysis</Text>
        <Text style={styles.subtitle}>Get a precise assessment of your facial zones to create the most effective program for you.</Text>
        <View style={styles.scanCircle}>
          <Ionicons name="scan-outline" size={64} color={Colors.primaryLight} />
        </View>
        <View style={styles.features}>
          {[
            { icon: 'flash-outline', title: 'Takes only 10 seconds', sub: 'Quick and easy facial scan using your camera' },
            { icon: 'scan-outline', title: 'Adapted to your skin condition', sub: '' },
          ].map(f => (
            <View key={f.title} style={styles.featureRow}>
              <Ionicons name={f.icon as any} size={20} color={Colors.subtle} style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                {f.sub ? <Text style={styles.featureSub}>{f.sub}</Text> : null}
              </View>
            </View>
          ))}
        </View>
        <Button label="Start AI Analysis" onPress={() => router.push('/(onboarding)/step4-scan')} />
      </View>
    </OnboardingWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 24 },
  title: { fontSize: 26, fontWeight: '700', color: Colors.dark, marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 14, color: Colors.medium, lineHeight: 20, marginBottom: 32, textAlign: 'center' },
  scanCircle: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#E8EFF5', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  features: { marginBottom: 32 },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  featureTitle: { fontSize: 15, fontWeight: '600', color: Colors.dark },
  featureSub: { fontSize: 13, color: Colors.subtle, marginTop: 2 },
});
```

- [ ] **Step 2: Create `app/(onboarding)/step4-scan.tsx`**
```typescript
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';

export default function Step4Scan() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing camera...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          router.push('/(onboarding)/step5');
          return 100;
        }
        if (p === 30) setStatus('Analyzing skin zones...');
        if (p === 60) setStatus('Mapping facial structure...');
        if (p === 85) setStatus('Finalizing analysis...');
        return p + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step 4 of 5</Text>
        <Text style={styles.percentText}>80%</Text>
      </View>
      <Text style={styles.title}>AI Face Analysis</Text>
      <Text style={styles.statusText}>{status}</Text>
      {/* Camera placeholder */}
      <View style={styles.cameraBox}>
        <View style={styles.corner} style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
      {/* Circular progress */}
      <View style={styles.progressCircle}>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
      <View style={styles.statusRow}>
        <View style={styles.dot} />
        <Text style={styles.statusLabel}>{status}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stepText: { color: Colors.subtle, fontSize: 13 },
  percentText: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  title: { fontSize: 26, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginBottom: 4 },
  statusText: { color: Colors.gold, textAlign: 'center', marginBottom: 20, fontSize: 14 },
  cameraBox: { width: '100%', height: 280, backgroundColor: '#E0E8F0', borderRadius: 16, marginBottom: 32, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  corner: { position: 'absolute', width: 24, height: 24, borderColor: '#7BB8D4', borderWidth: 3 },
  topLeft: { top: 16, left: 16, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 16, right: 16, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 16, left: 16, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 16, right: 16, borderLeftWidth: 0, borderTopWidth: 0 },
  progressCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#A8CCD8', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  progressText: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginRight: 8 },
  statusLabel: { color: Colors.medium, fontSize: 14 },
});
```

- [ ] **Step 3: Create `app/(onboarding)/step5.tsx`**
```typescript
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

export default function Step5() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Step 5 of 5</Text>
        <Text style={styles.percentText}>100%</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.trophyCircle}>
          <Ionicons name="trophy-outline" size={36} color="#fff" />
        </View>
        <Text style={styles.title}>You did it!</Text>
        <Text style={styles.subtitle}>Your personalized facial fitness analysis is complete</Text>
        <Card style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Ionicons name="ribbon-outline" size={18} color={Colors.subtle} />
            <Text style={styles.scoreLabel}> Great News!</Text>
          </View>
          <Text style={styles.scorePercent}>{mockUser.skinScorePercent}%</Text>
          <Text style={styles.scoreDesc}>Your skin condition is better than {mockUser.skinScorePercent}% of people your age ({mockUser.skinScoreAge} years old)</Text>
          <View style={styles.improveBox}>
            <Text style={styles.improveText}>With our facial fitness program, you can improve even further!</Text>
          </View>
        </Card>
        <Text style={styles.priorityText}>However, we detected the following priorities:</Text>
        <Button label="See My Program" onPress={() => router.push('/(onboarding)/program-ready')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 24, paddingBottom: 8 },
  stepText: { color: Colors.subtle, fontSize: 13 },
  percentText: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  scroll: { padding: 24, alignItems: 'center' },
  trophyCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.purple, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.dark, marginBottom: 8 },
  subtitle: { fontSize: 14, color: Colors.medium, textAlign: 'center', marginBottom: 24 },
  scoreCard: { width: '100%', alignItems: 'center', marginBottom: 24 },
  scoreHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  scoreLabel: { color: Colors.medium, fontWeight: '600' },
  scorePercent: { fontSize: 48, fontWeight: '800', color: Colors.purple },
  scoreDesc: { fontSize: 14, color: Colors.medium, textAlign: 'center', marginBottom: 12 },
  improveBox: { backgroundColor: Colors.background, borderRadius: 12, padding: 12 },
  improveText: { fontSize: 13, color: Colors.medium, textAlign: 'center', fontStyle: 'italic' },
  priorityText: { fontSize: 18, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginBottom: 24 },
});
```

- [ ] **Step 4: Create `app/(onboarding)/program-ready.tsx`**
```typescript
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

const programItems = [
  { icon: 'radio-button-on-outline', label: 'Your Main Objectives', value: '1 goals selected' },
  { icon: 'time-outline', label: 'Daily Training Time', value: 'Under 5 minutes' },
  { icon: 'calendar-outline', label: 'Program Duration', value: '4 weeks to visible results' },
  { icon: 'flash-outline', label: 'Personalized Exercises', value: '12 targeted routines' },
];

export default function ProgramReady() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sparkle}>✦</Text>
        <Text style={styles.title}>{mockUser.name}, your personalized program is ready!</Text>
        <Text style={styles.subtitle}>We've created a custom facial fitness plan based on your goals and AI analysis.</Text>
        {programItems.map(item => (
          <Card key={item.label} style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon as any} size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemValue}>{item.value}</Text>
            </View>
          </Card>
        ))}
        <Button label="Start My Program Now" onPress={() => router.push('/(onboarding)/welcome-modal')} style={styles.btn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 24 },
  sparkle: { color: Colors.gold, fontSize: 20, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.dark, marginBottom: 10 },
  subtitle: { fontSize: 14, color: Colors.medium, lineHeight: 20, marginBottom: 24 },
  card: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  itemLabel: { fontSize: 12, color: Colors.subtle },
  itemValue: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  btn: { marginTop: 8 },
});
```

- [ ] **Step 5: Create `app/(onboarding)/welcome-modal.tsx`**
```typescript
import { View, Text, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';

export default function WelcomeModal() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.overlay}>
      <View style={styles.sheet}>
        <View style={styles.iconCircle}>
          <Ionicons name="gift-outline" size={32} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Welcome to your Personalized Skin Coach!</Text>
        <Text style={styles.subtitle}>As a special welcome, we're gifting you 500 Skin Miles to start your wellness journey!</Text>
        <Card style={styles.milesCard}>
          <View style={styles.trophyCircle}>
            <Ionicons name="trophy-outline" size={24} color={Colors.primary} />
          </View>
          <View>
            <Text style={styles.miles}><Text style={styles.milesNum}>500</Text> Skin Miles</Text>
            <Text style={styles.milesSub}>✦ Start your rewards journey</Text>
          </View>
        </Card>
        <Button label="Claim Your Gift 🎉" onPress={() => router.replace('/(tabs)')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 28, alignItems: 'center' },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '800', color: Colors.dark, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: Colors.medium, textAlign: 'center', marginBottom: 24 },
  milesCard: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 24 },
  trophyCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  miles: { fontSize: 16, color: Colors.medium },
  milesNum: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  milesSub: { fontSize: 13, color: Colors.subtle, marginTop: 2 },
});
```

- [ ] **Step 6: Commit**
```bash
git add app/(onboarding)/
git commit -m "feat: add onboarding steps 4-5, program ready, and welcome modal"
```

---

## Chunk 5: Tab Layout + Home Screen

### Task 9: Tab layout

**Files:**
- Create: `app/(tabs)/_layout.tsx`

- [ ] **Step 1: Create `app/(tabs)/_layout.tsx`**
```typescript
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, color }: { name: IconName; color: string }) {
  return <Ionicons name={name} size={22} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.subtle,
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: Colors.border, paddingBottom: 4 },
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <TabIcon name="home-outline" color={color} /> }} />
      <Tabs.Screen name="book" options={{ title: 'Book', tabBarIcon: ({ color }) => <TabIcon name="calendar-outline" color={color} /> }} />
      <Tabs.Screen name="rewards" options={{ title: 'Rewards', tabBarIcon: ({ color }) => <TabIcon name="sparkles-outline" color={color} /> }} />
      <Tabs.Screen name="shop" options={{ title: 'Shop', tabBarIcon: ({ color }) => <TabIcon name="bag-outline" color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <TabIcon name="person-outline" color={color} /> }} />
    </Tabs>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add app/(tabs)/_layout.tsx
git commit -m "feat: add tab bar layout with 5 tabs"
```

---

### Task 10: Home screen

**Files:**
- Create: `app/(tabs)/index.tsx`

- [ ] **Step 1: Create `app/(tabs)/index.tsx`**
```typescript
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

const quickActions = [
  { label: 'Book Massage', icon: 'calendar-outline', route: '/(tabs)/book' },
  { label: 'Daily Challenge', icon: 'sparkles-outline', route: '/(tabs)/rewards' },
  { label: 'Shop', icon: 'bag-outline', route: '/(tabs)/shop' },
  { label: 'Borrow Device', icon: 'phone-portrait-outline', route: null },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Welcome back, {mockUser.name}</Text>
            <Text style={styles.sub}>Let's take care of your skin today</Text>
          </View>
          <View style={styles.proBadge}><Text style={styles.proText}>👑 Pro</Text></View>
        </View>

        {/* Streak + Miles */}
        <Card style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakNum}>{mockUser.streak} days</Text>
            <Text style={styles.streakIcon}>🔥</Text>
          </View>
          <Text style={styles.streakSub}>Keep your streak going!</Text>
          <View style={styles.milesRight}>
            <Text style={styles.milesIcon}>🏆</Text>
            <Text style={styles.milesNum}>{mockUser.skinMiles.toLocaleString()}</Text>
            <Text style={styles.milesSub}>Skin Miles</Text>
          </View>
        </Card>

        {/* Daily Wellness Tip */}
        <Card style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <View style={styles.tipLeft}>
              <Ionicons name="book-outline" size={16} color={Colors.purple} />
              <Text style={styles.tipTitle}> Daily Wellness Tip</Text>
            </View>
            <View style={styles.newBadge}><Text style={styles.newText}>New</Text></View>
          </View>
          <Text style={styles.tipHeading}>Morning Hydration Ritual</Text>
          <Text style={styles.tipDesc}>Start your day with this simple yet powerful hydration ritual...</Text>
          <Text style={styles.tipCta}>Tap to read & earn 10 points →</Text>
        </Card>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionCard}
              onPress={() => action.route && router.push(action.route as any)}
              activeOpacity={0.8}
            >
              <Ionicons name={action.icon as any} size={28} color={Colors.primary} />
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  greeting: { fontSize: 22, fontWeight: '800', color: Colors.dark },
  sub: { fontSize: 13, color: Colors.subtle, marginTop: 2 },
  proBadge: { backgroundColor: Colors.primaryLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  proText: { color: Colors.primary, fontWeight: '700', fontSize: 12 },
  streakCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, borderWidth: 1, borderColor: Colors.primaryLight },
  streakLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  streakIcon: { fontSize: 18 },
  streakNum: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  streakSub: { fontSize: 11, color: Colors.subtle, position: 'absolute', bottom: -14, left: 0 },
  milesRight: { alignItems: 'flex-end' },
  milesIcon: { fontSize: 16 },
  milesNum: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  milesSub: { fontSize: 11, color: Colors.subtle },
  tipCard: { backgroundColor: '#EDE9F7', marginBottom: 24 },
  tipHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tipLeft: { flexDirection: 'row', alignItems: 'center' },
  tipTitle: { color: Colors.purple, fontWeight: '600', fontSize: 13 },
  newBadge: { backgroundColor: Colors.green, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  newText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  tipHeading: { fontSize: 17, fontWeight: '700', color: Colors.dark, marginBottom: 6 },
  tipDesc: { fontSize: 13, color: Colors.medium, marginBottom: 8 },
  tipCta: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { width: '47%', backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  actionLabel: { fontSize: 13, fontWeight: '600', color: Colors.dark, textAlign: 'center' },
});
```

- [ ] **Step 2: Commit**
```bash
git add app/(tabs)/index.tsx
git commit -m "feat: add home screen with streak, tip, and quick actions"
```

---

## Chunk 6: Book Flow

### Task 11: Book stack layout + Studio screen

**Files:**
- Create: `app/(tabs)/book/_layout.tsx`
- Create: `app/(tabs)/book/index.tsx`
- Create: `components/book/StudioCard.tsx`

- [ ] **Step 1: Create `app/(tabs)/book/_layout.tsx`**
```typescript
import { Stack } from 'expo-router';
export default function BookLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

- [ ] **Step 2: Create `components/book/StudioCard.tsx`**
```typescript
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type Studio = { id: string; name: string; address: string; phone: string; email: string; image: string };
type Props = { studio: Studio; onPress: () => void };

export function StudioCard({ studio, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: studio.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{studio.name}</Text>
        <View style={styles.row}><Ionicons name="location-outline" size={14} color={Colors.gold} /><Text style={styles.detail}> {studio.address}</Text></View>
        <View style={styles.row}><Ionicons name="call-outline" size={14} color={Colors.gold} /><Text style={styles.detail}> {studio.phone}</Text></View>
        <View style={styles.row}><Ionicons name="mail-outline" size={14} color={Colors.gold} /><Text style={styles.detail}> {studio.email}</Text></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  image: { width: '100%', height: 160 },
  info: { padding: 16 },
  name: { fontSize: 17, fontWeight: '700', color: Colors.dark, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  detail: { fontSize: 13, color: Colors.medium, flex: 1 },
});
```

- [ ] **Step 3: Create `app/(tabs)/book/index.tsx`**
```typescript
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
```

- [ ] **Step 4: Commit**
```bash
git add app/(tabs)/book/ components/book/
git commit -m "feat: add book layout, studio card, and studio selection screen"
```

---

### Task 12: Service, People, Date, and Confirm screens

**Files:**
- Create: `app/(tabs)/book/service.tsx`
- Create: `app/(tabs)/book/people.tsx`
- Create: `app/(tabs)/book/date.tsx`
- Create: `app/(tabs)/book/confirm.tsx`

- [ ] **Step 1: Create `app/(tabs)/book/service.tsx`**
```typescript
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
```

- [ ] **Step 2: Create `app/(tabs)/book/people.tsx`**
```typescript
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';

export default function BookPeople() {
  const router = useRouter();
  const [count, setCount] = useState(1);

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Book Treatment</Text>
      <StepperHeader currentStep={3} />
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Number of People</Text>
        {/* Circle picker */}
        <View style={styles.pickerRow}>
          <TouchableOpacity style={styles.arrow} onPress={() => setCount(c => Math.max(1, c - 1))}>
            <Ionicons name="chevron-back" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <View style={styles.circle}>
            <Ionicons name="people-outline" size={28} color="#fff" />
            <Text style={styles.circleNum}>{count}</Text>
            <Text style={styles.circleLabel}>Person{count > 1 ? 's' : ''}</Text>
          </View>
          <TouchableOpacity style={styles.arrow} onPress={() => setCount(c => Math.min(6, c + 1))}>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>Select the number of people for this booking</Text>
        {/* Grid */}
        <View style={styles.grid}>
          {[1,2,3,4,5,6].map(n => (
            <TouchableOpacity key={n} style={[styles.gridItem, count === n && styles.gridItemActive]} onPress={() => setCount(n)}>
              <Ionicons name="people-outline" size={20} color={count === n ? '#fff' : Colors.dark} />
              <Text style={[styles.gridLabel, count === n && styles.gridLabelActive]}>{n} {n === 1 ? 'Person' : 'People'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button label="Continue" onPress={() => router.push({ pathname: '/(tabs)/book/date', params: { people: count } })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark, paddingHorizontal: 20, paddingTop: 16 },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 20 },
  pickerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  arrow: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  circle: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginHorizontal: 24 },
  circleNum: { fontSize: 24, fontWeight: '800', color: '#fff' },
  circleLabel: { fontSize: 12, color: '#fff' },
  hint: { textAlign: 'center', color: Colors.subtle, fontSize: 13, marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
  gridItem: { width: '47%', backgroundColor: '#fff', borderRadius: 14, paddingVertical: 16, alignItems: 'center', gap: 6, borderWidth: 1.5, borderColor: Colors.border },
  gridItemActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  gridLabel: { fontSize: 14, fontWeight: '600', color: Colors.dark },
  gridLabelActive: { color: '#fff' },
});
```

- [ ] **Step 3: Create `app/(tabs)/book/date.tsx`**
```typescript
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIMES = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function BookDate() {
  const router = useRouter();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(year, month);
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Book Treatment</Text>
      <StepperHeader currentStep={4} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Calendar */}
        <View style={styles.calCard}>
          <View style={styles.calHeader}>
            <TouchableOpacity onPress={prevMonth}><Ionicons name="chevron-back" size={20} color={Colors.dark} /></TouchableOpacity>
            <Text style={styles.monthLabel}>{monthName}</Text>
            <TouchableOpacity onPress={nextMonth}><Ionicons name="chevron-forward" size={20} color={Colors.dark} /></TouchableOpacity>
          </View>
          <View style={styles.dayRow}>{DAYS.map(d => <Text key={d} style={styles.dayLabel}>{d}</Text>)}</View>
          <View style={styles.grid}>
            {Array.from({ length: firstDayOfMonth }).map((_, i) => <View key={`e${i}`} style={styles.dayCell} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <TouchableOpacity key={day} style={[styles.dayCell, isToday && styles.todayCell, isSelected && styles.selectedCell]}
                  onPress={() => setSelectedDay(day)}>
                  <Text style={[styles.dayNum, isSelected && styles.selectedNum, isToday && !isSelected && styles.todayNum]}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Time slots */}
        {selectedDay && (
          <>
            <Text style={styles.sectionTitle}>Select Time</Text>
            <View style={styles.timesGrid}>
              {TIMES.map(t => (
                <TouchableOpacity key={t} style={[styles.timeSlot, selectedTime === t && styles.timeSlotActive]} onPress={() => setSelectedTime(t)}>
                  <Ionicons name="time-outline" size={14} color={selectedTime === t ? '#fff' : Colors.dark} />
                  <Text style={[styles.timeLabel, selectedTime === t && styles.timeLabelActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {selectedDay && selectedTime && (
          <Button label="Continue" onPress={() => router.push({ pathname: '/(tabs)/book/confirm', params: { day: selectedDay, month: month + 1, year, time: selectedTime } })} style={styles.btn} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark, paddingHorizontal: 20, paddingTop: 16 },
  scroll: { padding: 20 },
  calCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 24 },
  calHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  monthLabel: { fontSize: 17, fontWeight: '700', color: Colors.dark },
  dayRow: { flexDirection: 'row', marginBottom: 8 },
  dayLabel: { flex: 1, textAlign: 'center', fontSize: 12, color: Colors.subtle, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  dayNum: { fontSize: 14, color: Colors.dark },
  todayCell: { borderWidth: 1.5, borderColor: '#A8D0E8', borderRadius: 8 },
  todayNum: { color: '#4A90C4' },
  selectedCell: { backgroundColor: Colors.primary, borderRadius: 8 },
  selectedNum: { color: '#fff', fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  timesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  timeSlot: { width: '30%', backgroundColor: '#fff', borderRadius: 12, padding: 10, alignItems: 'center', flexDirection: 'row', gap: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  timeSlotActive: { backgroundColor: Colors.primary },
  timeLabel: { fontSize: 13, fontWeight: '600', color: Colors.dark },
  timeLabelActive: { color: '#fff' },
  btn: { marginBottom: 24 },
});
```

- [ ] **Step 4: Create `app/(tabs)/book/confirm.tsx`**
```typescript
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StepperHeader } from '@/components/ui/StepperHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { mockStudios, mockServices } from '@/constants/mockData';

export default function BookConfirm() {
  const router = useRouter();
  const { studioId = '1', serviceId = '1', people = '1', day, month, year, time } = useLocalSearchParams<any>();
  const studio = mockStudios.find(s => s.id === studioId) ?? mockStudios[0];
  const service = mockServices.find(s => s.id === serviceId) ?? mockServices[0];
  const total = service.price * Number(people);

  const rows = [
    { icon: 'location-outline', label: 'Studio', value: studio.name, sub: studio.address },
    { icon: 'checkmark-circle-outline', label: 'Service', value: service.name, sub: service.duration },
    { icon: 'people-outline', label: 'Number of People', value: `${people} Person${Number(people) > 1 ? 's' : ''}`, sub: '' },
    { icon: 'calendar-outline', label: 'Date & Time', value: `${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date(`${year}-${month}-${day}`).getDay()]}, ${['January','February','March','April','May','June','July','August','September','October','November','December'][Number(month)-1]} ${day}`, sub: time },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Book Treatment</Text>
      <StepperHeader currentStep={5} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          {rows.map(row => (
            <View key={row.label} style={styles.row}>
              <Ionicons name={row.icon as any} size={20} color={Colors.subtle} style={styles.rowIcon} />
              <View>
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={styles.rowValue}>{row.value}</Text>
                {row.sub ? <Text style={styles.rowSub}>{row.sub}</Text> : null}
              </View>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.priceRow}><Text style={styles.priceLabel}>Service Price</Text><Text style={styles.priceVal}>€{service.price}</Text></View>
          <View style={styles.priceRow}><Text style={styles.priceLabel}>Number of People</Text><Text style={styles.priceVal}>× {people}</Text></View>
          <View style={styles.priceRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalVal}>€{total}</Text></View>
        </Card>
        <Button label="Confirm Booking" onPress={() => router.replace('/(tabs)')} style={styles.btn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark, paddingHorizontal: 20, paddingTop: 16 },
  scroll: { padding: 20 },
  summaryTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  rowIcon: { marginRight: 12, marginTop: 2 },
  rowLabel: { fontSize: 12, color: Colors.subtle, marginBottom: 2 },
  rowValue: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  rowSub: { fontSize: 13, color: Colors.medium, marginTop: 2 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 16 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { fontSize: 14, color: Colors.subtle },
  priceVal: { fontSize: 14, color: Colors.dark },
  totalLabel: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  totalVal: { fontSize: 16, fontWeight: '700', color: Colors.gold },
  btn: { marginTop: 20, marginBottom: 32 },
});
```

- [ ] **Step 5: Commit**
```bash
git add app/(tabs)/book/
git commit -m "feat: add complete book flow - service, people, date, confirm screens"
```

---

## Chunk 7: Rewards, Shop, Profile

### Task 13: Rewards screen

**Files:**
- Create: `app/(tabs)/rewards.tsx`

- [ ] **Step 1: Create `app/(tabs)/rewards.tsx`**
```typescript
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { mockUser, mockRoutines, mockRedeemItems } from '@/constants/mockData';

export default function RewardsScreen() {
  const completedCount = mockRoutines.filter(r => r.completed).length;
  const total = mockRoutines.length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Rewards & Challenges</Text>
        <Text style={styles.subtitle}>Complete challenges to earn Skin Miles</Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { icon: '🔥', value: mockUser.streak, label: 'Day Streak' },
            { icon: '🏆', value: mockUser.skinMiles.toLocaleString(), label: 'Skin Miles' },
            { icon: '🎁', value: mockUser.rewardsCount, label: 'Rewards' },
          ].map(s => (
            <Card key={s.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </Card>
          ))}
        </View>

        {/* Today's Progress */}
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressCount}>{completedCount}/{total}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(completedCount / total) * 100}%` }]} />
          </View>
          <Text style={styles.progressHint}>Complete all challenges to earn 200 bonus points! 🎉</Text>
        </Card>

        {/* Self-Massage Routines */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Self-Massage Routines</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        {mockRoutines.map(routine => (
          <Card key={routine.id} style={styles.routineCard}>
            <View style={[styles.routineIcon, routine.completed && styles.routineIconDone]}>
              <Ionicons name={routine.completed ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={routine.completed ? Colors.green : Colors.subtle} />
            </View>
            <View style={styles.routineInfo}>
              <Text style={styles.routineName}>{routine.name}</Text>
              <Text style={styles.routineDesc}>{routine.description}</Text>
              <View style={styles.pointsRow}>
                <Ionicons name="trophy-outline" size={12} color={Colors.gold} />
                <Text style={styles.points}> {routine.points} points</Text>
              </View>
              {routine.completed && (
                <View style={styles.completedBadge}><Text style={styles.completedText}>✓ Completed</Text></View>
              )}
            </View>
          </Card>
        ))}

        {/* Redeem */}
        <Text style={styles.sectionTitle}>Redeem Your Points</Text>
        <View style={styles.redeemRow}>
          {mockRedeemItems.map(item => (
            <Card key={item.id} style={styles.redeemCard}>
              <Text style={styles.redeemIcon}>{item.icon}</Text>
              <Text style={styles.redeemName}>{item.name}</Text>
              <Text style={styles.redeemPoints}>{item.points} pts</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.dark, marginBottom: 4 },
  subtitle: { fontSize: 13, color: Colors.subtle, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '800', color: Colors.dark },
  statLabel: { fontSize: 11, color: Colors.subtle, textAlign: 'center' },
  progressCard: { backgroundColor: '#EDE9F7', marginBottom: 24 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressTitle: { fontSize: 15, fontWeight: '700', color: Colors.dark },
  progressCount: { fontSize: 13, color: Colors.subtle },
  progressTrack: { height: 8, backgroundColor: '#D5CCF0', borderRadius: 4, marginBottom: 10 },
  progressFill: { height: 8, backgroundColor: Colors.primary, borderRadius: 4 },
  progressHint: { fontSize: 13, color: Colors.medium },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  seeAll: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  routineCard: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  routineIcon: { marginRight: 12, marginTop: 2 },
  routineIconDone: {},
  routineInfo: { flex: 1 },
  routineName: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  routineDesc: { fontSize: 13, color: Colors.medium, marginTop: 2, marginBottom: 6 },
  pointsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  points: { fontSize: 12, color: Colors.gold },
  completedBadge: { backgroundColor: '#E8F5E9', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12, alignItems: 'center' },
  completedText: { color: Colors.green, fontWeight: '600', fontSize: 13 },
  redeemRow: { flexDirection: 'row', gap: 12 },
  redeemCard: { flex: 1, alignItems: 'center', paddingVertical: 20 },
  redeemIcon: { fontSize: 28, marginBottom: 8 },
  redeemName: { fontSize: 13, fontWeight: '600', color: Colors.dark, textAlign: 'center' },
  redeemPoints: { fontSize: 12, color: Colors.subtle, marginTop: 4 },
});
```

- [ ] **Step 2: Commit**
```bash
git add app/(tabs)/rewards.tsx
git commit -m "feat: add rewards and challenges screen"
```

---

### Task 14: Shop screen

**Files:**
- Create: `app/(tabs)/shop.tsx`

- [ ] **Step 1: Create `app/(tabs)/shop.tsx`**
```typescript
import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { mockProducts, mockUser } from '@/constants/mockData';

const CATEGORIES = ['All', 'Serums', 'Creams', 'Oils', 'Tools'];

export default function ShopScreen() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = mockProducts.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const bestSellers = filtered.filter(p => p.isBestSeller);
  const allProducts = filtered;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Shop</Text>
          <Ionicons name="bag-outline" size={24} color={Colors.dark} />
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={16} color={Colors.subtle} style={{ marginRight: 8 }} />
          <TextInput style={styles.searchInput} placeholder="Search products..." placeholderTextColor={Colors.subtle}
            value={search} onChangeText={setSearch} />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cats}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat} style={[styles.catPill, category === cat && styles.catActive]} onPress={() => setCategory(cat)}>
              <Text style={[styles.catLabel, category === cat && styles.catLabelActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Skin Miles banner */}
        <LinearGradient colors={['#7C6FAE', '#9B8FD0']} style={styles.milesBanner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <View style={styles.milesLeft}>
            <Ionicons name="trophy-outline" size={20} color="#fff" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.milesLabel}>Your Skin Miles</Text>
              <Text style={styles.milesNum}>{mockUser.skinMiles.toLocaleString()}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.useBtn}><Text style={styles.useBtnText}>Use Points</Text></TouchableOpacity>
        </LinearGradient>

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Best Sellers</Text>
              <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
            </View>
            <View style={styles.grid}>
              {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
            </View>
          </>
        )}

        {/* All Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Products</Text>
        </View>
        <View style={styles.grid}>
          {allProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProductCard({ product }: { product: typeof mockProducts[0] }) {
  return (
    <View style={pcStyles.card}>
      <View style={pcStyles.imageBox}>
        <Image source={{ uri: product.image }} style={pcStyles.image} />
        {product.isBestSeller && <View style={pcStyles.badge}><Text style={pcStyles.badgeText}>Best Seller</Text></View>}
      </View>
      <Text style={pcStyles.name}>{product.name}</Text>
      <View style={pcStyles.ratingRow}>
        <Ionicons name="star" size={12} color="#F5C518" />
        <Text style={pcStyles.rating}> {product.rating}</Text>
      </View>
      <Text style={pcStyles.price}>€{product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: Colors.dark },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16, borderWidth: 1, borderColor: Colors.border },
  searchInput: { flex: 1, fontSize: 14, color: Colors.dark },
  cats: { marginBottom: 16 },
  catPill: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, marginRight: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.border },
  catActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catLabel: { fontSize: 13, color: Colors.medium, fontWeight: '600' },
  catLabelActive: { color: '#fff' },
  milesBanner: { borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  milesLeft: { flexDirection: 'row', alignItems: 'center' },
  milesLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  milesNum: { color: '#fff', fontSize: 20, fontWeight: '800' },
  useBtn: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  useBtnText: { color: Colors.purple, fontWeight: '700', fontSize: 13 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  seeAll: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 24 },
});

const pcStyles = StyleSheet.create({
  card: { width: '47%', backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  imageBox: { position: 'relative' },
  image: { width: '100%', height: 140 },
  badge: { position: 'absolute', top: 8, right: 8, backgroundColor: Colors.orange, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  name: { fontSize: 13, fontWeight: '700', color: Colors.dark, padding: 10, paddingBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
  rating: { fontSize: 12, color: Colors.medium },
  price: { fontSize: 15, fontWeight: '700', color: Colors.gold, padding: 10, paddingTop: 4 },
});
```

- [ ] **Step 2: Commit**
```bash
git add app/(tabs)/shop.tsx
git commit -m "feat: add shop screen with categories, search, and product grid"
```

---

### Task 15: Profile screen

**Files:**
- Create: `app/(tabs)/profile.tsx`

- [ ] **Step 1: Create `app/(tabs)/profile.tsx`**
```typescript
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}><Text style={styles.initials}>{mockUser.initials}</Text></View>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{mockUser.fullName}</Text>
            <View style={styles.proBadge}><Ionicons name="trophy-outline" size={12} color={Colors.primary} /><Text style={styles.proText}> Pro</Text></View>
          </View>
          <Text style={styles.detail}>{mockUser.email}</Text>
          <Text style={styles.detail}>{mockUser.phone}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil-outline" size={14} color={Colors.primary} />
            <Text style={styles.editText}> Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Premium Membership */}
        <View style={styles.memberCard}>
          <View style={styles.memberHeader}>
            <Ionicons name="trophy-outline" size={18} color="#fff" />
            <Text style={styles.memberTitle}> Premium Membership</Text>
          </View>
          <Text style={styles.memberSub}>Active until {mockUser.membershipExpiry}</Text>
          <View style={styles.memberBtns}>
            <TouchableOpacity style={styles.manageBtn}><Text style={styles.manageBtnText}>Manage</Text></TouchableOpacity>
            <TouchableOpacity style={styles.upgradeBtn}><Text style={styles.upgradeBtnText}>Upgrade</Text></TouchableOpacity>
          </View>
        </View>

        {/* Skin Analysis */}
        <Text style={styles.sectionTitle}>Skin Analysis</Text>
        <View style={styles.skinCard}>
          <View style={styles.skinHeader}>
            <Ionicons name="sparkles-outline" size={18} color={Colors.purple} />
            <Text style={styles.skinTitle}> Your Skin Profile</Text>
          </View>
          <Text style={styles.skinDate}>Diagnostic performed on {mockUser.skinDiagnosticDate}</Text>
          <View style={styles.skinRow}>
            <Text style={styles.skinLabel}>Skin Type</Text>
            <Text style={styles.skinValue}>{mockUser.skinType}</Text>
          </View>
          <View style={styles.skinRow}>
            <Text style={styles.skinLabel}>Skin Concerns</Text>
            <View style={styles.tagsRow}>
              {mockUser.skinConcerns.map(c => (
                <View key={c} style={styles.tag}><Text style={styles.tagText}>{c}</Text></View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  initials: { fontSize: 28, fontWeight: '700', color: Colors.primary },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  name: { fontSize: 22, fontWeight: '800', color: Colors.dark },
  proBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  proText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },
  detail: { fontSize: 14, color: Colors.medium, marginBottom: 4 },
  editBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.primary, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginTop: 10 },
  editText: { color: Colors.primary, fontWeight: '600', fontSize: 14 },
  memberCard: { backgroundColor: Colors.primaryLight, borderRadius: 20, padding: 20, marginBottom: 24 },
  memberHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  memberTitle: { fontSize: 17, fontWeight: '700', color: Colors.primary },
  memberSub: { fontSize: 13, color: Colors.medium, marginBottom: 16 },
  memberBtns: { flexDirection: 'row', gap: 12 },
  manageBtn: { flex: 1, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, paddingVertical: 10, alignItems: 'center' },
  manageBtnText: { color: Colors.dark, fontWeight: '600' },
  upgradeBtn: { flex: 1, backgroundColor: '#fff', borderRadius: 20, paddingVertical: 10, alignItems: 'center' },
  upgradeBtnText: { color: Colors.primary, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  skinCard: { backgroundColor: '#EDE9F7', borderRadius: 16, padding: 16 },
  skinHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  skinTitle: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  skinDate: { fontSize: 12, color: Colors.subtle, marginBottom: 16 },
  skinRow: { marginBottom: 12 },
  skinLabel: { fontSize: 12, color: Colors.subtle, marginBottom: 4 },
  skinValue: { fontSize: 15, fontWeight: '600', color: Colors.dark },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: Colors.purple, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  tagText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
```

- [ ] **Step 2: Final commit**
```bash
git add app/(tabs)/profile.tsx
git commit -m "feat: add profile screen with membership and skin analysis"
```

---

## Final Verification

- [ ] Run `npx expo start` and verify app launches
- [ ] Navigate through full onboarding flow (auth → steps 1–5 → program ready → welcome modal → home)
- [ ] Navigate all 5 tabs
- [ ] Walk through complete book flow (studio → service → people → date → confirm)
- [ ] Verify all screens match the design screenshots
