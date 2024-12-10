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
import { fetchEditProducts, fetchProductById } from "@/apis/services/products/products.services";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const optionsCategory = [
    { value: "674aa8e8f2cf95d67d5a9cd7", label: "قهوه اسپرسو" },
    { value: "674aa92af2cf95d67d5a9cdb", label: "قهوه ترک" },
    { value: "674aa94df2cf95d67d5a9cdf", label: "قهوه فرانسه" },
    { value: "674aa95df2cf95d67d5a9ce3", label: "قهوه فوری" },
    { value: "674aa97af2cf95d67d5a9ce7", label: "پودر های ترکیبی" },
    { value: "674aa998f2cf95d67d5a9ceb", label: "لوازم و تجهیزات" }
];
const optionsSubcategory = [
    { value: "674aaa1cf2cf95d67d5a9cf0", label: "پودر اسپرسو" },
    { value: "674aaa4af2cf95d67d5a9cf4", label: "دانه اسپرسو" },
    { value: "674aaaa5f2cf95d67d5a9cf8", label: "کاپوچینو" },
    { value: "674aaac0f2cf95d67d5a9cfc", label: "کافی میکس" },
    { value: "674aab44f2cf95d67d5a9d00", label: "چای لاته کاراملی" },
    { value: "674aab58f2cf95d67d5a9d04", label: "شکلات داغ" },
    { value: "674aab75f2cf95d67d5a9d08", label: "چای ماسالا" },
    { value: "674c580f05681c31997d8c44", label: "پوشاک" },
    { value: "674c582b05681c31997d8c48", label: "لوازم" },
    { value: "674c587d05681c31997d8c4c", label: "قهوه فرانسه گرمی" },
    { value: "674c589105681c31997d8c50", label: "قهوه فرانسه ساشه‌ای" },
    { value: "674c58eb05681c31997d8c56", label: "قهوه ترک گرمی" },
    { value: "674c58f905681c31997d8c5a", label: "قهوه ترک ساشه‌ای" }
];


const formSchema = z.object({
    name: z.string().min(2, {
        message: "نام محصول باید بیشتر از 2 کاراکتر باشد",
    }),
    category: z.string().min(1, { message: "دسته بندی محصول الزامی است" }),
    subcategory: z.string().min(1, { message: "زیر دسته بندی محصول الزامی است" }),
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

export function EditProduct({ productId }: { productId: string }) {
    const form = useForm<IAddProduct>({
        resolver: zodResolver(formSchema),
    });

    const { isPending, error, data } = useQuery<IProductSingle | undefined>({
        queryKey: ['repoDataProduct', productId],
        queryFn: () => fetchProductById(productId)
    });


    useEffect(() => {
        if (data) {
            form.reset({
                name: data.data.product.name,
                category: data.data.product.category._id,
                subcategory: data.data.product.subcategory._id,
                brand: data.data.product.brand,
                quantity: data.data.product.quantity.toString(),
                price: data.data.product.price.toString(),
                description: data.data.product.description,
                images: data.data.product.images.length > 0 ? [data.data.product.images[0]] : []
            });
        }
    }, [data, form]);

    if (isPending) return 'در حال بارگذاری...'

    if (error) return 'An error has occurred: ' + error.message

    const onSubmit = async (data: IAddProduct) => {
        try {
            await fetchEditProducts(productId, data);
            toast.success("محصول با موفقیت ویرایش شد");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("متاسفانه در ویرایش محصول مشکلی پیش آمده است")
            toast.error("اطمینان حاصل کنید تمام فیلد ها تکمیل هستند و دوباره تلاش کنید")
        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>ویرایش</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-right mt-5">ویرایش محصول</DialogTitle>
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
                                                    {optionsCategory.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
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
                                                <SelectContent className="">
                                                    {optionsSubcategory.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
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
                            <Button type="submit">ذخیره محصول</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}
