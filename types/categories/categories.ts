export interface ICategories {
  status: string;
  data: {
    category: {
      name: string;
      icon: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      slugname: string;
      __v: number;
    };
  };
}

export interface IAllCategories {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    categories: [
      {
        _id: string;
        name: string;
        icon: string;
        createdAt: string;
        updatedAt: string;
        slugname: string;
      }
    ];
  };
}
