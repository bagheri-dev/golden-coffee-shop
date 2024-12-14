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
    { value: "675c7cdec82fb2db41170299", label: "قهوه اسپرسو" },
    { value: "675c7d1cc82fb2db411702b1", label: "قهوه ترک" },
    { value: "675c7d26c82fb2db411702b5", label: "قهوه فرانسه" },
    { value: "675c7d10c82fb2db411702ad", label: "قهوه فوری" },
    { value: "675c7d04c82fb2db411702a5", label: "پودر های ترکیبی" },
    { value: "675c7cf4c82fb2db4117029f", label: "لوازم و تجهیزات" }
];
const optionsSubcategory = [
    { value: "675c7dc0c82fb2db411702c6", label: "پودر اسپرسو" },
    { value: "675c7db6c82fb2db411702c2", label: "دانه اسپرسو" },
    { value: "675c7ef0c82fb2db411702ea", label: "کاپوچینو" },
    { value: "675c7ee1c82fb2db411702e6", label: "کافی میکس" },
    { value: "675c8127c82fb2db41170306", label: "چای لاته کاراملی" },
    { value: "675c7eacc82fb2db411702de", label: "شکلات داغ" },
    { value: "675c7e9bc82fb2db411702da", label: "چای ماسالا" },
    { value: "675c7e44c82fb2db411702d2", label: "پوشاک" },
    { value: "675c7e4cc82fb2db411702d6", label: "لوازم" },
    { value: "675c7f5fc82fb2db411702f6", label: "قهوه فرانسه گرمی" },
    { value: "675c7f68c82fb2db411702fa", label: "قهوه فرانسه ساشه‌ای" },
    { value: "675c7f22c82fb2db411702ee", label: "قهوه ترک گرمی" },
    { value: "675c7f33c82fb2db411702f2", label: "قهوه ترک ساشه‌ای" }
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
