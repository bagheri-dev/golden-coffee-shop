"use client"

import React from "react";

import RowItem from "@/components/cartItem";
import useCartStore from "@/store/cart";
import Link from "next/link";
import Image from "next/image";

const CartPage = () => {
    const { items, clearCart } = useCartStore();
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);




    return (
        <div className="container my-10">
            {items.length === 0 ? (
                <div className="flex-center flex-col">
                    <div>
                        <Image src={"/images/empty-shopping.png"} alt="سبد خرید خالی" width={500} height={500} />
                    </div>
                    <div className="flex-center flex-col gap-y-3">
                        <p className="text-lg font-DanaDemiBold">متاسفانه سبد خرید شما خالی است</p>
                        <div>
                        <Link href={"/shop"} className="flex-center w-[144px] h-14 text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl transition-all hover:bg-teal-700 tracking-tightest">صفحه فروشگاه</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <h1>سبد خرید</h1>
                    <div className="grid grid-cols-12 gap-3">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg col-span-12 md:col-span-9">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="child:text-center">
                                        <th scope="col" className="px-16 py-3">
                                            <span className="sr-only">عکس محصول</span>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            محصول
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            تعداد
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            قیمت
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <button onClick={clearCart}> خالی کردن  </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <RowItem key={item.id} id={item.id} image={item.image} price={item.price} quantity={item.quantity} title={item.title} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-full flex flex-col gap-3 justify-between col-span-12 md:col-span-3 border-2 rounded-lg max-h-50 py-2 px-4 shadow">
                            <span className="text-sm">تعداد محصولات انتخاب شده : {items.length}</span>
                            <p className="text-center">مبلغ کل سفارش شما : {Number(totalPrice).toLocaleString()} تومان</p>

                            <div className="flex justify-center">
                                <Link href={"#"} className="flex-center w-[144px] h-14 text-white bg-teal-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl transition-all hover:bg-teal-700 tracking-tightest">ثبت سفارش</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;

