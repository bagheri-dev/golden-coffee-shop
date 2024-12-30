import { client } from "../../client";
import { urls } from "../../urls";

export const fetchAllOrders = async (page = 1 , limit = 5) : Promise<OrderResponse | null> => {
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

export const fetchTrueOrders = async (deliveryStatus = "true" , limit = 1000) : Promise<OrderResponse | null> => {
  try {
    const response = await client.get(urls.orders.all , {
      params : {
        limit,
        deliveryStatus
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
export const fetchFalseOrders = async (deliveryStatus = "false" , limit = 1000) : Promise<OrderResponse | null> => {
  try {
    const response = await client.get(urls.orders.all , {
      params : {
        limit,
        deliveryStatus,
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

export const fetchOrderById = async (id : string) => {
  try {
    const response = await client.get(urls.orders.byId(id))
    console.log(response.data);
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export const editOrderById = async (id : string , deliveryStatus = true) => {
  try {
    const response = await client.patch(urls.orders.byId(id) , {
      deliveryStatus,
    })
    return response.data
  } catch (error) {
    console.log(error);
  }
}