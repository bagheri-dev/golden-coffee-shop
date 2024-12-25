import Image from "next/image";

const ErrorPayment = () => {
    return (
        <div>
            <div className="flex justify-center">
                <Image src={"/images/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character-vector-isolated-concept-.png"} alt="success" width={700} height={700} />
            </div>
            <p className="text-xl font-bold text-center py-2">سفارش شما لغو شد میتوانید دوباره تلاش کنید یا اگر در خرید خود شک دارید میتوانید با پشتیبانی سایت تماس حاصل فرمایید.</p>
        </div>
    );
}

export default ErrorPayment;