"use client"
import { fetchAllProducts } from "@/apis/services/products/products.services";
import ProductBox from "@/components/products/ProductBox";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

const ProductsList = () => {
    const [page, setPage] = useState(1);
    const productsPerPage = 12;

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData', page],
        queryFn: () => fetchAllProducts(page, productsPerPage),
    })

    if (isPending) {
        return (
            <section>
                <div className="container">
                    <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
                        {Array.from({ length: productsPerPage }).map((_, index) => (
                            <div key={index} className="p-2">
                                <Skeleton className="h-50"/>
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
        if (page < data.total_pages) setPage(page + 1);
    };
    return (
        <section>
            <div className="container">
                <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
                    {data.data.products.map((items) => {
                        return <Link key={items._id} href={`/shop/${items._id}`}><ProductBox key={items._id} _id={items._id} name={items.name} price={items.price} images={items.images[0]} rating={{ rate: items.rating.rate, count: items.rating.count }} /></Link>
                    })}
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
                        disabled={page === data.total_pages}
                        className="px-4 py-2 bg-brown-600 text-white rounded disabled:bg-brown-300"
                    >
                        بعدی
                    </button>
                </div>

            </div>
        </section>
    );
}

export default ProductsList;