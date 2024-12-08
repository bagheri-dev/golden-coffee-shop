interface IProduct {
  rating: {
    rate: number;
    count: number;
  };
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
}
interface ICategory {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

interface IAddProduct {
  name: string;
  brand: string;
  description: string;
  quantity: string;
  images: File[];
  subcategory: string;
  category: string;
  price: string;
}

interface IProductBox {
  _id: string;
  name: string;
  price: number;
  images: string;
  rating: {
    rate: number;
    count: number;
  };
}
