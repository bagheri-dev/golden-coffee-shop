import { client } from "../../client";
import { urls } from "../../urls";
import Cookies from "js-cookie";


const token = Cookies.get("access_token");

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
