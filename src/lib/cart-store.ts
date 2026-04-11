// src/lib/cart-store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  addShopifyCartLines,
  createShopifyCart,
  removeShopifyCartLines,
  updateShopifyCartLines,
  type AddLineInput,
} from './shopify/cart';
import type { ShopifyCart } from './shopify/types';

type CartStatus = 'idle' | 'loading' | 'error';

type CartState = {
  cart: ShopifyCart | null;
  status: CartStatus;
  error: string | null;
  addLine: (line: AddLineInput) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  updateLineQuantity: (lineId: string, quantity: number) => Promise<void>;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      status: 'idle',
      error: null,
      async addLine(line) {
        set({ status: 'loading', error: null });
        try {
          const current = get().cart;
          const next = current
            ? await addShopifyCartLines(current.id, [line])
            : await createShopifyCart([line]);
          set({ cart: next, status: 'idle' });
        } catch (err) {
          set({ status: 'idle', error: (err as Error).message });
          throw err;
        }
      },
      async removeLine(lineId) {
        const current = get().cart;
        if (!current) return;
        set({ status: 'loading', error: null });
        try {
          const next = await removeShopifyCartLines(current.id, [lineId]);
          set({ cart: next, status: 'idle' });
        } catch (err) {
          set({ status: 'idle', error: (err as Error).message });
          throw err;
        }
      },
      async updateLineQuantity(lineId, quantity) {
        const current = get().cart;
        if (!current) return;
        set({ status: 'loading', error: null });
        try {
          const next = await updateShopifyCartLines(current.id, [
            { id: lineId, quantity },
          ]);
          set({ cart: next, status: 'idle' });
        } catch (err) {
          set({ status: 'idle', error: (err as Error).message });
          throw err;
        }
      },
    }),
    {
      name: 'wr-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);

// Test-only helper — resets state between tests
export function __resetCartStore(): void {
  useCartStore.setState({ cart: null, status: 'idle', error: null });
}
