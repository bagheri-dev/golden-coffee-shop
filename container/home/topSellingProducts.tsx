"use client"
import { fetchAllProducts } from "@/apis/services/products/products.services";
import ProductBox from "@/components/products/ProductBox";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";

const TopSellingProducts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchAllProducts(2, 8)
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <section className="mb-10 md:mb-20">
            <div className="container">
                <div className="mb-6 md:mb-12">
                    <h2 className="text-2xl md:text-5xl/[48px] font-MorabbaBold text-zinc-700 dark:text-white mb-1.5">محصولات پر فروش</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-700 dark:text-white text-lg md:text-3xl/[48px]">پیشنهاد قهوه خور ها ...</span>
                        <span className="flex items-center gap-x-1 tracking-tightest text-orange-300">مشاهده همه محصولات <IoIosArrowBack className="size-5" /></span>
                    </div>
                </div>
                <div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 10 },
                            480: { slidesPerView: 2, spaceBetween: 15 },
                            768: { slidesPerView: 3, spaceBetween: 20 },
                            1024: { slidesPerView: 4, spaceBetween: 30 },
                        }}
                        className="mySwiper"
                    >
                        {data.data.products.map((items) => {
                            return <SwiperSlide key={items._id}><Link href={`/shop/${items._id}`}><ProductBox key={items._id} _id={items._id} name={items.name} price={items.price} images={items.images[0]} rating={{ rate: items.rating.rate, count: items.rating.count }} /></Link></SwiperSlide>
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default TopSellingProducts;