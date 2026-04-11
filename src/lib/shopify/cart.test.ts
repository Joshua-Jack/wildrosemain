import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createShopifyCart,
  addShopifyCartLines,
  removeShopifyCartLines,
  updateShopifyCartLines,
  type AddLineInput,
} from './cart';
import * as client from './client';

vi.mock('./client', () => ({
  storefrontFetch: vi.fn(),
  ShopifyError: class extends Error {},
}));

const mockFetch = vi.mocked(client.storefrontFetch);

const sampleCart = {
  id: 'gid://shopify/Cart/1',
  checkoutUrl: 'https://example.myshopify.com/checkouts/1',
  totalQuantity: 1,
  cost: {
    subtotalAmount: { amount: '10.00', currencyCode: 'USD' },
    totalAmount: { amount: '10.00', currencyCode: 'USD' },
  },
  lines: {
    edges: [
      {
        node: {
          id: 'gid://shopify/CartLine/1',
          quantity: 1,
          attributes: [{ key: '_ref', value: 'dallas-garber' }],
          merchandise: {
            id: 'gid://shopify/ProductVariant/1',
            title: 'Default',
            image: null,
            price: { amount: '10.00', currencyCode: 'USD' },
            product: { handle: 'test-hat' },
          },
        },
      },
    ],
  },
};

beforeEach(() => {
  mockFetch.mockReset();
});

describe('createShopifyCart', () => {
  it('returns a normalized cart', async () => {
    mockFetch.mockResolvedValueOnce({
      cartCreate: { cart: sampleCart, userErrors: [] },
    });
    const lines: AddLineInput[] = [
      { merchandiseId: 'gid://shopify/ProductVariant/1', quantity: 1, refAthlete: 'dallas-garber' },
    ];
    const cart = await createShopifyCart(lines);
    expect(cart.id).toBe('gid://shopify/Cart/1');
    expect(cart.lines).toHaveLength(1);
    expect(cart.lines[0]?.attributes).toEqual([
      { key: '_ref', value: 'dallas-garber' },
    ]);
  });

  it('throws when userErrors present', async () => {
    mockFetch.mockResolvedValueOnce({
      cartCreate: {
        cart: null,
        userErrors: [{ field: ['lines'], message: 'Variant unavailable' }],
      },
    });
    await expect(createShopifyCart([])).rejects.toThrow(/Variant unavailable/);
  });
});

describe('addShopifyCartLines', () => {
  it('attaches _ref attribute when refAthlete provided', async () => {
    mockFetch.mockResolvedValueOnce({
      cartLinesAdd: { cart: sampleCart, userErrors: [] },
    });
    await addShopifyCartLines('gid://shopify/Cart/1', [
      { merchandiseId: 'v1', quantity: 2, refAthlete: 'arturo' },
    ]);
    const call = mockFetch.mock.calls[0];
    const variables = call?.[1] as { lines: { attributes: { key: string; value: string }[] }[] };
    expect(variables.lines[0]?.attributes).toEqual([
      { key: '_ref', value: 'arturo' },
    ]);
  });

  it('omits attributes when refAthlete not provided', async () => {
    mockFetch.mockResolvedValueOnce({
      cartLinesAdd: { cart: sampleCart, userErrors: [] },
    });
    await addShopifyCartLines('gid://shopify/Cart/1', [
      { merchandiseId: 'v1', quantity: 1 },
    ]);
    const variables = mockFetch.mock.calls[0]?.[1] as {
      lines: { attributes?: unknown[] }[];
    };
    expect(variables.lines[0]?.attributes).toEqual([]);
  });
});

describe('removeShopifyCartLines', () => {
  it('calls cartLinesRemove with line ids', async () => {
    mockFetch.mockResolvedValueOnce({
      cartLinesRemove: { cart: sampleCart, userErrors: [] },
    });
    await removeShopifyCartLines('gid://shopify/Cart/1', ['gid://shopify/CartLine/1']);
    expect(mockFetch).toHaveBeenCalledOnce();
  });
});

describe('updateShopifyCartLines', () => {
  it('calls cartLinesUpdate', async () => {
    mockFetch.mockResolvedValueOnce({
      cartLinesUpdate: { cart: sampleCart, userErrors: [] },
    });
    await updateShopifyCartLines('gid://shopify/Cart/1', [
      { id: 'gid://shopify/CartLine/1', quantity: 3 },
    ]);
    expect(mockFetch).toHaveBeenCalledOnce();
  });
});
