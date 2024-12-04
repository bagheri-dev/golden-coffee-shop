import { client } from "../../client";
import { urls } from "../../urls";

const token = localStorage.getItem("accessToken");

export const fetchByIdUser = async (id : string) => {
  try {
    const response = await client.get(urls.users.byId(id) , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
