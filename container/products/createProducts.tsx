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
import toast from "react-hot-toast";

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
        try {
            fetchAddProduct(data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("متاسفانه محصول اضافه نشد.")
        }
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
                                                    <SelectItem value="675c7cdec82fb2db41170299">قهوه اسپرسو</SelectItem>
                                                    <SelectItem value="675c7d1cc82fb2db411702b1">قهوه ترک</SelectItem>
                                                    <SelectItem value="675c7d26c82fb2db411702b5">قهوه فرانسه</SelectItem>
                                                    <SelectItem value="675c7d10c82fb2db411702ad">قهوه فوری</SelectItem>
                                                    <SelectItem value="675c7d04c82fb2db411702a5">پودر های ترکیبی</SelectItem>
                                                    <SelectItem value="675c7cf4c82fb2db4117029f">لوازم و تجهیزات</SelectItem>
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
                                                    <SelectItem value="675c7dc0c82fb2db411702c6">پودر اسپرسو</SelectItem>
                                                    <SelectItem value="675c7db6c82fb2db411702c2">دانه اسپرسو</SelectItem>
                                                    <SelectItem value="675c7ef0c82fb2db411702ea">کاپوچینو</SelectItem>
                                                    <SelectItem value="675c7ee1c82fb2db411702e6">کافی میکس</SelectItem>
                                                    <SelectItem value="675c8127c82fb2db41170306">چای لاته کاراملی</SelectItem>
                                                    <SelectItem value="675c7eacc82fb2db411702de">شکلات داغ</SelectItem>
                                                    <SelectItem value="675c7e9bc82fb2db411702da">چای ماسالا</SelectItem>
                                                    <SelectItem value="675c7e44c82fb2db411702d2">پوشاک</SelectItem>
                                                    <SelectItem value="675c7e4cc82fb2db411702d6">لوازم</SelectItem>
                                                    <SelectItem value="675c7f5fc82fb2db411702f6">قهوه فرانسه گرمی</SelectItem>
                                                    <SelectItem value="675c7f68c82fb2db411702fa">قهوه فرانسه ساشه‌ای</SelectItem>
                                                    <SelectItem value="675c7f22c82fb2db411702ee">قهوه ترک گرمی</SelectItem>
                                                    <SelectItem value="675c7f33c82fb2db411702f2">قهوه ترک ساشه‌ای</SelectItem>
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
