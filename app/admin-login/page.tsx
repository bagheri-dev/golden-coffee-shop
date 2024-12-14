"use client";

import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BiSupport } from "react-icons/bi";
import Logo from "@/components/header/Logo";
import LogoType from "@/components/header/LogoType";
import { FaUserTie } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { fetchLoginAdmin } from "@/apis/services/auth/auth.admin";
import { IAdminLogin } from "@/types/auth/adminLogin";
import { redirect } from "next/navigation";
import toast from 'react-hot-toast';
import useUserStore from "@/store/userStore";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "نام کاربری باید بیشتر از 2 کاراکتر باشد",
    }).regex(/^[A-Za-z]+$/, { message: "نام کاربری باید با حروف انگلیسی باشد." }),
    password: z.string().min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" }).regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, { message: "رمز عبور باید شامل اعداد و حروف انگلیسی باشد" })
});

const ProfileForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState("password")
    const { login } = useUserStore();

    const form = useForm<IAdminLogin>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: IAdminLogin) => {
        setIsSubmitting(true);
        try {
            const response = await fetchLoginAdmin({
                username: data.username,
                password: data.password,
            });

            if (response && response.status === "success") {
                Cookies.set("access_token", response?.token.accessToken ?? "", { expires: 1, secure: true });
                Cookies.set("refresh_token", response?.token.refreshToken ?? "", { expires: 7, secure: true });
                Cookies.set("role", response?.data.user.role ?? "");
                toast.success("ورود موفقیت‌آمیز بود! 🎉");
                login(response?.data?.user?.lastname || "نام کاربری ناشناس");

                setTimeout(() => {
                    if (response.data.user.role === "ADMIN") {
                        redirect("/admin")
                    } else {
                        redirect("/")
                    }
                }, 2000);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("خطا در ورود:", error.message);
            } else {
                console.error("خطای ناشناخته");
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div>
            <div className="w-full h-screen bg-[url('/images/bg/bg-login3.webp')] bg-cover bg-center flex justify-center items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px] max-w-[500px] bg-brown-600/60 backdrop-blur-md text-gray-200 flex flex-col justify-center py-4 px-8 space-y-8 rounded-lg mx-2 md:mx-0 shadow-[inset_0px_2px_4px_0px_rgba(0,_0,_0,_0.3)]">
                        <div className="flex flex-col justify-center items-center gap-y-3">
                            <div className="flex items-center gap-x-3">
                                <Logo />
                                <LogoType />
                            </div>
                            <div>
                                <h1 className="text-xl font-MorabbaBold">ورود به  داشبورد ادمین سایت</h1>
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">
                                        <FaUserTie />
                                        نام کاربری
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-2">
                                        رمز عبور
                                        <div onClick={() => setShowPassword(prev => prev === "password" ? "text" : "password")}><FaRegEye /></div></FormLabel>
                                    <FormControl>
                                        <Input {...field} type={showPassword} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className={`${isSubmitting ? "bg-brown-300" : "bg-brown-900 text-lgh hover:bg-brown-600"}`} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "در حال ورود..." : "ورود"}
                        </Button>
                        <div className="flex items-center justify-between">
                            <button className="bg-brown-900 py-1 px-2 rounded-lg text-gray-200 text-sm font-semibold" title="ادمین عزیز در صورت وجود هرگونه مشکل میتونی با ما تماس بگیری برای تماس کافی کلیک کنی">
                                <a className="flex items-center gap-x-1" href="mailto:bagheri.develop@gmail.com">
                                    <BiSupport className="size-5" />پشتیبانی
                                </a>
                            </button>
                            <button className="bg-brown-900 py-1 px-2 rounded-lg text-gray-200 text-sm font-semibold" title="ادمین عزیز در صورت وجود هرگونه مشکل میتونی با ما تماس بگیری برای تماس کافی کلیک کنی">
                                <a className="flex items-center gap-x-1" href="mailto:bagheri.develop@gmail.com">
                                    <IoHomeOutline className="size-5" />صفحه اصلی
                                </a>
                            </button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ProfileForm;
