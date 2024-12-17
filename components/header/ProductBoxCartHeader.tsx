import { IProductBoxCart } from "@/types/products/catr";
import Image from "next/image";

const ProductBoxCartHeader = ({ id, name, images, price, quantity }: IProductBoxCart) => {
    return (
        <div key={id} className="flex gap-x-1 md:gap-x-2.5">
            <Image src={`http://localhost:8000/images/products/images/${images}`} alt={name} width={90} height={90} className="md:size-[120px]" />
            <div className="flex flex-col justify-between gap-y-1.5 md:gap-y-0">
                <h4 className="font-DanaMedium text-zinc-700 dark:text-white text-sm md:text-base line-clamp-2">{name}</h4>
                <span className="text-sm text-teal-600 font-DanaDemiBold">تعداد : {quantity}</span>
                <div className="text-zinc-700 dark:text-white font-DanaDemiBold">
                    {Number(price).toLocaleString()}
                    <span className="font-Dana text-xs md:text-sm">تومان</span>
                </div>
            </div>
        </div>
    );
}

export default ProductBoxCartHeader;