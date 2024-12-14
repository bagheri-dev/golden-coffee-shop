import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { HiArrowsRightLeft } from "react-icons/hi2";

const ProductBox = ({ _id, name, price, images, rating }: IProductBox) => {
    return (
        <div key={_id} className="p-2 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
            <div className="mb-2 md:mb-5">
                <Image src={`http://localhost:8000/images/products/images/${images}`} className="mx-auto md:w-auto" alt={name} width={260} height={260} />
            </div>
            <h5 className="font-DanaMedium h-10 md:h-14 text-sm md:text-xl text-zinc-700 dark:text-white line-clamp-2">
                {name}
            </h5>
            <div className="mt-1.5 md:mt-2.5">
                <div className="text-teal-600 dark:text-emerald-500">
                    <span className="font-DanaDemiBold text-base md:text-xl">{price}</span>
                    <span className="text-xs md:text-sm tracking-tighter">تومان</span>
                </div>
                <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-x-2.5 md:gap-x-3">
                        <span className="flex-center size-[26px] md:size-9 text-gray-400 bg-gray-100 hover:bg-teal-600 dark:bg-zinc-800 dark:hover:bg-emerald-500 hover:text-white rounded-full cursor-pointer transition-all">
                            <FiShoppingCart className="size-4 md:size-[22px]" />
                        </span>
                        <span className="text-gray-400  hover:text-teal-600 dark:hover:text-emerald-500 rounded-full cursor-pointer transition-all">
                            <HiArrowsRightLeft className="size-4 md:size-6" />
                        </span>
                    </div>
                    <div className="flex">
                        <FaRegStar  className="text-yellow-500"/>
                        {rating.rate}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductBox;