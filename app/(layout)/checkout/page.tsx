"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import jalaali from "jalaali-js";
import Cookies from "js-cookie";
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
import useUserStore from "@/store/userStore";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import useCartStore from "@/store/cart";
import ProductBoxCartHeader from "@/components/header/ProductBoxCartHeader";
import { redirect } from "next/navigation";
import { editUserById } from "@/apis/services/auth/auth.user";
import toast from "react-hot-toast";

const formSchema = z.object({
    firstname: z.string({ message: "فیلد" }).min(2, {
        message: "نام باید بیشتر از 3 کاراکتر باشد",
    }),
    lastname: z.string().min(2, {
        message: "نام خانوادگی باید بیشتر از 3 کاراکتر باشد",
    }),
    phoneNumber: z.string().regex(/^\(\+98|0\)?9\d{9}$/, { message: "شماره نامعتبر است" }),
    address: z.string(),
    date: z.string().min(1, { message: "لطفاً تاریخ را وارد نمایید." }),
});

const UserInfo = () => {
    const userId = Cookies.get("userId");
    const items = useCartStore((state) => state.items);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const [date, setDate] = React.useState<Date>();
    const [jalaliDate, setJalaliDate] = React.useState<string>("");
    const userDetails = useUserStore((state) => state.userDetails);
    const store = useUserStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: userDetails?.firstname || "",
            lastname: store.user || "",
            phoneNumber: userDetails?.phoneNumber || "",
            address: userDetails?.address || "",
            date: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const gregorianDate = date?.toISOString();
            console.log({ ...values, date: gregorianDate });

            if (gregorianDate) {
                localStorage.setItem("orderDate", gregorianDate);
            }

            if (!userId) {
                console.error("User ID is undefined. Cannot proceed with editing the user.");
                return;
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { date: _, ...filteredValues } = values;

            console.log("Filtered Values:", filteredValues);
            editUserById(userId, filteredValues);
            toast.success("در حال انتقال به صفحه پرداخت...")
            setTimeout(() => {
                redirect("/payment")
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error("خطایی رخ داده است مجدد تلاش کنید")
        }
    }

    const handleDateChange = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
            const { jy, jm, jd } = jalaali.toJalaali(selectedDate);
            setJalaliDate(`${jy}/${jm}/${jd}`);
            form.setValue("date", selectedDate.toISOString());
        }
    };

    return (
        <div className="container">
            <div>
                <span className="font-MorabbaBold inline-block text-xl py-2 border-b-2">
                    نهایی کردن خرید
                </span>
            </div>
            <div className="flex gap-5 justify-between py-4">
                <div className="w-2/3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex justify-between gap-3">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>نام</FormLabel>
                                            <FormControl>
                                                <Input placeholder="نام" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>نام خانوادگی</FormLabel>
                                            <FormControl>
                                                <Input placeholder="نام خانوادگی" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>تلفن همراه</FormLabel>
                                            <FormControl>
                                                <Input placeholder="تلفن همراه" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>آدرس</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="آدرس" {...field} className="max-h-25" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="date"
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    render={({ field }) => (
                                        <FormItem>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[280px] justify-start text-left font-normal",
                                                            !date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {jalaliDate || "انتخاب تاریخ ارسال"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={handleDateChange}
                                                        initialFocus
                                                        disabled={(date) => date < new Date()}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit">ثبت سفارش</Button>
                        </form>
                    </Form>
                </div>
                <div className="w-1/3">
                    <p className="text-xl font-MorabbaBold">فاکتور</p>
                    <div className="max-h-[450px] overflow-y-auto pb-1 border-b border-b-gray-300 dark:border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 child:py-5">
                        {items.map((item) => {
                            return (
                                <ProductBoxCartHeader
                                    key={item.id}
                                    id={item.id}
                                    name={item.title}
                                    images={item.image}
                                    price={item.price}
                                    quantity={item.quantity}
                                />
                            );
                        })}
                    </div>
                    <p className="text-center font-DanaDemiBold py-4 border-b-2 border-teal-400">
                        مبلغ قابل پرداخت:
                        {totalPrice}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
