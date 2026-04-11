import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCartStore, __resetCartStore } from './cart-store';
import * as shopifyCart from './shopify/cart';
import type { ShopifyCart } from './shopify/types';

vi.mock('./shopify/cart', () => ({
  createShopifyCart: vi.fn(),
  addShopifyCartLines: vi.fn(),
  updateShopifyCartLines: vi.fn(),
  removeShopifyCartLines: vi.fn(),
  getShopifyCart: vi.fn(),
}));

const mockedCart: ShopifyCart = {
  id: 'gid://shopify/Cart/1',
  checkoutUrl: 'https://example.myshopify.com/checkouts/1',
  totalQuantity: 2,
  cost: {
    subtotalAmount: { amount: '20.00', currencyCode: 'USD' },
    totalAmount: { amount: '20.00', currencyCode: 'USD' },
  },
  lines: [
    {
      id: 'gid://shopify/CartLine/1',
      quantity: 2,
      merchandiseId: 'gid://shopify/ProductVariant/1',
      title: 'Default',
      productHandle: 'test-hat',
      image: null,
      price: { amount: '10.00', currencyCode: 'USD' },
      attributes: [{ key: '_ref', value: 'dallas-garber' }],
    },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
  __resetCartStore();
  window.localStorage.clear();
});

describe('cart-store', () => {
  it('creates a shopify cart on first addLine', async () => {
    vi.mocked(shopifyCart.createShopifyCart).mockResolvedValueOnce(mockedCart);
    await useCartStore.getState().addLine({
      merchandiseId: 'gid://shopify/ProductVariant/1',
      quantity: 2,
      refAthlete: 'dallas-garber',
    });
    expect(shopifyCart.createShopifyCart).toHaveBeenCalledOnce();
    expect(useCartStore.getState().cart?.id).toBe(mockedCart.id);
  });

  it('adds lines to existing cart on subsequent addLine', async () => {
    vi.mocked(shopifyCart.createShopifyCart).mockResolvedValueOnce(mockedCart);
    vi.mocked(shopifyCart.addShopifyCartLines).mockResolvedValueOnce({
      ...mockedCart,
      totalQuantity: 3,
    });
    await useCartStore.getState().addLine({
      merchandiseId: 'gid://shopify/ProductVariant/1',
      quantity: 1,
    });
    await useCartStore.getState().addLine({
      merchandiseId: 'gid://shopify/ProductVariant/2',
      quantity: 1,
    });
    expect(shopifyCart.addShopifyCartLines).toHaveBeenCalledOnce();
    expect(useCartStore.getState().cart?.totalQuantity).toBe(3);
  });

  it('surfaces errors and rolls back loading state', async () => {
    vi.mocked(shopifyCart.createShopifyCart).mockRejectedValueOnce(
      new Error('Shopify down'),
    );
    await expect(
      useCartStore.getState().addLine({
        merchandiseId: 'gid://shopify/ProductVariant/1',
        quantity: 1,
      }),
    ).rejects.toThrow(/Shopify down/);
    expect(useCartStore.getState().status).toBe('idle');
    expect(useCartStore.getState().cart).toBeNull();
  });

  it('removeLine calls removeShopifyCartLines', async () => {
    vi.mocked(shopifyCart.createShopifyCart).mockResolvedValueOnce(mockedCart);
    vi.mocked(shopifyCart.removeShopifyCartLines).mockResolvedValueOnce({
      ...mockedCart,
      totalQuantity: 0,
      lines: [],
    });
    await useCartStore.getState().addLine({
      merchandiseId: 'gid://shopify/ProductVariant/1',
      quantity: 1,
    });
    await useCartStore.getState().removeLine('gid://shopify/CartLine/1');
    expect(shopifyCart.removeShopifyCartLines).toHaveBeenCalledOnce();
    expect(useCartStore.getState().cart?.lines).toHaveLength(0);
  });
});
