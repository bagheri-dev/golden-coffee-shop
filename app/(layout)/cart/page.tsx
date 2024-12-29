"use client";

import React, { useEffect } from "react";
import RowItem from "@/components/cartItem";
import useCartStore from "@/store/cart";
import Link from "next/link";
import Image from "next/image";
import useUserStore from "@/store/userStore";
import Cookies from "js-cookie";

const CartPage = () => {
    const { items, clearCart, loadCart } = useCartStore();
    const { user } = useUserStore();
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {

        const userId = Cookies.get("userId");
        if (userId) {
            loadCart();
        }
    }, [loadCart]);

    return (
        <div className="container my-10">
            {items.length === 0 ? (
                <div className="flex-center flex-col">
                    <div>
                        <Image src="/images/empty-shopping.png" alt="سبد خرید خالی" width={500} height={500} />
                    </div>
                    <div className="flex-center flex-col gap-y-3">
                        <p className="text-lg font-DanaDemiBold">متاسفانه سبد خرید شما خالی است</p>
                        <div>
                            <Link href="/shop" className="flex-center w-[144px] h-14 text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl transition-all hover:bg-teal-700 tracking-tightest">
                                صفحه فروشگاه
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>سبد خرید</h1>
                    <div className="grid grid-cols-12 gap-3">
                        <div className="overflow-x-auto shadow-md sm:rounded-lg col-span-12 md:col-span-9">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="child:text-center">
                                        <th scope="col" className="px-16 py-3">
                                            <span className="sr-only">عکس محصول</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">محصول</th>
                                        <th scope="col" className="px-6 py-3">تعداد</th>
                                        <th scope="col" className="px-6 py-3">قیمت</th>
                                        <th scope="col" className="px-6 py-3">
                                            <button onClick={clearCart} className="text-red-600">خالی کردن</button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <RowItem key={item.id} {...item} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="sticky top-2 w-full flex flex-col gap-3 justify-between col-span-12 md:col-span-3 border-2 rounded-lg max-h-50 py-2 px-4 shadow">
                            <span className="text-sm">تعداد محصولات انتخاب شده : {items.length}</span>
                            <p className="text-center">مبلغ کل سفارش شما : {totalPrice.toLocaleString()} تومان</p>

                            <div className="flex justify-center">
                                {!user ? (
                                    <Link href="/login" className="flex-center w-[144px] h-14 text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl transition-all hover:bg-teal-700 tracking-tightest">
                                        لطفا ابتدا وارد شوید
                                    </Link>
                                ) : (
                                    <Link href="/checkout" className="flex-center w-[144px] h-14 text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl transition-all hover:bg-teal-700 tracking-tightest">
                                        ثبت سفارش
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
