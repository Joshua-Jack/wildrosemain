/**
 * Central registry for every editorial image slot on the site.
 *
 * Workflow:
 *   1. Upload an image to the `wildrosecollective` Supabase Storage bucket at
 *      the path listed in `path`.
 *   2. Flip `uploaded` to `true` for that slot.
 *   3. Done — the component now serves the real file instead of the fallback.
 *
 * Notes:
 *   - Each slot has a Pexels `fallback` so the site keeps rendering before the
 *     real image is uploaded.
 *   - Use uppercase, hyphenated filenames where possible. No spaces.
 *   - Recommended export width: 1600–2000px on the long edge. JPEG or WEBP.
 *   - See `docs/images.md` for the full maintenance guide.
 */

export type ImageSlot = {
  /** Supabase Storage path inside the `wildrosecollective` bucket. */
  path: string;
  /** Public fallback used until the real file is uploaded. */
  fallback: string;
  /** Alt text for accessibility. Keep descriptive, under ~120 chars. */
  alt: string;
  /** Flip to `true` once the file has been uploaded to Supabase. */
  uploaded: boolean;
};

export const SITE_IMAGES = {
  // ─── Hero ──────────────────────────────────────────────────────────────
  heroCollective: {
    path: "hero/collective-01.jpg",
    fallback:
      "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Athletes of the Wild Rose Collective",
    uploaded: true,
  },

  // Shop bento — 4 tiles. Order: big feature, small-top, tall, small-bottom.
  heroShop: [
    {
      path: "hero/shop-01.jpg",
      fallback:
        "https://images.pexels.com/photos/4164844/pexels-photo-4164844.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Shop hero tile 1",
      uploaded: true,
    },
    {
      path: "hero/shop-02.jpg",
      fallback:
        "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Shop hero tile 2",
      uploaded: true,
    },
    {
      path: "hero/shop-06.jpg",
      fallback:
        "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "Shop hero tile 3 (tall)",
      uploaded: true,
    },
    {
      path: "hero/shop-04.jpg",
      fallback:
        "https://images.pexels.com/photos/2827400/pexels-photo-2827400.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Shop hero tile 4",
      uploaded: true,
    },
  ],

  // Team bento — 4 tiles, same layout as shop (feature / small / tall / small).
  heroTeam: [
    {
      path: "hero/team-01.jpg",
      fallback:
        "https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Team hero tile 1",
      uploaded: true,
    },
    {
      path: "hero/team-02.jpg",
      fallback:
        "https://images.pexels.com/photos/3763871/pexels-photo-3763871.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Team hero tile 2",
      uploaded: true,
    },
    {
      path: "hero/team-06.jpg",
      fallback:
        "https://images.pexels.com/photos/2888690/pexels-photo-2888690.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "Team hero tile 3",
      uploaded: true,
    },
    {
      path: "hero/team-04.jpg",
      fallback:
        "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Team hero tile 4",
      uploaded: true,
    },
    {
      path: "hero/team-05.jpg",
      fallback:
        "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Team hero tile 5",
      uploaded: true,
    },
  ],

  // ─── About section ─────────────────────────────────────────────────────
  aboutMain: {
    path: "about/main.jpg",
    fallback:
      "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Wild Rose Collective — main about photo",
    uploaded: true,
  },
  aboutAccentA: {
    path: "about/accent-01.jpg",
    fallback:
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Athletes training",
    uploaded: true,
  },
  aboutAccentB: {
    path: "about/accent-02.jpg",
    fallback:
      "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Team gear close-up",
    uploaded: true,
  },

  // ─── Feature cards (Team / Tournaments) ────────────────────────────────
  featureTeam: {
    path: "feature-cards/team.jpg",
    fallback:
      "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "The Wild Rose Collective team",
    uploaded: false,
  },
  featureTournaments: {
    path: "feature-cards/tournaments.jpg",
    fallback:
      "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Collective tournaments",
    uploaded: false,
  },

  // ─── Contact CTA marquees ──────────────────────────────────────────────
  contactRowA: [
    {
      path: "contact-cta/row-a-01.jpg",
      fallback:
        "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Contact marquee A1",
      uploaded: false,
    },
    {
      path: "contact-cta/row-a-02.jpg",
      fallback:
        "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Contact marquee A2",
      uploaded: false,
    },
    {
      path: "contact-cta/row-a-03.jpg",
      fallback:
        "https://images.pexels.com/photos/4164844/pexels-photo-4164844.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Contact marquee A3",
      uploaded: false,
    },
    {
      path: "contact-cta/row-a-04.jpg",
      fallback:
        "https://images.pexels.com/photos/1192672/pexels-photo-1192672.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Contact marquee A4",
      uploaded: false,
    },
  ],
  contactRowB: [
    {
      path: "contact-cta/row-b-01.jpg",
      fallback:
        "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Contact marquee B1",
      uploaded: false,
    },
    {
      path: "contact-cta/row-b-02.jpg",
      fallback:
        "https://images.pexels.com/photos/8534099/pexels-photo-8534099.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Contact marquee B2",
      uploaded: false,
    },
    {
      path: "contact-cta/row-b-03.jpg",
      fallback:
        "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Contact marquee B3",
      uploaded: false,
    },
    {
      path: "contact-cta/row-b-04.jpg",
      fallback:
        "https://images.pexels.com/photos/5885811/pexels-photo-5885811.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Contact marquee B4",
      uploaded: false,
    },
  ],
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGES;
