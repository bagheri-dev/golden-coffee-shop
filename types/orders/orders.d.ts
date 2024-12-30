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
