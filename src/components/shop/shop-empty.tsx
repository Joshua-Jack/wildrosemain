type Props = {
  onClear?: () => void;
};

export function ShopEmpty({ onClear }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/20 py-16 text-center">
      <p className="text-lg font-medium text-foreground">
        No products match these filters.
      </p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Try a different category or clear filters to see the full shop.
      </p>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="mt-2 inline-flex items-center rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
