"use client";

const SWATCHES: Record<string, string> = {
  Stone: "#c9c3b4",
  Black: "#111111",
  Sage: "#a0b59c",
  Charcoal: "#3a3a3a",
  Natural: "#e7dfcc",
  White: "#f5f5f5",
};

function swatch(color: string): string {
  return SWATCHES[color] ?? "#999";
}

type Props = {
  colors: string[];
  selected: string | null;
  onSelect: (color: string) => void;
};

export function ColorPicker({ colors, selected, onSelect }: Props) {
  if (colors.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Color
        </p>
        {selected && (
          <p className="text-xs text-muted-foreground">{selected}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {colors.map((c) => {
          const active = c === selected;
          return (
            <button
              key={c}
              type="button"
              onClick={() => onSelect(c)}
              aria-label={c}
              aria-pressed={active}
              className={[
                "relative h-8 w-8 rounded-full border-2 transition",
                active ? "border-foreground" : "border-transparent",
              ].join(" ")}
            >
              <span
                className="absolute inset-0.5 rounded-full border border-border"
                style={{ backgroundColor: swatch(c) }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
