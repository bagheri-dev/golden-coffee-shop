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
import { useEffect, useState } from "react";
import useProductStore from "@/store/store";
import { getAllCategories, getAllSubcategories } from "@/apis/services/categories/categories";
import { ISubcategory } from "@/types/categories/categories";


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
    const [filteredSubcategories, setFilteredSubcategories] = useState<ISubcategory[]>([]);

    const { data: category } = useQuery({
        queryKey: ['repoDataCat'],
        queryFn: () => getAllCategories()
    })
    const { data: subcategory } = useQuery({
        queryKey: ['repoDataSub'],
        queryFn: () => getAllSubcategories()
    })

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
            const selectedCategoryId = data.data.product.category._id;
            const filtered = subcategory?.data.subcategories.filter(
                (sub) => sub.category === selectedCategoryId
            );
            setFilteredSubcategories(filtered || []);
        }
    }, [data, form, subcategory]);

    if (isPending) return 'در حال بارگذاری...'

    if (error) return 'An error has occurred: ' + error.message

    const onSubmit = async (data: IAddProduct) => {
        try {
            await fetchEditProducts(productId, data);
            toast.success("محصول با موفقیت ویرایش شد");
            const updatedProduct = {
                _id: productId,
                name: data.name,
                category: data.category,
                subcategory: data.subcategory,
                brand: data.brand,
                quantity: parseInt(data.quantity),
                price: parseFloat(data.price),
                description: data.description,
                images: data.images
            };

            useProductStore.getState().updateProduct(updatedProduct);

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
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    const selectedCategoryId = value;
                                                    const filtered = subcategory?.data.subcategories.filter(
                                                        (sub) => sub.category === selectedCategoryId
                                                    );
                                                    setFilteredSubcategories(filtered || []);
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="گروه" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {category?.data.categories.map((option) => (
                                                        <SelectItem key={option._id} value={option._id}>
                                                            {option.name}
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
                                            <Select
                                                onValueChange={(value) => field.onChange(value)}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="زیرگروه" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {filteredSubcategories.map((option) => (
                                                        <SelectItem key={option._id} value={option._id}>
                                                            {option.name}
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
