"use client"
import { redirect } from "next/navigation"
import toast from "react-hot-toast"

const Payment = () => {
    const payment = () => {
        toast.success("پرداخت شما با موفقیت انجام شد در حال انتقال به سایت...")
        redirect("/success-payment")
    }
    const cancellation = () => {
        toast.error("شما از پرداخت خود منصرف شدید در حال انتقال به سایت...")
        redirect("/error-payment")
    }
    return (
        <div className="relative w-full h-screen bg-[url('/images/payment.png')] bg-cover bg-center">
            <button onClick={payment} className="absolute bg-[#0EC497] bottom-20 right-36 px-50 py-2.5 font-bold text-white">پرداخت</button>
            <button onClick={cancellation} className="absolute bg-[#FFBB5A] bottom-20 right-[680px] px-20 py-2.5 font-bold text-white">انصراف</button>
        </div>
    );
}

export default Payment;