"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useUserStore from "@/store/userStore"
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import useCartStore from "@/store/cart"
import ProductBoxCartHeader from "@/components/header/ProductBoxCartHeader"
import Link from "next/link"

const formSchema = z.object({
    firstname: z.string({ message: "فیلد" }).min(2, {
        message: "نام باید بیشتر از 3 کاراکتر باشه",
    }),
    lastname: z.string().min(2, {
        message: "نام خانوادگی باید بیشتر از 3 کاراکتر باشه",
    }),
    phoneNumber: z.string().regex(/^(\+98|0)?9\d{9}$/, { message: "شماره نامعتبر است" }),
    address: z.string(),
    date: z.string().min(1, { message: "لطفا تاریخ را وارد نمایید." }),
})


// FC
const UserInfo = () => {
    const items = useCartStore((state) => state.items);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const [date, setDate] = React.useState<Date>()
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
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <div className="container">
            <div>
                <span className="font-MorabbaBold inline-block text-xl py-2 border-b-2">نهایی کردن خرید</span>
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
                                                        {date ? format(date, "PPP") : <span>انتخاب تاریخ ارسال</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={(selectedDate) => {
                                                            if (selectedDate) {
                                                                setDate(selectedDate);
                                                                form.setValue("date", selectedDate.toISOString().split('T')[0]);
                                                            }
                                                        }}
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
                    <div className="pb-1 border-b border-b-gray-300 dark:border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 child:py-5">
                        {items.map((item) => {
                            return <ProductBoxCartHeader key={item.id} id={item.id} name={item.title} images={item.image} price={item.price} quantity={item.quantity} />
                        })}
                    </div>
                    <p className="text-center font-DanaDemiBold py-2">
                        مبلغ قابل پرداخت:
                        {totalPrice}
                    </p>
                    <div className="flex-center">
                        <Link href={"#"} className="flex-center w-[144px] h-10 text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl transition-all hover:bg-teal-700 tracking-tightest">پرداخت</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;