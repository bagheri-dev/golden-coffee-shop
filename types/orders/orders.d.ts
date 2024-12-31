type Order = {
  _id: string;
  user: string;
  products: {
    product: string;
    count: number;
    _id: string;
  }[];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
};

type OrderResponse = {
  status: "success";
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    orders: Order[];
  };
};

type IEditUserById = {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
};

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  rating: Rating;
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

interface OrderProduct {
  product: Product;
  count: number;
  _id: string;
}

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Order {
  _id: string;
  user: User;
  products: OrderProduct[];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  status: string;
  data: {
      order: Order;
  };
}