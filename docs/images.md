# Managing site images (Supabase)

The Wild Rose Collective site uses **Supabase Storage as a lightweight CMS**
for editorial images (hero, about, team, shop bento, marquees, etc.). Product
photography still comes from Shopify — this doc only covers the hand-curated
slots.

## TL;DR

1. Open the Supabase dashboard → **Storage → `wildrosecollective` bucket**.
2. Drag-drop your image into the right folder with the **exact filename** from
   the registry below.
3. In the repo, open `src/lib/images/registry.ts` and flip that slot's
   `uploaded: false` → `uploaded: true`.
4. Commit and push. Done — the site now serves your real image.

Until you flip `uploaded: true`, the site shows a Pexels fallback so nothing
breaks in preview/dev.

---

## Where images live

- **Bucket:** `wildrosecollective` (public)
- **Base URL:** `https://mqupvuhrhdxfoesburac.supabase.co/storage/v1/object/public/wildrosecollective/`

A path of `hero/collective.jpg` in the registry resolves to:
`https://mqupvuhrhdxfoesburac.supabase.co/storage/v1/object/public/wildrosecollective/hero/collective.jpg`

## Image slots (full list)

All paths are inside the `wildrosecollective` bucket.

### Hero
| Slot | Supabase path | Where it shows |
| --- | --- | --- |
| `heroCollective` | `hero/collective.jpg` | Hero slide 1 — "The Collective" background |
| `heroShop[0]` | `hero/shop-01.jpg` | Shop bento — **big feature tile (left, 2×2)** |
| `heroShop[1]` | `hero/shop-02.jpg` | Shop bento — small top tile |
| `heroShop[2]` | `hero/shop-03.jpg` | Shop bento — **tall tile (right, 2-row)** |
| `heroShop[3]` | `hero/shop-04.jpg` | Shop bento — small bottom tile |
| `heroTeam[0]` | `hero/team-01.jpg` | Team bento — big feature tile |
| `heroTeam[1]` | `hero/team-02.jpg` | Team bento — small top |
| `heroTeam[2]` | `hero/team-03.jpg` | Team bento — tall right |
| `heroTeam[3]` | `hero/team-04.jpg` | Team bento — small bottom |

### About section
| Slot | Supabase path | Where it shows |
| --- | --- | --- |
| `aboutMain` | `about/main.jpg` | Large hero photo on the right |
| `aboutAccentA` | `about/accent-01.jpg` | Left small photo (bottom-left pair) |
| `aboutAccentB` | `about/accent-02.jpg` | Right small photo |

### Feature cards
| Slot | Supabase path | Where it shows |
| --- | --- | --- |
| `featureTeam` | `feature-cards/team.jpg` | "The Team" card background |
| `featureTournaments` | `feature-cards/tournaments.jpg` | "Tournaments" card background |

### Contact CTA marquees
| Slot | Supabase path | Where it shows |
| --- | --- | --- |
| `contactRowA[0..3]` | `contact-cta/row-a-01..04.jpg` | Top marquee (scrolls right → left) |
| `contactRowB[0..3]` | `contact-cta/row-b-01..04.jpg` | Bottom marquee (scrolls left → right) |

---

## Image specs

- **Format:** JPEG or WEBP (JPEG is safest)
- **Long edge:** 1600–2000 px (bigger is wasted; smaller looks soft)
- **Aspect ratios** vary by slot — check the component before exporting if you
  need pixel-accuracy, but most slots `object-cover` so close enough works.
  - Hero / feature cards: roughly 3:2 or 16:10
  - Bento tiles: roughly square (the grid adjusts)
  - Marquee tiles: square
  - About main: roughly 4:5 (portrait) looks best on mobile
- **Compression:** JPEG quality 80–85 hits the sweet spot. Aim for < 400 KB
  per file.
- **Filenames:** lowercase, hyphenated, no spaces. Use the exact paths above.

## Replacing an existing image

Same filename + overwrite. Supabase bumps its public URL timestamp query
parameter automatically, so Next.js will pick up the new version on the next
request/refresh.

## Adding a brand new slot (engineer)

1. Add an entry to `SITE_IMAGES` in `src/lib/images/registry.ts`.
2. Import and use it in the relevant component via `getSiteImageOne` or
   `getSiteImageList`.
3. Update this doc with the new path + where it shows.
4. Commit, then upload the real file to Supabase and flip `uploaded: true`.

## Gotchas

- **Wrong filename = broken image.** The path in the registry must match the
  Supabase path exactly. Double-check caps and extension (`.jpg` vs `.jpeg`).
- **Bucket must stay public.** Don't accidentally flip `wildrosecollective` to
  private — the public URLs will stop working.
- **Cache.** Supabase CDN caches for a short window. If a replacement doesn't
  show up, wait ~30s or hard-refresh (Cmd+Shift+R).
- **Alt text** is stored in the registry, not in Supabase. Update it in code
  when you swap images so screen readers stay accurate.
