import { create } from "zustand";
import { fetchAllProducts } from "@/apis/services/products/products.services";

interface CategoryNames {
  [key: string]: string;
}

interface ProductStore {
  products: IProduct[];
  categoryNames: CategoryNames;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  setProducts: (products: IProduct[], totalPages: number) => void;
  setCategoryNames: (categories: CategoryNames) => void;
  setCurrentPage: (page: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchProducts: (page: number) => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [],
  categoryNames: {},
  totalPages: 1,
  currentPage: 1,
  isLoading: false,
  setProducts: (products, totalPages) => set({ products, totalPages }),
  setCategoryNames: (categories) =>
    set((state) => ({
      categoryNames: { ...state.categoryNames, ...categories },
    })),
  setCurrentPage: (page) => set({ currentPage: page }),
  setIsLoading: (isLoading) => set({ isLoading }),
  fetchProducts: async (page) => {
    set({ isLoading: true });
    try {
      const response = await fetchAllProducts(page);
      set({
        products: response.data.products,
        totalPages: response.total_pages,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ isLoading: false });
    }
  },
}));

export default useProductStore;
