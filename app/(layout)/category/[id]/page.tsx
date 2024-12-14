"use client"

import { fetchSubcategoryByCategory } from "@/apis/services/categories/categories";
import { fetchAllProductsCategory } from "@/apis/services/products/products.services";
import ProductBox from "@/components/products/ProductBox";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";

const CategoryPage = () => {
    const [page, setPage] = useState(1);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const productsPerPage = 12;
    const { id } = useParams() as { id: string };

    const { isPending, error, data } = useQuery({
        queryKey: ['products', id, page],
        queryFn: () => fetchAllProductsCategory(page, productsPerPage, id),
    })
    const { isLoading: isSubcategoryLoading, error: subcategoryError, data: subcategory } = useQuery({
        queryKey: ['subcategory', id],
        queryFn: () => fetchSubcategoryByCategory(id),
    })

    useEffect(() => {
        console.log(selectedSubcategory);
    }, [selectedSubcategory])




    if (isPending) {
        return (
            <section>
                <div className="container">
                    <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
                        {Array.from({ length: productsPerPage }).map((_, index) => (
                            <div key={index} className="p-2">
                                <Skeleton className="h-50" />
                                <Skeleton className="mt-2 h-5" />
                                <Skeleton className="mt-1 w-25" />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-x-3 mt-4">
                        <Skeleton className="mx-2 w-25 h-10" />
                        <Skeleton className="mx-2 w-25 h-10" />
                        <Skeleton className="mx-2 w-25 h-10" />
                    </div>
                </div>
            </section>
        )
    }

    if (error) return 'An error has occurred: ' + error.message
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (data && page < data?.total_pages) setPage(page + 1);
    };

    return (
        <section>
            <div className="container">
                <div className="my-10 md:my-20">
                    <div className="flex">
                        <div className="w-1/4 p-4">
                            <h3 onClick={() => setSelectedSubcategory(null)} className="text-2xl font-semibold mb-5 border-b-2 cursor-pointer hover:text-teal-600 transition-colors">همه محصولات</h3>
                            <p className="flex items-center py-2"><CiSettings />فیلتر</p>
                            <h3 className="text-2xl font-MorabbaBold">زیر دسته‌بندی</h3>
                            {isSubcategoryLoading ? (
                                <Skeleton className="h-10" />
                            ) : subcategoryError ? (
                                <div>An error has occurred: {subcategoryError.message}</div>
                            ) : (
                                <ul className="child:text-lg py-2 child:cursor-pointer">
                                    {subcategory?.data.subcategories.map((sub) => (
                                        <li className="hover:text-teal-600 transition-colors" key={sub._id} onClick={() => setSelectedSubcategory(sub._id)}>
                                            {sub.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
                            {data?.data.products
                                .filter(item => selectedSubcategory ? item.subcategory === selectedSubcategory : true)
                                .map((items) => {
                                    return (
                                        <Link key={items._id} href={`/shop/${items._id}`}>
                                            <ProductBox
                                                key={items._id}
                                                _id={items._id}
                                                name={items.name}
                                                price={items.price}
                                                images={items.images[0]}
                                                rating={{ rate: items.rating.rate, count: items.rating.count }}
                                            />
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-3 mt-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={page === 1}
                            className="px-4 py-2 bg-brown-600 text-white rounded disabled:bg-brown-300"
                        >
                            قبلی
                        </button>
                        <span>صفحه {page}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={page === data?.total_pages}
                            className="px-4 py-2 bg-brown-600 text-white rounded disabled:bg-brown-300"
                        >
                            بعدی
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryPage;