import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCartStore } from '@/store/cartStore';
import { Colors } from '@/constants/colors';

export function HeaderIcons({ showProfile = true }: { showProfile?: boolean }) {
  const router = useRouter();
  const totalItems = useCartStore(s => s.totalItems);
  const count = totalItems();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={() => router.push('/(tabs)/shop/cart')}
      >
        <Ionicons name="bag-outline" size={22} color="#999" />
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
          </View>
        )}
      </TouchableOpacity>
      {showProfile && (
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <Ionicons name="person-circle-outline" size={26} color="#999" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
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
  badgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },
});
