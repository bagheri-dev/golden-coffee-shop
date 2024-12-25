import Image from "next/image";

const SuccessPayment = () => {
    return (
        <div>
            <div className="flex justify-center items-center">
                <Image src={"/images/cashback-financial-savings-characters-paying-online-receiving-bonus-money-reward_566886-10855-removebg-preview.png"} alt="success" width={700} height={700} />
            </div>
            <p className="text-xl font-bold text-center py-2">سفارش شما با موفقیت ثبت شد <br /> از اینکه ما را برای خرید انتخاب کردید از شما سپاس گذاریم.</p>
        </div>
    );
}

export default SuccessPayment;