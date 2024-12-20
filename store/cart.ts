import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

interface CartState {
  items: Product[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product: Product, quantity: number) =>
        set((state: CartState) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            toast.error("این محصول قبلاً به سبد خرید اضافه شده است.");
            return state;
          }

          if (quantity > product.stock) {
            toast.error("مقدار درخواستی بیشتر از موجودی انبار است.");
            return state;
          }

          toast.success("محصول با موفقیت به سبد خرید اضافه شد.");
          return {
            items: [...state.items, { ...product, quantity }],
          };
        }),
      removeFromCart: (productId) =>
        set((state: CartState) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state: CartState) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
