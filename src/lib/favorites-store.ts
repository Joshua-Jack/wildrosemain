import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FavoritesState = {
  ids: string[];
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      has: (productId) => get().ids.includes(productId),
      toggle: (productId) =>
        set((s) => ({
          ids: s.ids.includes(productId)
            ? s.ids.filter((id) => id !== productId)
            : [...s.ids, productId],
        })),
      remove: (productId) =>
        set((s) => ({ ids: s.ids.filter((id) => id !== productId) })),
      clear: () => set({ ids: [] }),
    }),
    {
      name: "wr-favorites",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
