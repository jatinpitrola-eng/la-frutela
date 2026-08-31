import { create } from "zustand";

export interface CartAddon {
  id: string;
  label: string;
  price: number;
}

export interface CartItem {
  key: string;
  id: string;
  name: string;
  img: string;
  unit: number;
  qty: number;
  addons: CartAddon[];
}

interface CartStore {
  items: CartItem[];
  orderOpen: boolean;
  setOrderOpen: (v: boolean) => void;
  addItem: (item: Omit<CartItem, "key">) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  orderOpen: false,
  setOrderOpen: (v) => set({ orderOpen: v }),
  addItem: (item) =>
    set((state) => {
      const sig = item.addons
        .map((a) => a.id)
        .sort()
        .join(",");
      const key = `${item.id}|${sig}`;
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.key === key ? { ...i, qty: i.qty + item.qty } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, key }] };
    }),
  removeItem: (key) =>
    set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
  clearCart: () => set({ items: [] }),
}));
