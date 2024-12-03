import { client } from "../../client";
import { urls } from "../../urls";

export const fetchOrders = async (): Promise<allOrders | undefined> => {
  try {
    const response = await client.get(urls.orders.all);
    console.log(response.data.data.orders);
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
