import { client } from "../../client";
import { urls } from "../../urls";

export const fetchOrders = async (page = 1 , limit = 5) : Promise<OrderResponse | null> => {
  try {
    const response = await client.get(urls.orders.all , {
      params : {
        page,
        limit,
      }
    });
    console.log(response.data.data.orders);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fetch Orders Error:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return null;
  }
};
