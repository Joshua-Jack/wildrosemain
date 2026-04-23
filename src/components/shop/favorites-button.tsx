"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/favorites-store";

type Props = {
  productId: string;
};

export function FavoritesButton({ productId }: Props) {
  const saved = useFavoritesStore((s) => s.ids.includes(productId));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={saved}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-medium text-foreground transition hover:border-foreground/40"
    >
      {saved ? "Saved" : "Favorites"}
      <Heart
        className={[
          "h-4 w-4 transition",
          saved ? "fill-foreground text-foreground" : "",
        ].join(" ")}
      />
    </button>
  );
}
