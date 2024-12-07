import { client } from "@/apis/client";
import { urls } from "@/apis/urls";

type GetAllProductsType = (
  page?: number,
  limit?: number
) => Promise<IGlobalRes<{ products: IProduct[] }>>;

export const fetchAllProducts: GetAllProductsType = async (page = 1, limit = 50) => {
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
      console.error("error:", error);
      throw new Error("خطایی رخ داده است");
    }
  }
  
};
