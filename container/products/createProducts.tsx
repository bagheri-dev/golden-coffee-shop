"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { fetchAddProduct } from "@/apis/services/products/products.services";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "نام محصول باید بیشتر از 2 کاراکتر باشد",
    }),
    category: z.string().min(1, { message: "دسته بندی محصول الزامی است" }),
    subcategory: z.string().min(1, { message: "دسته بندی محصول الزامی است" }),
    brand: z.string(),
    quantity: z.string(),
    price: z.string(),
    description: z.string(),
    images: z
        .any()
        .refine((files) => Array.isArray(files) && files.length > 0, {
            message: "حداقل یک تصویر باید انتخاب شود",
        }),
});

export function AddProduct() {
    const form = useForm<IAddProduct>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data : IAddProduct) => {
        fetchAddProduct(data)
    };





    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>افزودن محصول</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-right mt-5">اضافه کردن محصول</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-8 rounded-lg mx-2 md:mx-0">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">
                                        نام محصول
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-x-2">
                                            دسته بندی محصول
                                        </FormLabel>
                                        <FormControl>
                                            <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="گروه" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="674aa8e8f2cf95d67d5a9cd7">قهوه اسپرسو</SelectItem>
                                                    <SelectItem value="674aa92af2cf95d67d5a9cdb">قهوه ترک</SelectItem>
                                                    <SelectItem value="674aa94df2cf95d67d5a9cdf">قهوه فرانسه</SelectItem>
                                                    <SelectItem value="674aa95df2cf95d67d5a9ce3">قهوه فوری</SelectItem>
                                                    <SelectItem value="674aa97af2cf95d67d5a9ce7">پودر های ترکیبی</SelectItem>
                                                    <SelectItem value="674aa998f2cf95d67d5a9ceb">لوازم و تجهیزات</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subcategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-x-2">
                                            زیر دسته بندی محصول
                                        </FormLabel>
                                        <FormControl>
                                            <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="زیرگروه" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="674aaa1cf2cf95d67d5a9cf0">پودر اسپرسو</SelectItem>
                                                    <SelectItem value="674aaa4af2cf95d67d5a9cf4">دانه اسپرسو</SelectItem>
                                                    <SelectItem value="674aaaa5f2cf95d67d5a9cf8">کاپوچینو</SelectItem>
                                                    <SelectItem value="674aaac0f2cf95d67d5a9cfc">کافی میکس</SelectItem>
                                                    <SelectItem value="674aab44f2cf95d67d5a9d00">چای لاته کاراملی</SelectItem>
                                                    <SelectItem value="674aab58f2cf95d67d5a9d04">شکلات داغ</SelectItem>
                                                    <SelectItem value="674aab75f2cf95d67d5a9d08">چای ماسالا</SelectItem>
                                                    <SelectItem value="674c580f05681c31997d8c44">پوشاک</SelectItem>
                                                    <SelectItem value="674c582b05681c31997d8c48">لوازم</SelectItem>
                                                    <SelectItem value="674c587d05681c31997d8c4c">گرمی</SelectItem>
                                                    <SelectItem value="674c589105681c31997d8c50">ساشه‌ای</SelectItem>
                                                    <SelectItem value="674c58eb05681c31997d8c56">قهوه ترک گرمی</SelectItem>
                                                    <SelectItem value="674c58f905681c31997d8c5a">قهوه ترک ساشه‌ای</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">
                                        برند
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-x-1">
                                            قیمت
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
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-x-1">
                                            موجودی
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
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">
                                        توضیحات محصول
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className="max-h-25" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-x-1">
                                        آپلود عکس
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => field.onChange(Array.from(e.target.files || []))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">افزودن محصول</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
