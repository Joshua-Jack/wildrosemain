"use client";

type Props = {
  sizes: string[];
  selected: string | null;
  onSelect: (size: string) => void;
};

export function SizePicker({ sizes, selected, onSelect }: Props) {
  if (sizes.length === 0) return null;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Choose a size</p>
        <button
          type="button"
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Size guide
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {sizes.map((s) => {
          const active = s === selected;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onSelect(s)}
              aria-pressed={active}
              className={[
                "flex h-11 items-center justify-center rounded-md border text-sm font-medium transition",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-transparent text-foreground hover:border-foreground/50",
              ].join(" ")}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
