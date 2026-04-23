import type { ShopProduct, ShopVariant } from "./types";

/** Mock sale prices on a couple of products to exercise the sale UI. */
const MOCK_SALES: Record<string, number> = {
  "p-podium-jacket": 11000, // was $110, now $88 → 20% off
  "p-duffel": 14500, // was $145, now $120 → ~17% off
};

/** Build full variant list from sizes × colors. Falls back to a single
 *  default variant when the product has no size/color options. */
function buildVariants(
  productId: string,
  sizes: string[],
  colors: string[],
  priceCents: number,
): ShopVariant[] {
  const sizesOrUndef = sizes.length > 0 ? sizes : [undefined];
  const colorsOrUndef = colors.length > 0 ? colors : [undefined];
  const out: ShopVariant[] = [];
  for (const size of sizesOrUndef) {
    for (const color of colorsOrUndef) {
      out.push({
        id: `mock://${productId}/${size ?? "_"}/${color ?? "_"}`,
        size,
        color,
        priceCents,
        available: true,
      });
    }
  }
  return out;
}

const RAW_PRODUCTS: Array<Omit<ShopProduct, "variants">> = [
  {
    id: "p-lightweight-tee",
    slug: "lightweight-tee",
    title: "Wild Rose Lightweight Tee",
    subtitle: "Men's training tee",
    description:
      "A breathable, all-day tee built for training, travel, and sitting court-side.",
    features: [
      "Combed ringspun cotton / modal blend for softness and drape",
      "Relaxed fit with a slightly dropped shoulder",
      "Embroidered collective mark at left chest",
      "Pre-shrunk — machine wash cold, tumble dry low",
    ],
    priceCents: 3400,
    image:
      "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    category: "tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Stone", "Black"],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: "2026-03-01",
  },
  {
    id: "p-relaxed-hoodie",
    slug: "relaxed-hoodie",
    title: "Collective Relaxed Hoodie",
    subtitle: "Unisex pullover hoodie",
    description:
      "Heavyweight fleece, relaxed cut, embroidered collective mark at chest.",
    features: [
      "14 oz heavyweight brushed fleece",
      "Relaxed unisex fit with dropped shoulder",
      "Ribbed cuffs and hem hold shape through wash",
      "Embroidered chest mark and inside-neck label",
    ],
    priceCents: 6500,
    image:
      "https://images.pexels.com/photos/5885811/pexels-photo-5885811.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/5885811/pexels-photo-5885811.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    category: "tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stone"],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: "2026-03-10",
  },
  {
    id: "p-long-sleeve",
    slug: "onward-long-sleeve",
    title: "Onward Long Sleeve",
    subtitle: "Men's running long sleeve",
    description:
      "Moisture-wicking mid-weight long sleeve for cool-weather training.",
    features: [
      "Recycled polyester / spandex performance knit",
      "Flatlock seams to reduce chafing on longer efforts",
      "Thumbholes for cold-weather coverage",
      "Reflective collective mark at back of neck",
    ],
    priceCents: 3800,
    image:
      "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    category: "tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sage"],
    inStock: true,
    isNew: false,
    isFeatured: false,
    createdAt: "2026-02-14",
  },
  {
    id: "p-podium-jacket",
    slug: "podium-hybrid-jacket",
    title: "Podium Hybrid Jacket",
    subtitle: "Men's training jacket",
    description:
      "Full-zip hybrid shell with stretch side panels — built for warm-ups and warm-downs.",
    features: [
      "Water-resistant front panel with stretch side panels",
      "Zippered hand pockets and interior media sleeve",
      "Drop-tail hem for added coverage",
      "Packs into its own pocket for travel",
    ],
    priceCents: 8800,
    image:
      "https://images.pexels.com/photos/8534099/pexels-photo-8534099.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/8534099/pexels-photo-8534099.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    inStock: true,
    isNew: true,
    isFeatured: true,
    createdAt: "2026-03-20",
  },
  {
    id: "p-field-cap",
    slug: "field-day-cap",
    title: "Field Day Cap",
    subtitle: "Unisex 6-panel cap",
    description:
      "Classic unstructured 6-panel with embroidered logo at front.",
    features: [
      "Cotton twill, unstructured crown",
      "Embroidered front panel",
      "Adjustable cloth strap with metal slider",
      "One size — fits 6 7/8 to 7 3/4",
    ],
    priceCents: 3200,
    image:
      "https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    category: "headwear",
    sizes: ["One Size"],
    colors: ["Black", "Natural"],
    inStock: true,
    isNew: false,
    isFeatured: true,
    createdAt: "2026-01-22",
  },
  {
    id: "p-crew-socks",
    slug: "crew-sock-pack",
    title: "Crew Sock Pack",
    subtitle: "3-pack performance crew",
    description:
      "Three-pack knit performance crews, co-designed with long-run athletes.",
    features: [
      "Mid-weight performance knit with arch support",
      "Mesh top panel for breathability",
      "Reinforced heel and toe",
      "Pack of three — two in black, one in stone",
    ],
    priceCents: 2400,
    image:
      "https://images.pexels.com/photos/4164844/pexels-photo-4164844.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/4164844/pexels-photo-4164844.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    category: "bottoms-accessories",
    sizes: ["S/M", "L/XL"],
    colors: ["Black", "Stone"],
    inStock: true,
    isNew: false,
    isFeatured: false,
    createdAt: "2026-02-05",
  },
  {
    id: "p-tech-beanie",
    slug: "tech-beanie",
    title: "Tech Beanie",
    subtitle: "Unisex knit beanie",
    description: "Double-layer merino blend beanie with a fold-up cuff.",
    features: [
      "Double-layer merino blend knit",
      "Fold-up cuff with woven brand label",
      "Soft hand feel — no itch against the forehead",
      "Hand wash, lay flat to dry",
    ],
    priceCents: 2800,
    image:
      "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    category: "headwear",
    sizes: ["One Size"],
    colors: ["Charcoal"],
    inStock: true,
    isNew: true,
    isFeatured: false,
    createdAt: "2026-03-12",
  },
  {
    id: "p-duffel",
    slug: "field-duffel",
    title: "Field Duffel",
    subtitle: "Training & travel bag",
    description:
      "Water-resistant 35L duffel with a ventilated gear pocket.",
    features: [
      "35L capacity with ventilated footwear compartment",
      "Water-resistant 600D recycled polyester shell",
      "Padded adjustable shoulder strap plus grab handles",
      "Interior organizer pocket and exterior quick-access pouch",
    ],
    priceCents: 12000,
    image:
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    category: "bottoms-accessories",
    sizes: ["One Size"],
    colors: ["Black"],
    inStock: true,
    isNew: false,
    isFeatured: true,
    createdAt: "2026-01-10",
  },
];

export const MOCK_PRODUCTS: ShopProduct[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  compareAtPriceCents: MOCK_SALES[p.id],
  variants: buildVariants(p.id, p.sizes, p.colors, p.priceCents),
}));
