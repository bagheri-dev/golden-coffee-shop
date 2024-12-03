"use client";

import { useEffect } from "react";
import useProductStore from "@/store/store";
import { fetchAllProducts } from "@/apis/services/products/products.services";
import { fetchAllCategories } from "@/apis/services/categories/categories";

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
            <div className="flex items-center justify-center h-screen">
                <p>در حال بارگذاری...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>هیچ محصولی یافت نشد</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg w-full h-screen flex flex-col items-center my-auto pt-40">
            <table className="border-2 text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 w-[900px] max-w-[900px] rounded-lg mb-4">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="child:border-l-2 child:bg-slate-500 text-slate-200 font-DanaDemiBold">
                        <th scope="col" className="px-6 py-3">تصویر محصول</th>
                        <th scope="col" className="px-6 py-3">نام محصول</th>
                        <th scope="col" className="px-6 py-3">دسته بندی</th>
                        <th scope="col" className="px-6 py-3">
                            <button className="border py-2 px-4 rounded-lg bg-green-400 text-black">
                                اضافه کردن محصول
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr
                            key={item._id}
                            className="child:border-l-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td className="px-2 py-1 flex justify-center">
                                <img
                                    src={`http://localhost:8000/images/products/images/${item.images[0]}`}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
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
                                    <button className="font-DanaMedium border px-4 py-2 rounded-lg text-slate-200 dark:text-blue-500 bg-slate-500">
                                        ویرایش
                                    </button>
                                    <button className="font-DanaMedium text-blue-600 dark:text-blue-500 hover:underline">
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
                    className="px-4 py-2 rounded-lg border bg-gray-200"
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                >
                    قبلی
                </button>
                <span>{`صفحه ${currentPage} از ${totalPages}`}</span>
                <button
                    className="px-4 py-2 rounded-lg border bg-gray-200"
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
