import { client } from "@/apis/client";
import { urls } from "@/apis/urls";

const token = localStorage.getItem("accessToken");

type GetAllProductsType = (
  page?: number,
  limit?: number
) => Promise<IGlobalRes<{ products: IProduct[] }>>;

export const fetchAllProducts: GetAllProductsType = async (
  page = 1,
  limit = 50
) => {
  try {
    const response = await client.get(urls.products.all, {
      params: {
        page,
        limit,
      },
    });

    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      throw new Error(error.message || "خطا در دریافت محصولات");
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
};

//-----------------------------------------Product By Id

export const fetchProductById = async (id: string): Promise<IProductSingle | undefined> => {
  try {
    const response = await client.get(urls.products.byId(id));
    console.log(response.data);
    return response.data;
  } catch (error : unknown) {
    console.error(error);
  }
};

//-----------------------------------------Product By Category
type GetAllProductsCategoryType = (
  page?: number,
  limit?: number,
  id?: string,
) => Promise<IGlobalRes<{ products: IProduct[] }>>;
export const fetchAllProductsCategory: GetAllProductsCategoryType = async (
  page = 1,
  limit = 50,
  id = "",
) => {
  try {
    const response = await client.get(urls.products.byCategory(id), {
      params: {
        page,
        limit,
      },
    });

    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      throw new Error(error.message || "خطا در دریافت محصولات");
    } else {
      throw new Error("خطایی رخ داده است");
    }
  }
};
// ----------------------------------------Add Products
export const fetchAddProduct = async (data: IAddProduct) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity.toString());
    formData.append("images", data.images[0]);
    formData.append("subcategory", data.subcategory);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await client.post(urls.products.all, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------Edit Products
export const fetchEditProducts = async (id: string, data: IAddProduct) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity.toString());
    formData.append("images", data.images[0]);
    formData.append("subcategory", data.subcategory);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await client.patch(urls.products.byId(id), formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit Stock
export const fetchEditProductsStock = async (id: string, updatedData: { price?: string; quantity?: string }) => {
  try {
    const formData = new FormData();
    
    // تنها مقادیر price و quantity را به formData اضافه کنید اگر مقدار داشته باشند
    if (updatedData.price !== undefined) {
      formData.append("price", updatedData.price);
    }
    if (updatedData.quantity !== undefined) {
      formData.append("quantity", updatedData.quantity);
    }
    
    // ارسال درخواست PATCH به سرور برای ویرایش اطلاعات محصول
    const response = await client.patch(urls.products.byId(id), formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// ----------------------------------------Remove Products
export const fetchRemoveProduct = async (id: string) => {
  try {
    const response = await client.delete(urls.products.byId(id));
    console.log("Product deleted:", response.data);
  } catch (error) {
    throw error;
  }
};
