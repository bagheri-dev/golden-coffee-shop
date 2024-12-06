import { AxiosError } from "axios";
import { IAdminLogin, IAdminResponse } from "@/types/auth/adminLogin";
import { client } from "../../client";
import { urls } from "../../urls";

export const fetchLoginAdmin = async ({
  username,
  password,
}: IAdminLogin): Promise<IAdminResponse | undefined> => {
  try {
    const response = await client.post(urls.admin, {
      username: username,
      password: password,
    });
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 401) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است.");
      }
    }
    throw new Error("مشکلی در سیستم رخ داده است. لطفاً دوباره تلاش کنید.");
  }
};
