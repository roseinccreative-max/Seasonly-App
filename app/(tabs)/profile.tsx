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
