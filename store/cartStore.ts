import { create } from 'zustand';
import { Product } from '@/constants/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product) => {
    const existing = get().items.find(i => i.product.id === product.id);
    if (existing) {
      set(state => ({
        items: state.items.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }));
    } else {
      set(state => ({ items: [...state.items, { product, quantity: 1 }] }));
    }
  },

  removeFromCart: (productId) =>
    set(state => ({ items: state.items.filter(i => i.product.id !== productId) })),

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
    } else {
      set(state => ({
        items: state.items.map(i =>
          i.product.id === productId ? { ...i, quantity } : i
        ),
      }));
    }
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () => get().items.reduce((sum, i) => sum + i.quantity * 49, 0), // placeholder price
}));
