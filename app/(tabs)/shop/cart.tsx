import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { useCartStore } from '@/store/cartStore';

export default function CartScreen() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCartStore();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart ({totalItems()})</Text>
        {items.length > 0 ? (
          <TouchableOpacity style={styles.iconBtn} onPress={clearCart}>
            <Ionicons name="trash-outline" size={20} color="#E05C5C" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 38 }} />
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={64} color={Colors.border} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add products from the shop to get started</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.back()}>
            <Text style={styles.shopBtnText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            {items.map(({ product, quantity }) => (
              <View key={product.id} style={styles.cartItem}>
                <View style={styles.itemImageBox}>
                  <Image source={{ uri: product.imageUrl }} style={styles.itemImage} resizeMode="contain" />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={2}>{product.title}</Text>
                  <Text style={styles.itemSubtitle} numberOfLines={1}>{product.subtitle}</Text>
                  <View style={styles.itemBottom}>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(product.id, quantity - 1)}
                      >
                        <Ionicons name="remove" size={14} color={Colors.dark} />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <Ionicons name="add" size={14} color={Colors.dark} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(product.id)}>
                      <Ionicons name="trash-outline" size={18} color="#E05C5C" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* Delivery note */}
            <View style={styles.deliveryNote}>
              <Ionicons name="cube-outline" size={16} color={Colors.primary} />
              <Text style={styles.deliveryNoteText}>
                Free delivery on orders over €69
              </Text>
            </View>
          </ScrollView>

          {/* Checkout bar */}
          <View style={styles.checkoutBar}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total ({totalItems()} items)</Text>
              <Text style={styles.totalNote}>Prices on Seasonly.fr</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => {
                // Open seasonly shop
                const { Linking } = require('react-native');
                Linking.openURL('https://seasonly.fr/collections/shop');
              }}
            >
              <Ionicons name="bag-check-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.checkoutBtnText}>Checkout on Seasonly.fr</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: Colors.dark },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.dark, marginTop: 16, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: Colors.subtle, textAlign: 'center', marginBottom: 24 },
  shopBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  shopBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  scroll: { padding: 16, paddingBottom: 20 },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImageBox: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemImage: { width: '90%', height: '90%' },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 14, fontWeight: '700', color: Colors.dark, marginBottom: 3 },
  itemSubtitle: { fontSize: 12, color: Colors.subtle, marginBottom: 10 },
  itemBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: { fontSize: 14, fontWeight: '700', color: Colors.dark, paddingHorizontal: 10 },
  deliveryNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  deliveryNoteText: { fontSize: 13, color: Colors.medium },
  checkoutBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: 16,
    paddingBottom: 24,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: Colors.dark },
  totalNote: { fontSize: 12, color: Colors.subtle },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
