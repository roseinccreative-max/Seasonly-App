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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo area */}
          <View style={styles.logoArea}>
            <Text style={styles.logoText}>seasonly</Text>
            <Text style={styles.logoSub}>PARIS</Text>
            <Text style={styles.tagline}>Take your Skin to the Gym</Text>
          </View>

          {/* White card */}
          <View style={styles.card}>
            {/* Tab toggle */}
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tabBtn, tab === 'login' && styles.tabActive]}
                onPress={() => setTab('login')}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabLabel, tab === 'login' && styles.tabLabelActive]}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabBtn, tab === 'signup' && styles.tabActive]}
                onPress={() => setTab('signup')}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabLabel, tab === 'signup' && styles.tabLabelActive]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.heading}>
              {tab === 'login' ? 'Welcome Back' : 'Create Account'}
            </Text>

            {/* Email input */}
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={18} color={Colors.subtle} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.subtle}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password input */}
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={18} color={Colors.subtle} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Password"
                placeholderTextColor={Colors.subtle}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={Colors.subtle}
                />
              </TouchableOpacity>
            </View>

            {tab === 'login' && (
              <TouchableOpacity style={styles.forgotRow}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            <Button
              label={tab === 'login' ? 'Login' : 'Sign Up'}
              onPress={handleSubmit}
              style={styles.btn}
            />

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.divider} />
            </View>

            {/* Social buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialLabel}>G  Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
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
  scroll: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 32 },
  logoArea: { alignItems: 'center', marginVertical: 40 },
  logoText: {
    fontSize: 38,
    fontWeight: '200',
    letterSpacing: 3,
    color: Colors.dark,
  },
  logoSub: {
    fontSize: 11,
    letterSpacing: 8,
    color: Colors.dark,
    marginTop: -2,
  },
  tagline: {
    color: Colors.gold,
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 30,
    padding: 4,
    marginBottom: 24,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 26,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: Colors.primary },
  tabLabel: { color: Colors.subtle, fontWeight: '600', fontSize: 15 },
  tabLabelActive: { color: '#fff', fontWeight: '600', fontSize: 15 },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: Colors.dark },
  forgotRow: { alignItems: 'flex-end', marginBottom: 20 },
  forgotText: { color: Colors.gold, fontSize: 13 },
  btn: { marginBottom: 20 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { marginHorizontal: 10, color: Colors.subtle, fontSize: 13 },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  socialLabel: { color: Colors.dark, fontWeight: '600', fontSize: 14 },
});
