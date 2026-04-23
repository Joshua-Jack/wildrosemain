import { SITE_IMAGES, type ImageSlot, type SiteImageKey } from "./registry";
import { getSupabaseImageUrl } from "./get-supabase-url";

export type ResolvedImage = {
  src: string;
  alt: string;
};

function resolve(entry: ImageSlot): ResolvedImage {
  return {
    src: entry.uploaded ? getSupabaseImageUrl(entry.path) : entry.fallback,
    alt: entry.alt,
  };
}

/** Resolve a single image slot by key. */
export function getSiteImage(key: SiteImageKey): ResolvedImage | ResolvedImage[] {
  const entry = SITE_IMAGES[key];
  if (Array.isArray(entry)) {
    return entry.map(resolve);
  }
  return resolve(entry);
}

/** Narrowed helpers — cleaner call sites at the cost of a bit of duplication. */
export function getSiteImageOne(
  key: Extract<
    SiteImageKey,
    | "heroCollective"
    | "aboutMain"
    | "aboutAccentA"
    | "aboutAccentB"
    | "featureTeam"
    | "featureTournaments"
  >,
): ResolvedImage {
  return resolve(SITE_IMAGES[key] as ImageSlot);
}

export function getSiteImageList(
  key: Extract<
    SiteImageKey,
    "heroShop" | "heroTeam" | "contactRowA" | "contactRowB"
  >,
): ResolvedImage[] {
  return (SITE_IMAGES[key] as readonly ImageSlot[]).map(resolve);
}
