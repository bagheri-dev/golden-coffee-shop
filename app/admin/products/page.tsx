"use client";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import { fetchAllProducts, fetchRemoveProduct } from "@/apis/services/products/products.services";
import useProductStore from "@/store/store";
import { fetchAllCategories } from "@/apis/services/categories/categories";
import { AddProduct } from "@/container/products/createProducts";
import { EditProduct } from "@/container/products/editProduct";
import toast from "react-hot-toast";

const Products = () => {
    const {
        products,
        categoryNames,
        currentPage,
        totalPages,
        isLoading,
        setProducts,
        setCategoryNames,
        setCurrentPage,
        setIsLoading,
    } = useProductStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const productResponse = await fetchAllProducts(currentPage, 5);
                setProducts(productResponse.data.products, productResponse.total_pages);

                const categoryResponse = await fetchAllCategories();
                if (categoryResponse) {
                    const categoryMap: { [key: string]: string } = {};
                    categoryResponse.forEach((category) => {
                        categoryMap[category._id] = category.name;
                    });
                    setCategoryNames(categoryMap);
                }
                console.log(productResponse, categoryResponse);
            } catch (error) {
                console.error("Error fetching products or categories:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, setProducts, setCategoryNames, setIsLoading]);

    if (isLoading) {
        return (
            <div className="overflow-x-auto shadow-md sm:rounded-lg w-full h-screen flex flex-col items-center my-auto pt-40">
                <table className="border-2 text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 w-[900px] max-w-[900px] rounded-lg mb-4">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="child:border-l-2 child:bg-brown-900 text-slate-200 font-DanaDemiBold">
                            <th scope="col" className="px-6 py-3 dark:bg-brown-300 dark:text-slate-800">تصویر محصول</th>
                            <th scope="col" className="px-6 py-3 dark:bg-brown-300 dark:text-slate-800">نام محصول</th>
                            <th scope="col" className="px-6 py-3 dark:bg-brown-300 dark:text-slate-800">دسته بندی</th>
                            <th scope="col" className="px-6 py-3 dark:bg-brown-300 dark:text-slate-800">
                                <AddProduct />
                            </th>
                        </tr>
                    </thead>
                    <tbody className="child:bg-brown-100">
                        {products.map((item) => (
                            <tr
                                key={item._id}
                                className="child:border-l-2 border-b dark:bg-brown-900 dark:text-slate-100 dark:border-gray-700"
                            >
                                <td className="px-2 py-1 flex justify-center">
                                    <Skeleton className="h-12 w-20 rounded-full" />
                                </td>
                                <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                                <td className="px-2 py-1">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                                <td className="px-2 py-1">
                                    <div className="w-full h-full flex items-center justify-center gap-x-2">
                                        <Skeleton className="px-4 py-2 rounded-lg border dark:text-black bg-brown-600 text-slate-100" />
                                        <Skeleton className="px-4 py-2 rounded-lg border dark:text-black text-slate-100" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center gap-x-2">
                    <Skeleton className="px-4 py-2 rounded-lg border dark:text-black bg-brown-600 text-slate-100" />
                    <Skeleton className="h-4 w-5" />
                    <Skeleton className="px-4 py-2 rounded-lg border dark:text-black bg-brown-600 text-slate-100" />
                </div>
            </div>
        );
    }

    if (!products) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <p>خطا در دریافت محصول</p>
            </div>
        );
    }

    const handleRemove = async (productId: string) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const response = await fetchRemoveProduct(productId)
            toast.success("🗑محصول با موفقیت پاک شد")
            setTimeout(() => {
                setProducts(products.filter(product => product._id !== productId), totalPages);
            }, 1000);
        } catch (error) {
            toast.error("This didn't work.")
            console.error('Error in handleEdit:', error);
        }
    };

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg w-full h-screen flex flex-col items-center my-auto pt-40">
            <table className="border-2 text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 w-[1000px] rounded-lg mb-4">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="child:border-l-2 child:bg-brown-900 text-slate-200 font-DanaDemiBold">
                        <th scope="col" className="px-6 py-3 dark:bg-brown-300 dark:text-slate-800">تصویر محصول</th>
                        <th scope="col" className="px-6 py-3 dark:bg-brown-300 dark:text-slate-800">نام محصول</th>
                        <th scope="col" className="px-6 py-3 dark:bg-brown-300 dark:text-slate-800">دسته بندی</th>
                        <th scope="col" className="px-6 py-3 dark:bg-brown-300 dark:text-slate-800">
                            <AddProduct />
                        </th>
                    </tr>
                </thead>
                <tbody className="child:bg-brown-100">
                    {products.map((item) => (
                        <tr
                            key={item._id}
                            className="child:border-l-2 border-b dark:bg-brown-900 dark:text-slate-100 dark:border-gray-700"
                        >
                            <td className="px-2 py-1 flex justify-center">
                                <Image
                                    key={item.images[0]}
                                    src={`http://localhost:8000/images/products/images/${item.images[0]}`}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                    width={250}
                                    height={200}
                                />
                            </td>
                            <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.name}
                            </td>
                            <td className="px-2 py-1">
                                {categoryNames[item.category] ? categoryNames[item.category] : "دسته‌بندی نامشخص"}
                            </td>
                            <td className="px-2 py-1">
                                <div className="w-full h-full flex items-center justify-center gap-x-2">
                                    <EditProduct productId={item._id} />
                                    <button onClick={() => handleRemove(item._id)} className="font-DanaMedium hover:underline dark:text-brown-300">
                                        حذف
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center gap-x-2">
                <button
                    className="px-4 py-2 rounded-lg border dark:text-black bg-brown-600 text-slate-100"
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                >
                    قبلی
                </button>
                <span>{`صفحه ${currentPage} از ${totalPages}`}</span>
                <button
                    className="px-4 py-2 rounded-lg border dark:text-black bg-brown-600 text-slate-100"
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    بعدی
                </button>
            </div>
        </div>
    );
};

export default Products;
