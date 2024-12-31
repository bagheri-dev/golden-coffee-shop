import toast from "react-hot-toast";
import { create } from "zustand";
import Cookies from "js-cookie";

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
  loadCart: () => void; 
  saveCart: () => void;
}

const getUserIdFromCookies = (): string | null => {
  const userId = Cookies.get("userId");
  if (!userId) {
    toast.error("لطفا ابتدا وارد حساب کاربری خود شوید یا ثبت نام کنید.");
    return null;
  }
  return userId;
};

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product: Product, quantity: number) => {
    const state = get();
    const existingItem = state.items.find((item) => item.id === product.id);

    if (existingItem) {
      toast.error("این محصول قبلاً به سبد خرید اضافه شده است.");
      return;
    }

    if (quantity > product.stock) {
      toast.error("مقدار درخواستی بیشتر از موجودی انبار است.");
      return;
    }

    toast.success("محصول با موفقیت به سبد خرید اضافه شد.");
    set({
      items: [...state.items, { ...product, quantity }],
    });

    state.saveCart();
  },
  removeFromCart: (productId: string) => {
    const state = get();
    set({
      items: state.items.filter((item) => item.id !== productId),
    });

    state.saveCart();
  },
  updateQuantity: (productId: string, quantity: number) => {
    const state = get();
    set({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });

    state.saveCart();
  },
  clearCart: () => {
    set({ items: [] });
    const state = get();
    state.saveCart();
  },
  loadCart: async () => {
    const userId = getUserIdFromCookies();
    if (!userId) return;

    try {
      const response = await fetch(`/api/cart?userId=${userId}`);
      if (!response.ok) throw new Error("خطا در بارگذاری سبد خرید");
      const data = await response.json();
      set({ items: data.cart });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  },
  saveCart: async () => {
    const userId = getUserIdFromCookies();
    if (!userId) return;

    const state = get();
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          cart: state.items,
        }),
      });

      if (!response.ok) throw new Error("خطا در ذخیره سبد خرید");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  },
}));

export default useCartStore;