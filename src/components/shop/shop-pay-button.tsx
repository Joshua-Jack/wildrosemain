"use client";

import { toast } from "sonner";

type Props = {
  disabled?: boolean;
};

export function ShopPayButton({ disabled }: Props) {
  const handleClick = () => {
    toast("Shop Pay checkout (mock)", {
      description: "Wire Shopify checkout URL here once credentials are set.",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[#5a31f4] px-5 text-sm font-semibold text-white transition hover:bg-[#4a28d0] disabled:cursor-not-allowed disabled:opacity-50"
    >
      Buy with <span className="ml-1.5 font-bold">Shop Pay</span>
    </button>
  );
}
