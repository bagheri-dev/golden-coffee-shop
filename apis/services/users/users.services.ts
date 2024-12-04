import { client } from "../../client";
import { urls } from "../../urls";

const token = localStorage.getItem("accessToken");

export const fetchAllUsers = async () => {
  try {
    const response = await client.get(urls.users.all , {
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
