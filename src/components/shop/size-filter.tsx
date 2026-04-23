"use client";

const COMMON_SIZES = ["XS", "S", "M", "L", "XL"];

type Props = {
  selected: string[];
  onToggle: (size: string) => void;
  sizes?: string[];
};

export function SizeFilter({ selected, onToggle, sizes = COMMON_SIZES }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Size</span>
      {sizes.map((s) => {
        const active = selected.includes(s);
        return (
          <button
            key={s}
            type="button"
            onClick={() => onToggle(s)}
            aria-pressed={active}
            className={[
              "flex h-8 min-w-8 items-center justify-center rounded-full border px-3 text-xs font-medium transition",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-transparent text-foreground hover:border-foreground/30",
            ].join(" ")}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
