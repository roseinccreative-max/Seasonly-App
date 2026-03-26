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
