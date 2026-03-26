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
