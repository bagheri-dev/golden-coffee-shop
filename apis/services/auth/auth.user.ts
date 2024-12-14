import { AxiosError } from "axios";
import { client } from "../../client";
import { urls } from "../../urls";
import { IAdminLogin, IAdminResponse } from "@/types/auth/adminLogin";

export const fetchUserSingup = async ({
  firstname,
  lastname,
  username,
  password,
  phoneNumber,
  address,
}: IUserSignup) => {
  try {
    const response = await client.post(urls.users.signup, {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 401) {
        throw new Error("مطمئن شوید فیلد ها درست پر شده‌اند");
      }
    }
    throw new Error("مشکلی در سیستم رخ داده است. لطفاً دوباره تلاش کنید.");
  }
};

export const fetchUserLogin = async ({
  username,
  password,
}: IAdminLogin): Promise<IAdminResponse | undefined> => {
  try {
    const response = await client.post(urls.users.login, {
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

