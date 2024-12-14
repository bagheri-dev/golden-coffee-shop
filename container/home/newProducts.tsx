"use client"
import { fetchAllProducts } from "@/apis/services/products/products.services";
import ProductBox from "@/components/products/ProductBox";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const NewProducts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchAllProducts(1, 8)
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message




    return (
        <section className="pt-8 md:pt-48 lg:bg-[url('/images/body-bg.png')] bg-no-repeat">
            <div className="container">
                <div className="mb-6 md:mb-12">
                    <h2 className="text-2xl md:text-5xl/[48px] font-MorabbaBold text-zinc-700 dark:text-white mb-1.5">جدیدترین محصولات</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-700 dark:text-white text-lg md:text-3xl/[48px]">فرآوری شده از دانه قهوه</span>
                        <span className="flex items-center gap-x-1 tracking-tightest text-orange-300">مشاهده همه محصولات <IoIosArrowBack className="size-5" /></span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
                    {data.data.products.map((items) => {
                        return <Link key={items._id} href={`/shop/${items._id}`}><ProductBox key={items._id} _id={items._id} name={items.name} price={items.price} images={items.images[0]} rating={{ rate: items.rating.rate, count: items.rating.count }} /></Link>
                    })}
                </div>
            </div>
        </section>
    );
}

export default NewProducts;