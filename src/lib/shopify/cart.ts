// src/lib/shopify/cart.ts
import { storefrontFetch, ShopifyError } from './client';
import {
  ADD_CART_LINES,
  CREATE_CART,
  GET_CART,
  REMOVE_CART_LINES,
  UPDATE_CART_LINES,
} from './queries';
import { CartLine, ShopifyCart, ShopifyImage, Money } from './types';

export type AddLineInput = {
  merchandiseId: string;
  quantity: number;
  refAthlete?: string;
};

type UserError = { field: string[] | null; message: string };

type RawCartMerchandise = {
  id: string;
  title: string;
  image: ShopifyImage | null;
  price: Money;
  product: { handle: string };
};

type RawCartLine = {
  id: string;
  quantity: number;
  attributes: { key: string; value: string }[];
  merchandise: RawCartMerchandise;
};

type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: ShopifyCart['cost'];
  lines: { edges: { node: RawCartLine }[] };
};

function normalizeLine(raw: RawCartLine): CartLine {
  return {
    id: raw.id,
    quantity: raw.quantity,
    merchandiseId: raw.merchandise.id,
    title: raw.merchandise.title,
    productHandle: raw.merchandise.product.handle,
    image: raw.merchandise.image,
    price: raw.merchandise.price,
    attributes: raw.attributes,
  };
}

function normalizeCart(raw: RawCart): ShopifyCart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    cost: raw.cost,
    lines: raw.lines.edges.map((e) => normalizeLine(e.node)),
  };
}

function throwOnUserErrors(errors: UserError[]): void {
  if (errors.length > 0) {
    throw new ShopifyError(errors.map((e) => e.message).join('; '));
  }
}

function toLineInput(line: AddLineInput) {
  return {
    merchandiseId: line.merchandiseId,
    quantity: line.quantity,
    attributes: line.refAthlete ? [{ key: '_ref', value: line.refAthlete }] : [],
  };
}

export async function createShopifyCart(
  lines: AddLineInput[],
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartCreate: { cart: RawCart | null; userErrors: UserError[] };
  }>(CREATE_CART, {
    input: { lines: lines.map(toLineInput) },
  });
  throwOnUserErrors(data.cartCreate.userErrors);
  if (!data.cartCreate.cart) {
    throw new ShopifyError('cartCreate returned null cart');
  }
  return normalizeCart(data.cartCreate.cart);
}

export async function addShopifyCartLines(
  cartId: string,
  lines: AddLineInput[],
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartLinesAdd: { cart: RawCart | null; userErrors: UserError[] };
  }>(ADD_CART_LINES, {
    cartId,
    lines: lines.map(toLineInput),
  });
  throwOnUserErrors(data.cartLinesAdd.userErrors);
  if (!data.cartLinesAdd.cart) {
    throw new ShopifyError('cartLinesAdd returned null cart');
  }
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateShopifyCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartLinesUpdate: { cart: RawCart | null; userErrors: UserError[] };
  }>(UPDATE_CART_LINES, { cartId, lines });
  throwOnUserErrors(data.cartLinesUpdate.userErrors);
  if (!data.cartLinesUpdate.cart) {
    throw new ShopifyError('cartLinesUpdate returned null cart');
  }
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeShopifyCartLines(
  cartId: string,
  lineIds: string[],
): Promise<ShopifyCart> {
  const data = await storefrontFetch<{
    cartLinesRemove: { cart: RawCart | null; userErrors: UserError[] };
  }>(REMOVE_CART_LINES, { cartId, lineIds });
  throwOnUserErrors(data.cartLinesRemove.userErrors);
  if (!data.cartLinesRemove.cart) {
    throw new ShopifyError('cartLinesRemove returned null cart');
  }
  return normalizeCart(data.cartLinesRemove.cart);
}

export async function getShopifyCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await storefrontFetch<{ cart: RawCart | null }>(GET_CART, {
    cartId,
  });
  return data.cart ? normalizeCart(data.cart) : null;
}
