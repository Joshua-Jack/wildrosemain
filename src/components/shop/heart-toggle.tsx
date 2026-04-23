"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/favorites-store";

type Props = {
  productId: string;
  /** When true, renders the smaller card-overlay variant (top-right of image). */
  overlay?: boolean;
};

export function HeartToggle({ productId, overlay }: Props) {
  const saved = useFavoritesStore((s) => s.ids.includes(productId));
  const toggle = useFavoritesStore((s) => s.toggle);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
  };

  if (overlay) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={saved ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={saved}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-sm transition hover:bg-background"
      >
        <Heart
          className={[
            "h-4 w-4 transition",
            saved ? "fill-foreground" : "",
          ].join(" ")}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={saved ? "Remove from favorites" : "Add to favorites"}
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
