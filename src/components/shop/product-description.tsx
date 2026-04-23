import { Check } from "lucide-react";
import { InfoAccordion } from "./info-accordion";

type Props = {
  description: string;
  features?: string[];
};

export function ProductDescription({ description, features }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-base leading-relaxed text-foreground/85">
        {description}
      </p>

      <InfoAccordion
        items={[
          {
            title: "Features",
            defaultOpen: true,
            content: features && features.length > 0 ? (
              <ul className="flex flex-col gap-2 pt-1">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-foreground"
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No features listed for this product.
              </p>
            ),
          },
          {
            title: "Size & fit",
            content: (
              <p>
                True to size — we recommend ordering your usual size. For help
                picking, see our size guide.
              </p>
            ),
          },
          {
            title: "Shipping & returns",
            content: (
              <p>
                Free shipping on orders over $100. 30-day returns on unworn,
                tagged items. Team store orders ship on a per-drop schedule.
              </p>
            ),
          },
        ]}
      />
    </div>
  );
}
