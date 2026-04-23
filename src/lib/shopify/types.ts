// src/lib/shopify/types.ts
export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  publishedAt: string;
  tags: string[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  featuredImage: ShopifyImage | null;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
};

export type CartAttribute = { key: string; value: string };

export type CartLine = {
  id: string;
  quantity: number;
  merchandiseId: string;
  /** Variant title — typically "S / Black" or "Default Title". */
  title: string;
  /** Parent product title — what the customer recognizes. */
  productTitle: string;
  productHandle: string;
  image: ShopifyImage | null;
  price: Money;
  attributes: CartAttribute[];
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: CartLine[];
};
