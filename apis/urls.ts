export const urls = {
  admin: "/auth/login",
  users : {
    all : "/users",
    byId : (id : string) => `/users/${id}`
  },
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
