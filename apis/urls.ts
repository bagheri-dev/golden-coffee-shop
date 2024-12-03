export const urls = {
  admin: "/auth/login",
  products: {
    all: "/products",
    byId: (id: string) => `/products/${id}`,
  },
  categories: {
    all: "/categories",
    byId: (id: string) => `/categories/${id}`,
  },
  subcategories: {
    all: "/subcategories",
    byId: (id: string) => `/subcategories/${id}`,

  },
  orders: {
    all: "/orders",
    byId: (id: string) => `/orders/${id}`,
  },
};
