type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  count?: number;
};

export function ShopHeader({ eyebrow, title, description, count }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow && (
        <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      )}
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        {typeof count === "number" && (
          <p className="pb-2 text-sm text-muted-foreground">
            {count} {count === 1 ? "product" : "products"}
          </p>
        )}
      </div>
      {description && (
        <p className="max-w-2xl text-base text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
