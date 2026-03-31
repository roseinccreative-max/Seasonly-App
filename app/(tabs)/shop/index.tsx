import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { products, productCategories, Product } from '@/constants/products';
import { mockUser } from '@/constants/mockData';
import { HeaderIcons } from '@/components/ui/HeaderIcons';

export default function ShopScreen() {
  const router = useRouter();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    (category === 'All' || p.category === category) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const bestSellers = products.filter(p =>
    p.description.toLowerCase().includes('best seller')
  ).slice(0, 4);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Shop</Text>
          <HeaderIcons />
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <Ionicons name="search-outline" size={16} color={Colors.subtle} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={Colors.subtle}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catsScroll} contentContainerStyle={styles.catsContent}>
          {productCategories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, category === cat && styles.catActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.catLabel, category === cat && styles.catLabelActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Skin Miles banner */}
        <View style={styles.milesBanner}>
          <View style={styles.milesLeft}>
            <Ionicons name="trophy-outline" size={22} color={Colors.dark} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.milesLabel}>Your Skin Miles</Text>
              <Text style={styles.milesNum}>{mockUser.skinMiles.toLocaleString()}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.useBtn} onPress={() => router.push('/(tabs)/rewards')}>
            <Text style={styles.useBtnText}>Use Points</Text>
          </TouchableOpacity>
        </View>

        {/* Best Sellers */}
        {search === '' && category === 'All' && bestSellers.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Best Sellers</Text>
            </View>
            <View style={styles.grid}>
              {bestSellers.map(p => (
                <ProductCard key={p.id} product={p} onPress={() => router.push(`/(tabs)/shop/${p.id}`)} />
              ))}
            </View>
          </>
        )}

        {/* Product Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {category === 'All' ? 'All Products' : category} ({filtered.length})
          </Text>
        </View>
        <View style={styles.grid}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onPress={() => router.push(`/(tabs)/shop/${p.id}`)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProductCard({ product, onPress }: { product: Product; onPress: () => void }) {
  const isBestSeller = product.description.toLowerCase().includes('best seller');
  const isNew = product.description.toLowerCase().startsWith('new.');
  const isOutOfStock = product.description.toLowerCase().includes('out of stock');

  return (
    <TouchableOpacity style={pcStyles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={pcStyles.imageBox}>
        <Image source={{ uri: product.imageUrl }} style={pcStyles.image} resizeMode="contain" />
        {isBestSeller && (
          <View style={[pcStyles.badge, { backgroundColor: Colors.orange }]}>
            <Text style={pcStyles.badgeText}>Best Seller</Text>
          </View>
        )}
        {isNew && !isBestSeller && (
          <View style={[pcStyles.badge, { backgroundColor: Colors.green }]}>
            <Text style={pcStyles.badgeText}>New</Text>
          </View>
        )}
        {isOutOfStock && (
          <View style={[pcStyles.badge, { backgroundColor: '#999' }]}>
            <Text style={pcStyles.badgeText}>Out of Stock</Text>
          </View>
        )}
      </View>
      <View style={pcStyles.info}>
        <Text style={pcStyles.name} numberOfLines={2}>{product.title}</Text>
        <Text style={pcStyles.subtitle} numberOfLines={1}>{product.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: '800', color: Colors.dark },
  searchRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.dark },
  catsScroll: { marginBottom: 20 },
  catsContent: { paddingBottom: 4 },
  catPill: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catActive: { backgroundColor: Colors.primary, borderWidth: 0 },
  catLabel: { fontSize: 13, color: Colors.medium, fontWeight: '600' },
  catLabelActive: { color: '#fff' },
  milesBanner: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  milesLeft: { flexDirection: 'row', alignItems: 'center' },
  milesLabel: { color: Colors.subtle, fontSize: 12 },
  milesNum: { color: Colors.dark, fontSize: 22, fontWeight: '800' },
  useBtn: {
    backgroundColor: Colors.dark,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  useBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginBottom: 24 },
});

const pcStyles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  imageBox: { position: 'relative', backgroundColor: '#F9F5F2' },
  image: { width: '100%', height: 160 },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  info: { padding: 12 },
  name: { fontSize: 13, fontWeight: '700', color: Colors.dark, marginBottom: 3 },
  subtitle: { fontSize: 11, color: Colors.subtle },
});
