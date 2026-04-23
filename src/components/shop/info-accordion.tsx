import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type Item = {
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
};

type Props = {
  items: Item[];
};

export function InfoAccordion({ items }: Props) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => (
        <details
          key={i}
          open={item.defaultOpen}
          className="group [&_summary]:list-none"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-3 py-4 text-sm font-medium text-foreground transition hover:text-foreground/80">
            <span>{item.title}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="pb-5 text-sm leading-relaxed text-foreground/80">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
