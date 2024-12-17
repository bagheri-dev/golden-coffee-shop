"use client";
import { fetchProductById } from '@/apis/services/products/products.services';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaPlus, FaMinus, FaRegStar } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";
import toast from 'react-hot-toast';
import { useState } from 'react';
import useCartStore from '@/store/cart';
import Link from 'next/link';

interface Product {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

const ProductPage = () => {
    const { id } = useParams();
    const validId = id as string;
    const { addToCart } = useCartStore();

    // Fetch product data
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['productData', validId],
        queryFn: async () => await fetchProductById(validId),
        enabled: !!validId,
    });

    const [quantity, setQuantity] = useState(1);

    const product = data?.data.product;
    const productQuantity = product?.quantity || 0;

    // Increase quantity
    const increaseQuantity = () => {
        if (quantity < productQuantity) {
            setQuantity((prev) => prev + 1);
        } else {
            toast.error("موجودی محصول کافی نیست.");
        }
    };

    // Decrease quantity
    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    // Add to cart handler
    const handleAddToCart = () => {
        if (product) {
            const productData: Product = {
                id: product._id,
                title: product.name,
                image: product.images[0] || '',
                price: product.price,
                quantity: quantity,
            };

            addToCart(productData, quantity);
            toast.success("محصول به سبد خرید اضافه شد.");
            setQuantity(1);
        }
    };

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="container">
                {/* Loading Skeletons */}
                <Skeleton className="w-full h-[400px]" />
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="container text-center">
                <p className="text-red-500">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:mt-10">
                {/* Product Image */}
                <div className="p-5 rounded-lg border border-brown-100">
                    <Image
                        src={`http://localhost:8000/images/products/images/${product?.images?.[0] || "/default-image.jpg"}`}
                        alt={product?.name || "تصویر محصول"}
                        width={427}
                        height={427}
                    />
                </div>

                {/* Product Details */}
                <div>
                    <p className="font-DanaDemiBold text-xs border-b mb-2 pb-2">{product?.brand}</p>
                    <h1 className="text-2xl font-DanaDemiBold">{product?.name}</h1>
                    <div className="flex items-center justify-between mt-8">
                        <p className="flex items-center gap-x-1">
                            <CiBoxes className="text-4xl" /> موجودی: {product?.quantity}
                        </p>
                        <p className="flex items-center text-lg">
                            <FaRegStar className="text-yellow-400" /> {product?.rating?.rate || 0}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-5 mt-8">
                        <p className="border-b-2 border-brown-300">
                            <Link href={`/category/${product?.category._id}`}>گروه: {product?.category?.name || "نامشخص"}</Link>
                        </p>
                        <p className="border-b-2 border-brown-300">
                            زیرگروه: {product?.subcategory?.name || "نامشخص"}
                        </p>
                    </div>
                </div>

                {/* Add to Cart Section */}
                <div>
                    <div className="flex flex-col gap-y-4 border rounded-lg dark:border-gray-500 p-5">
                        <p className="text-4xl">{Number(product?.price).toLocaleString()} تومان</p>
                        <div className="flex items-center justify-between border rounded-lg px-6 py-3">
                            <button onClick={increaseQuantity}>
                                <FaPlus className="size-10 bg-gray-300 rounded-lg text-white" />
                            </button>
                            <p className="text-2xl">{quantity}</p>
                            <button onClick={decreaseQuantity}>
                                <FaMinus className="size-10 bg-gray-300 rounded-lg text-white" />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center gap-x-1 bg-green-700 text-white py-3 px-6 rounded-lg"
                        >
                            <IoBagHandleOutline className="size-6" /> افزودن به سبد خرید
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="flex gap-x-5 mt-10 flex-wrap">
                <h2 className="flex-shrink-0 font-DanaDemiBold">توضیحات محصول:</h2>
                <p>{product?.description}</p>
            </div>
        </div>
    );
};

export default ProductPage;
