"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import useCartStore from "@/store/cart";
import axios from "axios";

const Payment = () => {
    const { clearCart } = useCartStore();
    const router = useRouter();
    const items = useCartStore((state) => state.items);
    const userId = Cookies.get("userId");

    const payment = async () => {
        try {
            const storedDate = localStorage.getItem("orderDate");
            console.log(storedDate);

            const orderData = {
                user: userId,
                products: items.map((item) => ({
                    product: item.id,
                    count: item.quantity,
                })),
                deliveryDate: storedDate || "",
                deliveryStatus: false,
            };

            const response = await axios.post("http://localhost:8000/api/orders", orderData);
            console.log(response);

            if (response.status === 201) {
                toast.success("پرداخت شما با موفقیت انجام شد در حال انتقال به سایت...");
                clearCart()
                router.push("/success-payment");
            } else {
                toast.error("مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.");
            }
        } catch (error) {
            console.error(error);
            toast.error("خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
        }
    };

    const cancellation = () => {
        toast.error("شما از پرداخت خود منصرف شدید در حال انتقال به سایت...");
        router.push("/error-payment");
    };

    return (
        <div className="relative w-full h-screen bg-[url('/images/payment.png')] bg-cover bg-center">
            <button
                onClick={payment}
                className="absolute bg-[#0EC497] bottom-20 right-36 px-50 py-2.5 font-bold text-white"
            >
                پرداخت
            </button>
            <button
                onClick={cancellation}
                className="absolute bg-[#FFBB5A] bottom-20 right-[680px] px-20 py-2.5 font-bold text-white"
            >
                انصراف
            </button>
        </div>
    );
};

export default Payment;
