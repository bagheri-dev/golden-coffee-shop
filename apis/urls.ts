export const urls = {
  admin: "/auth/login",
  products: {
    add: "/products",
    all: "",
    byId: (id: string) => `/products/${id}`,
    editById: () => ``,
  },
  categories: {
    add: "/categories",
    all: "/categories",
    byId: (id: string) => `/categories/${id}`,
    editById: (id: string) => `/categories/${id}`,
    remove: (id: string) => `/categories/${id}`,
  },
  subcategories: {
    add: "/subcategories",
    all: "/subcategories",
    byId: (id: string) => `/subcategories/${id}`,
    editById: (id: string) => `/subcategories/${id}`,
    remove: (id: string) => `/subcategories/${id}`,
  },
  orders: {
    all: "/orders",
    add: "/orders",
    byId: (id: string) => `/orders/${id}`,
    edit: (id: string) => `/orders/${id}`,
    remove: (id: string) => `/orders/${id}`,
  },
};
