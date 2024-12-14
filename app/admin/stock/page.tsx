"use client";

import { useEffect, useState } from "react";
import useProductStore from "@/store/store";
import { fetchAllProducts, fetchEditProductsStock } from "@/apis/services/products/products.services";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Stock = () => {
    const {
        products,
        currentPage,
        totalPages,
        isLoading,
        setProducts,
        setCategoryNames,
        setCurrentPage,
        setIsLoading,
    } = useProductStore();

    const [editState, setEditState] = useState<EditState>({});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [editedProducts, setEditedProducts] = useState<EditedProduct>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const productResponse = await fetchAllProducts(currentPage, 5);
                setProducts(productResponse.data.products, productResponse.total_pages);

            } catch (error) {
                console.error("خطا در دریافت اطلاعات محصولات", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, setProducts, setCategoryNames, setIsLoading]);

    const handleDoubleClick = (id: string, field: "price" | "quantity") => {
        setEditState({ id, field });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, field: string) => {
        const value = e.target.value;

        setEditedProducts((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: field === "price" || field === "quantity" ? Number(value) : value,
            },
        }));

        const updatedProducts = products.map((product) =>
            product._id === id ? { ...product, [field]: value } : product
        );
        setProducts(updatedProducts, totalPages);
    };

    const handleBlur = () => {
        setEditState({});
    };

    const handleSaveChanges = async () => {
        try {
            const updatePromises = products.map((product) => {
                const updatedProductData = {
                    price: product.price.toString(),
                    quantity: product.quantity.toString(),
                };

                return fetchEditProductsStock(product._id, updatedProductData);
            });

            await Promise.all(updatePromises);
            toast.success("تمام تغییرات با موفقیت ثبت شدند.")
        } catch (error) {
            console.error("خطا در ذخیره تغییرات:", error);
            toast.error("متاسفانه ذخیره تغییرات ثبت نشد دوباره تلاش کنید.")
        }
    };




    if (isLoading) {
        return (
            <div className="overflow-x-auto shadow-md sm:rounded-lg w-full h-screen flex flex-col items-center my-auto pt-40">
                <table className="border-2 text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400 w-[900px] max-w-[900px] rounded-lg mb-4">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="child:border-l-2 child:bg-slate-500 text-slate-200 font-DanaDemiBold">
                            <th scope="col" className="px-6 py-3">
                                <Skeleton className="h-6 w-32" />
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <Skeleton className="h-6 w-24" />
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <Skeleton className="h-6 w-24" />
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <Skeleton className="h-6 w-32" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array(5).fill(0).map((_, index) => (
                            <tr key={index} className="child:border-l-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-2 py-1 flex justify-center">
                                    <Skeleton className="h-4 w-24" />
                                </td>
                                <td className="px-2 py-1">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                                <td className="px-2 py-1">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                                <td className="px-2 py-1">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center gap-x-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-12" />
                    <Skeleton className="h-8 w-24" />
                </div>
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
                        <th scope="col" className="px-6 py-3">نام محصول</th>
                        <th scope="col" className="px-6 py-3">قیمت محصول</th>
                        <th scope="col" className="px-6 py-3">موجودی</th>
                        <th scope="col" className="px-6 py-3">
                            <button
                                className="py-2 px-4 border rounded-lg bg-blue-500 text-white"
                                onClick={handleSaveChanges}
                            >
                                ذخیره
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
                                {item.name}
                            </td>
                            <td
                                className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                onDoubleClick={() => handleDoubleClick(item._id, "price")}
                            >
                                {editState.id === item._id && editState.field === "price" ? (
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => handleInputChange(e, item._id, "price")}
                                        onBlur={handleBlur}
                                        className="w-full p-1 border rounded"
                                    />
                                ) : (
                                    `${item.price} تومان`
                                )}
                            </td>
                            <td
                                className="px-2 py-1"
                                onDoubleClick={() => handleDoubleClick(item._id, "quantity")}
                            >
                                {editState.id === item._id && editState.field === "quantity" ? (
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleInputChange(e, item._id, "quantity")}
                                        onBlur={handleBlur}
                                        className="w-full p-1 border rounded"
                                    />
                                ) : (
                                    item.quantity
                                )}
                            </td>
                            <td className="px-2 py-1">
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

export default Stock;
