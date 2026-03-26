import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { mockProducts, mockUser } from '@/constants/mockData';

const CATEGORIES = ['All', 'Serums', 'Creams', 'Oils', 'Tools'];

export default function ShopScreen() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = mockProducts.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const bestSellers = filtered.filter(p => p.isBestSeller);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Shop</Text>
          <Ionicons name="bag-outline" size={24} color={Colors.dark} />
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
          {CATEGORIES.map(cat => (
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
        <LinearGradient
          colors={['#7C6FAE', '#9B8FD0']}
          style={styles.milesBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.milesLeft}>
            <Ionicons name="trophy-outline" size={22} color="#fff" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.milesLabel}>Your Skin Miles</Text>
              <Text style={styles.milesNum}>{mockUser.skinMiles.toLocaleString()}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.useBtn}>
            <Text style={styles.useBtnText}>Use Points</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Best Sellers</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.grid}>
              {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
            </View>
          </>
        )}

        {/* All Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Products</Text>
        </View>
        <View style={styles.grid}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProductCard({ product }: { product: typeof mockProducts[0] }) {
  return (
    <View style={pcStyles.card}>
      <View style={pcStyles.imageBox}>
        <Image source={{ uri: product.image }} style={pcStyles.image} />
        {product.isBestSeller && (
          <View style={pcStyles.badge}>
            <Text style={pcStyles.badgeText}>Best Seller</Text>
          </View>
        )}
      </View>
      <View style={pcStyles.info}>
        <Text style={pcStyles.name}>{product.name}</Text>
        <View style={pcStyles.ratingRow}>
          <Ionicons name="star" size={13} color={Colors.gold} />
          <Text style={pcStyles.rating}> {product.rating}</Text>
        </View>
        <Text style={pcStyles.price}>€{product.price}</Text>
      </View>
    </View>
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
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  milesLeft: { flexDirection: 'row', alignItems: 'center' },
  milesLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  milesNum: { color: '#fff', fontSize: 22, fontWeight: '800' },
  useBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  useBtnText: { color: Colors.purple, fontWeight: '700', fontSize: 13 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: Colors.dark },
  seeAll: { color: Colors.gold, fontSize: 13, fontWeight: '600' },
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
  imageBox: { position: 'relative' },
  image: { width: '100%', height: 150 },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  info: { padding: 12 },
  name: { fontSize: 13, fontWeight: '700', color: Colors.dark, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 12, color: Colors.dark },
  price: { fontSize: 15, fontWeight: '700', color: Colors.gold, marginTop: 4 },
});
