type Props = {
  inStock: boolean;
};

export function StockIndicator({ inStock }: Props) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={[
          "inline-block h-2 w-2 rounded-full",
          inStock ? "bg-green-500" : "bg-red-500",
        ].join(" ")}
      />
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {inStock ? "In stock" : "Sold out"}
      </span>
    </div>
  );
}
