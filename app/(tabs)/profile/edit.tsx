import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, Platform } from 'react-native';
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
      const obj = Object.fromEntries(pairs.map(([k, v]) => [k, v ?? '']));
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

  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.dark },
  scroll: { padding: 20, paddingBottom: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatarWrapper: { position: 'relative' },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: { width: 88, height: 88, borderRadius: 44 },
  initials: { fontSize: 30, fontWeight: '700', color: Colors.primary },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  changePhotoText: { marginTop: 10, fontSize: 13, color: Colors.primary, fontWeight: '600' },
  fieldGroup: { marginBottom: 20 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.subtle,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.dark,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  bottomBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 8 : 12,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
