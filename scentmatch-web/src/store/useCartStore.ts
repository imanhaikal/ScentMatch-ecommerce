import { create } from 'zustand';

export interface CartItem {
  id: string;
  variantId: string;
  name: string;
  artisan: string;
  price: number;
  image: string;
  quantity: number;
  notes?: {
    top: string;
    heart: string;
    base: string;
  };
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  shopifyCartId: string | null;
  checkoutUrl: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setShopifyCart: (cart: { id: string; checkoutUrl: string }) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  get total(): number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  shopifyCartId: null,
  checkoutUrl: null,
  addItem: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }], isOpen: true };
    });
  },
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ items: [], shopifyCartId: null, checkoutUrl: null }),
  setShopifyCart: (cart) => set({ shopifyCartId: cart.id, checkoutUrl: cart.checkoutUrl }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  get total() {
    return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
}));
