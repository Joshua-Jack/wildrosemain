import { CartIconButton } from "@/components/cart/cart-icon-button";

type Props = {
  tone: "light" | "dark";
  agencyUrl: string;
};

export function HeaderActions({ tone, agencyUrl }: Props) {
  const linkClass =
    tone === "light"
      ? "text-white/85 hover:text-white"
      : "text-foreground/75 hover:text-foreground";

  return (
    <div className="flex items-center gap-5">
      <a
        href={agencyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "hidden text-sm font-medium transition-colors sm:inline",
          linkClass,
        ].join(" ")}
      >
        Custom gear ↗
      </a>
      <CartIconButton tone={tone} />
    </div>
  );
}
