import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { mockUser } from '@/constants/mockData';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.initials}>{mockUser.initials}</Text>
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{mockUser.fullName}</Text>
            <View style={styles.proBadge}>
              <Ionicons name="trophy-outline" size={14} color={Colors.gold} />
              <Text style={styles.proText}> Pro</Text>
            </View>
          </View>
          <Text style={styles.detail}>{mockUser.email}</Text>
          <Text style={styles.detail}>{mockUser.phone}</Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => Alert.alert('Edit Profile', 'Profile editing coming soon!')}
          >
            <Ionicons name="pencil-outline" size={15} color={Colors.primary} />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Premium Membership */}
        <View style={styles.memberCard}>
          <View style={styles.memberHeader}>
            <Ionicons name="trophy-outline" size={20} color="#A0782A" />
            <Text style={styles.memberTitle}> Premium Membership</Text>
          </View>
          <Text style={styles.memberSub}>Active until {mockUser.membershipExpiry}</Text>
          <View style={styles.memberBtns}>
            <TouchableOpacity
              style={styles.manageBtn}
              onPress={() => Linking.openURL('https://seasonly.fr/account')}
            >
              <Text style={styles.manageBtnText}>Manage</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => Linking.openURL('https://seasonly.fr/collections/abonnements')}
            >
              <Text style={styles.upgradeBtnText}>Upgrade</Text>
            </TouchableOpacity>
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
                <View key={c} style={styles.tag}>
                  <Text style={styles.tagText}>{c}</Text>
                </View>
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
  avatarSection: { alignItems: 'center', marginBottom: 28 },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { fontSize: 30, fontWeight: '700', color: Colors.primary },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
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
  memberCard: {
    backgroundColor: '#F5E6C8',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  memberHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  memberTitle: { fontSize: 17, fontWeight: '700', color: '#7A5A10' },
  memberSub: { fontSize: 13, color: '#9A7010', marginBottom: 16 },
  memberBtns: { flexDirection: 'row', gap: 12 },
  manageBtn: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 22,
    paddingVertical: 11,
    alignItems: 'center',
  },
  manageBtnText: { color: Colors.dark, fontWeight: '600', textAlign: 'center' },
  upgradeBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 11,
    alignItems: 'center',
  },
  upgradeBtnText: { color: Colors.primary, fontWeight: '700', textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark, marginBottom: 12 },
  skinCard: { backgroundColor: '#EDE9F7', borderRadius: 16, padding: 16 },
  skinHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  skinTitle: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  skinDate: { fontSize: 12, color: Colors.subtle, marginBottom: 16 },
  skinRow: { marginBottom: 12 },
  skinLabel: { fontSize: 12, color: Colors.subtle, marginBottom: 4 },
  skinValue: { fontSize: 15, fontWeight: '600', color: Colors.dark },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  tag: {
    backgroundColor: Colors.purple,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
