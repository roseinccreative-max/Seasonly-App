import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
  Linking, Image, Share, Modal, TextInput, Switch, Alert,
  Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'expo-router';

interface NotifPrefs {
  booking: boolean;
  tips: boolean;
  rewards: boolean;
  promos: boolean;
}
const NOTIF_DEFAULTS: NotifPrefs = { booking: true, tips: true, rewards: true, promos: false };

export default function ProfileScreen() {
  const { lang, setLang, t } = useLanguage();
  const router = useRouter();
  const totalItems = useCartStore(s => s.totalItems);

  // Profile data
  const [profileName, setProfileName] = useState(mockUser.fullName);
  const [profileEmail, setProfileEmail] = useState(mockUser.email);
  const [profilePhone, setProfilePhone] = useState(mockUser.phone);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  // Edit modal state
  const [editVisible, setEditVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editPhoto, setEditPhoto] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Notifications
  const [notifExpanded, setNotifExpanded] = useState(false);
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>(NOTIF_DEFAULTS);

  useFocusEffect(useCallback(() => {
    AsyncStorage.multiGet(['profile_name', 'profile_email', 'profile_phone', 'profile_photo', 'notif_prefs']).then(pairs => {
      const obj = Object.fromEntries(pairs.map(([k, v]) => [k, v ?? '']));
      if (obj.profile_name) setProfileName(obj.profile_name);
      if (obj.profile_email) setProfileEmail(obj.profile_email);
      if (obj.profile_phone) setProfilePhone(obj.profile_phone);
      if (obj.profile_photo) setProfilePhoto(obj.profile_photo);
      if (obj.notif_prefs) setNotifPrefs(JSON.parse(obj.notif_prefs));
    });
  }, []));

  const openEdit = () => {
    setEditName(profileName);
    setEditEmail(profileEmail);
    setEditPhone(profilePhone);
    setEditPhoto(profilePhoto);
    setEditVisible(true);
  };

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow photo access.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets[0]) {
      setEditPhoto(result.assets[0].uri);
    }
  };

  const saveEdit = async () => {
    setSaving(true);
    await AsyncStorage.multiSet([
      ['profile_name', editName],
      ['profile_email', editEmail],
      ['profile_phone', editPhone],
      ['profile_photo', editPhoto ?? ''],
    ]);
    setProfileName(editName);
    setProfileEmail(editEmail);
    setProfilePhone(editPhone);
    setProfilePhoto(editPhoto);
    setSaving(false);
    setEditVisible(false);
  };

  const toggleNotif = (key: keyof NotifPrefs) => {
    setNotifPrefs(prev => {
      const next = { ...prev, [key]: !prev[key] };
      AsyncStorage.setItem('notif_prefs', JSON.stringify(next));
      return next;
    });
  };

  const initials = profileName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  const referralLink = `https://seasonly.fr/refer/${profileName.split(' ')[0].toUpperCase()}${new Date().getFullYear()}`;

  const notifRows: { key: keyof NotifPrefs; icon: string; label: string; desc: string }[] = [
    { key: 'booking', icon: 'calendar-outline', label: t('notif_booking'), desc: t('notif_booking_desc') },
    { key: 'tips', icon: 'bulb-outline', label: t('notif_tips'), desc: t('notif_tips_desc') },
    { key: 'rewards', icon: 'trophy-outline', label: t('notif_rewards'), desc: t('notif_rewards_desc') },
    { key: 'promos', icon: 'pricetag-outline', label: t('notif_promos'), desc: t('notif_promos_desc') },
  ];

  const cartCount = totalItems();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar with cart */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Profile</Text>
        <TouchableOpacity style={styles.cartBtn} onPress={() => router.push('/(tabs)/shop/cart')}>
          <Ionicons name="bag-outline" size={26} color="#999" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={openEdit} style={styles.avatarWrapper}>
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto }} style={styles.avatarImg} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.initials}>{initials}</Text>
              </View>
            )}
            <View style={styles.editOverlay}>
              <Ionicons name="pencil" size={13} color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profileName}</Text>
            <View style={styles.proBadge}>
              <Ionicons name="trophy-outline" size={14} color={Colors.gold} />
              <Text style={styles.proText}> Pro</Text>
            </View>
          </View>
          <Text style={styles.detail}>{profileEmail}</Text>
          <Text style={styles.detail}>{profilePhone}</Text>
          <TouchableOpacity style={styles.editBtn} onPress={openEdit}>
            <Ionicons name="pencil-outline" size={15} color={Colors.primary} />
            <Text style={styles.editText}>{t('profile_edit')}</Text>
          </TouchableOpacity>
        </View>

        {/* Premium Membership */}
        <View style={styles.memberCard}>
          <View style={styles.memberHeader}>
            <Ionicons name="trophy-outline" size={20} color="#A0782A" />
            <Text style={styles.memberTitle}> {t('profile_membership')}</Text>
          </View>
          <Text style={styles.memberSub}>{t('profile_active_until')} {mockUser.membershipExpiry}</Text>
          <View style={styles.memberBtns}>
            <TouchableOpacity style={styles.manageBtn} onPress={() => Linking.openURL('https://seasonly.fr/account')}>
              <Text style={styles.manageBtnText}>{t('profile_manage')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.upgradeBtn} onPress={() => Linking.openURL('https://seasonly.fr/collections/abonnements')}>
              <Text style={styles.upgradeBtnText}>{t('profile_upgrade')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Skin Analysis */}
        <Text style={styles.sectionTitle}>{t('profile_skin_analysis')}</Text>
        <View style={styles.skinCard}>
          <View style={styles.skinHeader}>
            <Ionicons name="sparkles-outline" size={18} color={Colors.purple} />
            <Text style={styles.skinTitle}> {t('profile_skin_profile')}</Text>
          </View>
          <Text style={styles.skinDate}>Diagnostic performed on {mockUser.skinDiagnosticDate}</Text>
          <View style={styles.skinRow}>
            <Text style={styles.skinLabel}>{t('profile_skin_type')}</Text>
            <Text style={styles.skinValue}>{mockUser.skinType}</Text>
          </View>
          <View style={styles.skinRow}>
            <Text style={styles.skinLabel}>{t('profile_skin_concerns')}</Text>
            <View style={styles.tagsRow}>
              {mockUser.skinConcerns.map(c => (
                <View key={c} style={styles.tag}>
                  <Text style={styles.tagText}>{c}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Notifications — inline expandable */}
        <TouchableOpacity
          style={styles.settingsRow}
          onPress={() => setNotifExpanded(e => !e)}
        >
          <Ionicons name="notifications-outline" size={20} color={Colors.dark} />
          <Text style={styles.settingsRowText}>{t('profile_notifications')}</Text>
          <Ionicons name={notifExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.subtle} />
        </TouchableOpacity>
        {notifExpanded && (
          <View style={styles.notifPanel}>
            {notifRows.map(row => (
              <View key={row.key} style={styles.notifRow}>
                <View style={styles.notifIconCircle}>
                  <Ionicons name={row.icon as any} size={18} color={Colors.primary} />
                </View>
                <View style={styles.notifText}>
                  <Text style={styles.notifLabel}>{row.label}</Text>
                  <Text style={styles.notifDesc}>{row.desc}</Text>
                </View>
                <Switch
                  value={notifPrefs[row.key]}
                  onValueChange={() => toggleNotif(row.key)}
                  trackColor={{ false: '#E0D9D3', true: '#E8C9BB' }}
                  thumbColor={notifPrefs[row.key] ? '#C4826A' : '#fff'}
                />
              </View>
            ))}
          </View>
        )}

        {/* Referral */}
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
              onPress={() => Share.share({ message: `Join me on Seasonly! ${referralLink}` })}
            >
              <Ionicons name="share-outline" size={16} color="#fff" />
              <Text style={styles.referralShareBtnText}>{t('profile_share_link')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.referralCopyBtn}
              onPress={() => { /* Clipboard.setString(referralLink) — deprecated, skip for now */ }}
            >
              <Ionicons name="copy-outline" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Language Toggle */}
        <View style={styles.langSection}>
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
      </ScrollView>

      {/* Inline Edit Profile Modal */}
      <Modal
        visible={editVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setEditVisible(false)}
      >
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setEditVisible(false)}>
              <Text style={styles.modalCancel}>{t('profile_cancel')}</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={saveEdit} disabled={saving}>
              {saving ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Text style={styles.modalSave}>{t('profile_save')}</Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalScroll}>
            {/* Photo picker */}
            <View style={styles.modalAvatarSection}>
              <TouchableOpacity onPress={pickPhoto} style={styles.avatarWrapper}>
                {editPhoto ? (
                  <Image source={{ uri: editPhoto }} style={styles.avatarImg} />
                ) : (
                  <View style={styles.avatar}>
                    <Text style={styles.initials}>
                      {editName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </Text>
                  </View>
                )}
                <View style={styles.editOverlay}>
                  <Ionicons name="camera" size={13} color="#fff" />
                </View>
              </TouchableOpacity>
              <Text style={styles.changePhotoText}>{t('profile_change_photo')}</Text>
            </View>

            {/* Fields */}
            {[
              { label: t('profile_name'), value: editName, setter: setEditName, keyboard: 'default' as const },
              { label: t('profile_email'), value: editEmail, setter: setEditEmail, keyboard: 'email-address' as const },
              { label: t('profile_phone'), value: editPhone, setter: setEditPhone, keyboard: 'phone-pad' as const },
            ].map(({ label, value, setter, keyboard }) => (
              <View key={label} style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={setter}
                  keyboardType={keyboard}
                  autoCapitalize="none"
                />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  topBarTitle: { fontSize: 24, fontWeight: '800', color: Colors.dark },
  cartBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#C4826A',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  scroll: { padding: 20, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: 28 },
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
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#C4826A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  name: { fontSize: 22, fontWeight: '800', color: Colors.dark },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  proText: { color: Colors.gold, fontSize: 12, fontWeight: '700' },
  detail: { fontSize: 14, color: Colors.medium, marginTop: 6 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 9,
    marginTop: 14,
  },
  editText: { color: Colors.primary, fontWeight: '600', fontSize: 14 },
  memberCard: { backgroundColor: '#F5E6C8', borderRadius: 20, padding: 20, marginBottom: 24 },
  memberHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  memberTitle: { fontSize: 17, fontWeight: '700', color: '#7A5A10' },
  memberSub: { fontSize: 13, color: '#9A7010', marginBottom: 16 },
  memberBtns: { flexDirection: 'row', gap: 12 },
  manageBtn: { flex: 1, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 22, paddingVertical: 11, alignItems: 'center' },
  manageBtnText: { color: Colors.dark, fontWeight: '600' },
  upgradeBtn: { flex: 1, backgroundColor: '#fff', borderRadius: 22, paddingVertical: 11, alignItems: 'center' },
  upgradeBtnText: { color: Colors.primary, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  skinCard: { backgroundColor: '#EDE9F7', borderRadius: 16, padding: 16, marginBottom: 20 },
  skinHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  skinTitle: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  skinDate: { fontSize: 12, color: Colors.subtle, marginBottom: 16 },
  skinRow: { marginBottom: 12 },
  skinLabel: { fontSize: 12, color: Colors.subtle, marginBottom: 4 },
  skinValue: { fontSize: 15, fontWeight: '600', color: Colors.dark },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  tag: { backgroundColor: Colors.purple, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  tagText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  settingsRowText: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.dark },
  notifPanel: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  notifIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifText: { flex: 1 },
  notifLabel: { fontSize: 14, fontWeight: '700', color: Colors.dark },
  notifDesc: { fontSize: 12, color: Colors.subtle, marginTop: 1 },
  referralCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  referralHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  referralTitle: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  referralDesc: { fontSize: 13, color: Colors.medium, marginBottom: 14 },
  referralLinkBox: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  referralLinkText: { fontSize: 13, color: Colors.subtle },
  referralBtns: { flexDirection: 'row', gap: 10 },
  referralShareBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  referralShareBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  referralCopyBtn: {
    width: 46,
    height: 46,
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 8 },
  langLabel: { fontSize: 15, fontWeight: '600', color: Colors.dark },
  langToggle: { flexDirection: 'row', backgroundColor: '#F0EBE6', borderRadius: 20, padding: 3 },
  langBtn: { paddingHorizontal: 18, paddingVertical: 7, borderRadius: 17 },
  langBtnActive: { backgroundColor: Colors.primary },
  langBtnText: { fontWeight: '700', fontSize: 13, color: Colors.medium },
  langBtnTextActive: { color: '#fff' },
  // Modal styles
  modalSafe: { flex: 1, backgroundColor: Colors.background },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: '#fff',
  },
  modalTitle: { fontSize: 17, fontWeight: '700', color: Colors.dark },
  modalCancel: { fontSize: 16, color: Colors.medium },
  modalSave: { fontSize: 16, fontWeight: '700', color: '#C4826A' },
  modalScroll: { padding: 20, paddingBottom: 40 },
  modalAvatarSection: { alignItems: 'center', marginBottom: 28 },
  changePhotoText: { marginTop: 10, fontSize: 13, color: '#C4826A', fontWeight: '600' },
  fieldGroup: { marginBottom: 20 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: Colors.subtle, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
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
});
