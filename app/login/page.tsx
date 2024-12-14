"use client";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
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
import Link from "next/link";
import { fetchUserLogin, fetchUserSingup } from "@/apis/services/auth/auth.user";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import useUserStore from "@/store/userStore";
import { IAdminLogin } from "@/types/auth/adminLogin";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "نام کاربری باید بیشتر از 2 کاراکتر باشد",
    }),
    password: z.string().min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" }).regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, { message: "رمز عبور باید شامل اعداد و حروف انگلیسی باشد" })
});
const formSignupSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string().min(2, {
        message: "نام کاربری باید بیشتر از 2 کاراکتر باشد",
    }),
    password: z.string().min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" }).regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, { message: "رمز عبور باید شامل اعداد و حروف انگلیسی باشد" }),
    phoneNumber: z.string().regex(/^(\+98|0)?9\d{9}$/, { message: "شماره نامعتبر است" }),
    address: z.string(),
});




const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingSignup, setIsSubmittingSignup] = useState(false);
    const [showPassword, setShowPassword] = useState("password")
    const [showPasswordSignup, setShowPasswordSignup] = useState("password");
    const { login } = useUserStore();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const formSignup = useForm<IUserSignup>({
        resolver: zodResolver(formSignupSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            phoneNumber: "",
            address: "",
        },
    });

    const onSubmit = async (data: IAdminLogin) => {
        setIsSubmitting(true);
        try {
            const response = await fetchUserLogin(data);
            Cookies.set("access_token", response?.token.accessToken ?? "", { expires: 1, secure: true });
            Cookies.set("refresh_token", response?.token.refreshToken ?? "", { expires: 7, secure: true });
            Cookies.set("role", response?.data.user.role ?? "");
            toast.success("ورود موفقیت‌آمیز بود!");
            login(response?.data?.user?.lastname || "نام کاربری ناشناس");
            setTimeout(() => {
                redirect("/")
            }, 1000);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("خطا در ورود:", error.message);
            } else {
                console.error("خطای ناشناخته");
            }
        } finally {
            setIsSubmittingSignup(false);
        }
        setIsSubmitting(false)
    };
    const onSubmitSignup = async (data: IUserSignup) => {
        setIsSubmittingSignup(true);
        try {
            const response = await fetchUserSingup(data);
            Cookies.set("access_token", response?.token.accessToken ?? "", { expires: 1, secure: true });
            Cookies.set("refresh_token", response?.token.refreshToken ?? "", { expires: 7, secure: true });
            Cookies.set("role", response?.data.user.role ?? "");
            toast.success("ثبت‌نام موفقیت‌آمیز بود!");
            login(response?.data?.user?.lastname || "نام کاربری ناشناس");
            setTimeout(() => {
                redirect("/")
            }, 1000);

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("خطا در ورود:", error.message);
            } else {
                console.error("خطای ناشناخته");
            }
        } finally {
            setIsSubmittingSignup(false);
        }
    };
    return (
        <div className="">
            <div className="w-full h-screen bg-[url('/images/bg/bg-login2.webp')] bg-center bg-cover flex justify-center items-center">
                <Tabs defaultValue="account" className="w-[400px] direction-rtl">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">ورود</TabsTrigger>
                        <TabsTrigger value="password">ثبت نام</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] max-w-[400px] backdrop-blur-3xl text-gray-200 flex flex-col justify-center py-4 px-8 space-y-8 rounded-lg md:mx-0 shadow-[inset_0px_2px_4px_0px_rgba(0,_0,_0,_0.3)]">
                                <div className="flex flex-col justify-center items-center gap-y-3">
                                    <div className="flex items-center gap-x-3">
                                        <Logo />
                                        <LogoType />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-MorabbaBold">ورود به سایت</h1>
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
                                    <button className="bg-brown-900 py-1 px-2 rounded-lg text-gray-200 text-sm font-semibold">
                                        <Link className="flex items-center gap-x-1" href="/">
                                            <IoHomeOutline className="size-5" />صفحه اصلی
                                        </Link>
                                    </button>
                                </div>
                            </form>
                        </Form>
                    </TabsContent>
                    <TabsContent value="password">
                        <Form {...formSignup}>
                            <form onSubmit={formSignup.handleSubmit(onSubmitSignup)} className="w-[400px] max-w-[400px] backdrop-blur-3xl text-gray-200 flex flex-col justify-center py-4 px-8 space-y-5 rounded-lg md:mx-0 shadow-[inset_0px_2px_4px_0px_rgba(0,_0,_0,_0.3)]">
                                <div className="flex flex-col justify-center items-center gap-y-3">
                                    <div className="flex items-center gap-x-3">
                                        <Logo />
                                        <LogoType />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-MorabbaBold">ثبت نام در سایت</h1>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <FormField
                                        control={formSignup.control}
                                        name="firstname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-x-1">
                                                    <FaUserTie />
                                                    نام
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formSignup.control}
                                        name="lastname"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-x-1">
                                                    <FaUserTie />
                                                    خانوادگی
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={formSignup.control}
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
                                    control={formSignup.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-x-2">
                                                رمز عبور
                                                <div onClick={() => setShowPasswordSignup(prev => prev === "password" ? "text" : "password")}><FaRegEye /></div></FormLabel>
                                            <FormControl>
                                                <Input {...field} type={showPasswordSignup} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formSignup.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-x-1">
                                                <FaUserTie />
                                                شماره تماس
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formSignup.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-x-1">
                                                <FaUserTie />
                                                آدرس
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className={`${isSubmittingSignup ? "bg-brown-300" : "bg-brown-900 text-lgh hover:bg-brown-600"}`}
                                    type="submit"
                                    disabled={isSubmittingSignup}>
                                    {isSubmittingSignup ? "در حال ثبت نام..." : "ثبت نام"}
                                </Button>
                            </form>
                        </Form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Login;