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
  max?: number;
};

export function ColorSwatchRow({ colors, max = 4 }: Props) {
  const visible = colors.slice(0, max);
  const extra = colors.length - visible.length;
  return (
    <div className="flex items-center gap-1.5">
      {visible.map((c) => (
        <span
          key={c}
          aria-label={c}
          className="h-3.5 w-3.5 rounded-full border border-border"
          style={{ backgroundColor: swatch(c) }}
        />
      ))}
      {extra > 0 && (
        <span className="text-[10px] font-medium text-muted-foreground">
          +{extra}
        </span>
      )}
    </div>
  );
}
