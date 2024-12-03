type productsOrder = {
  product: {
    _id: string;
    price: number;
  };
  count: number;
  _id: string;
};
interface newOrder {
  status: string;
  data: {
    order: {
      user: string;
      products: Array<productsOrder>;
      totalPrice: number;
      deliveryDate: string;
      deliveryStatus: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

type order = {
    _id: string;
        user: string;
        products: [
          {
            product: string;
            count: number;
            _id: string;
          }
        ];
        totalPrice: number;
        deliveryDate: string;
        deliveryStatus: boolean;
        createdAt: string;
        updatedAt: string;
}

interface allOrders {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    orders: Array<order>;
  };
}
