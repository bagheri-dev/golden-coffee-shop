"use client"
import { fetchProductById } from '@/apis/services/products/products.services';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { CiBoxes } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";


const ProductPage = () => {
    const { id } = useParams();
    const validId = id as string;
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData', id],
        queryFn: async () => await fetchProductById(validId),
    })

    if (isPending) {
        return (
            <div className="container">
                <div className="flex justify-between flex-wrap md:mt-10">
                    <div className="p-5 rounded-lg border border-brown-100">
                        <Skeleton className="w-[427px] h-[427px] rounded-lg" />
                    </div>

                    <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <div className="flex items-center gap-x-10">
                            <Skeleton className="h-6 w-48" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mt-8">
                                <div className="flex items-center gap-x-1">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <Skeleton className="h-4 w-10" />
                                </div>
                            </div>
                            <div className="flex items-center gap-x-5 mt-8">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col gap-y-4 border rounded-lg dark:border-gray-500 p-5">
                            <Skeleton className="h-8 w-32" />
                            <div className="flex items-center justify-between border rounded-lg px-6 py-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="h-6 w-8" />
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </div>
                            <div className="flex justify-center">
                                <Skeleton className="h-10 w-40" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-x-5 mt-10">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-full" />
                </div>
            </div>
        )
    }

    if (error) return 'An error has occurred: ' + error.message
    return (
        <div className='container'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:mt-10'>
                <div className='p-5 rounded-lg border border-brown-100'>
                    <Image src={`http://localhost:8000/images/products/images/${data?.data.product.images[0]}`} alt={data?.data.product.name || "تصویر محصول"} width={427} height={427} />
                </div>
                <div>
                    <p className='text-sm'>{data?.data.product.brand}</p>
                    <div className='flex items-center gap-x-10'>
                        <h1 className='text-2xl font-DanaDemiBold'>{data?.data.product.name}</h1>
                    </div>
                    <div>
                        <div className='flex items-center justify-between mt-8'>
                            <p className='flex items-center gap-x-1'><CiBoxes className='text-4xl' />موجودی {data?.data.product.rating.count}</p>
                            <p className='flex items-center text-lg'><FaRegStar className='text-yellow-400' />{data?.data.product.rating.rate}</p>
                        </div>
                        <div className='flex items-center gap-x-5 mt-8'>
                            <p className='border-b-2 border-brown-300'>گروه :{data?.data.product.category.name}</p>
                            <p className='border-b-2 border-brown-300'>زیرگروه :{data?.data.product.subcategory.name}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-y-4 border rounded-lg dark:border-gray-500 p-5'>
                        <p className='text-4xl'>{data?.data.product.price} تومان</p>
                        <div className='flex items-center justify-between border rounded-lg px-6 py-3'>
                            <button ><FaPlus className='size-10 bg-gray-300 rounded-lg text-white' /></button>
                            <p className='text-2xl'>1</p>
                            <button><FaMinus className='size-10 bg-gray-300 rounded-lg text-white' /></button>
                        </div>
                        <div className='flex justify-center'>
                            <button className='flex items-center gap-x-1 bg-green-700 text-white py-2 px-4 rounded-lg'><IoBagHandleOutline className='size-6' />افزودن به سبد خرید</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-x-5 mt-10 flex-wrap'>
                <h2 className='flex-shrink-0 font-DanaDemiBold'>توضیحات محصول :</h2>
                <p>
                    {data?.data.product.description}
                </p>
            </div>
        </div>
    );
}

export default ProductPage;