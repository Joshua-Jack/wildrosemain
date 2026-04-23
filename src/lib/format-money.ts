import type { Money } from "./shopify/types";

export function formatMoney(money: Money | undefined): string {
  if (!money) return "";
  const amount = Number.parseFloat(money.amount);
  if (Number.isNaN(amount)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode || "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
