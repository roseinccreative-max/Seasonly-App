import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { products } from '@/constants/products';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

const HERO_BG_COLORS = [
  '#F2EDE8', '#EEE8F0', '#E8EEF0', '#F0EDE8', '#EAF0E8',
  '#F0E8EE', '#EDE8F0', '#E8F0ED', '#F0EAE8', '#E8EDF0',
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const addToCart = useCartStore(s => s.addToCart);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Product not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: Colors.primary, marginTop: 12 }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const productIndex = products.indexOf(product);
  const heroBg = HERO_BG_COLORS[productIndex % HERO_BG_COLORS.length];
  const isBestSeller = product.description.toLowerCase().includes('best seller');
  const isNew = product.description.toLowerCase().startsWith('new.');
  const isOutOfStock = product.description.toLowerCase().includes('out of stock');

  // Extract key benefits from description (sentences with action words)
  const benefitLines = product.description
    .split(/[.!]/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 80)
    .slice(0, 4);

  // Clean description (remove status prefix)
  const cleanDescription = product.description
    .replace(/^(Best Seller\.|New\.|Out of Stock\.)\s*/i, '')
    .split('.').slice(0, 3).join('.') + '.';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={Colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.iconBtn} onPress={() => setWishlisted(w => !w)}>
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={wishlisted ? '#E05C5C' : Colors.dark}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={[styles.heroContainer, { backgroundColor: heroBg }]}>
          <Image source={{ uri: product.imageUrl }} style={styles.heroImage} resizeMode="contain" />
          {isBestSeller && (
            <View style={[styles.heroBadge, { backgroundColor: Colors.orange }]}>
              <Text style={styles.heroBadgeText}>Best Seller</Text>
            </View>
          )}
          {isNew && !isBestSeller && (
            <View style={[styles.heroBadge, { backgroundColor: Colors.green }]}>
              <Text style={styles.heroBadgeText}>New</Text>
            </View>
          )}
          {isOutOfStock && (
            <View style={[styles.heroBadge, { backgroundColor: '#999' }]}>
              <Text style={styles.heroBadgeText}>Out of Stock</Text>
            </View>
          )}
        </View>

        {/* Thumbnails */}
        <View style={styles.thumbRow}>
          {[0, 1, 2].map(i => (
            <TouchableOpacity
              key={i}
              style={[styles.thumb, selectedThumb === i && styles.thumbActive]}
              onPress={() => setSelectedThumb(i)}
            >
              <Image source={{ uri: product.imageUrl }} style={styles.thumbImg} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Title + Price */}
        <View style={styles.titleRow}>
          <Text style={styles.productTitle}>{product.title}</Text>
        </View>
        <Text style={styles.categoryLabel}>{product.category}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map(star => (
            <Ionicons
              key={star}
              name={star <= 4 ? 'star' : 'star-outline'}
              size={16}
              color={star <= 4 ? Colors.gold : '#D0C8C0'}
            />
          ))}
          <Text style={styles.ratingText}>4.8 (124 reviews)</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.bodyText}>{cleanDescription}</Text>
        </View>

        {/* Key Benefits */}
        {benefitLines.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Benefits</Text>
            {benefitLines.map((line, i) => (
              <View key={i} style={styles.benefitRow}>
                <Ionicons name="checkmark" size={16} color={Colors.gold} style={styles.checkIcon} />
                <Text style={styles.benefitText}>{line}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.bodyText}>{product.ingredients}</Text>
        </View>

        {/* How to Use */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use</Text>
          <Text style={styles.bodyText}>{product.howToUse}</Text>
        </View>

        {/* Delivery */}
        <View style={[styles.section, styles.deliverySection]}>
          <Ionicons name="cube-outline" size={18} color={Colors.primary} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.sectionTitle}>Delivery</Text>
            {product.delivery.split('|').map((line, i) => (
              <Text key={i} style={styles.deliveryLine}>{line.trim()}</Text>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-social-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addToCartBtn, isOutOfStock && styles.addToCartDisabled, addedToCart && styles.addToCartAdded]}
          onPress={() => {
            if (!isOutOfStock) {
              addToCart(product);
              setAddedToCart(true);
              setTimeout(() => setAddedToCart(false), 2000);
            }
          }}
          disabled={isOutOfStock}
        >
          <Ionicons name={addedToCart ? 'checkmark' : 'cart-outline'} size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addToCartText}>
            {isOutOfStock ? 'Out of Stock' : addedToCart ? 'Added to Cart!' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
  },
  scroll: { paddingBottom: 20 },
  heroContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heroImage: { width: '85%', height: '90%' },
  heroBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  heroBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  thumbRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: '#fff',
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbActive: { borderColor: Colors.primary },
  thumbImg: { width: '90%', height: '90%' },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.dark,
    flex: 1,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 13,
    color: Colors.subtle,
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 2,
  },
  ratingText: {
    fontSize: 13,
    color: Colors.medium,
    marginLeft: 6,
  },
  section: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    color: Colors.medium,
    lineHeight: 22,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  checkIcon: { marginRight: 8, marginTop: 2 },
  benefitText: {
    fontSize: 14,
    color: Colors.medium,
    flex: 1,
    lineHeight: 20,
  },
  deliverySection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deliveryLine: {
    fontSize: 13,
    color: Colors.medium,
    lineHeight: 20,
    marginBottom: 2,
  },
  bottomBar: {
    position: Platform.OS === 'web' ? 'sticky' as any : 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    gap: 12,
  },
  shareBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartBtn: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartDisabled: { backgroundColor: '#ccc' },
  addToCartAdded: { backgroundColor: Colors.green },
  addToCartText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontSize: 18, color: Colors.dark },
});
