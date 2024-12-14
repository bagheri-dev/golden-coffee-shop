import Image from "next/image";
import Link from "next/link";

const ProductsCategory = () => {
    return (
        <section className="mb-10 md:mb-20">
            <div className="container">
                <div className="flex items-center justify-center gap-y-6 gap-x-[29px] md:gap-[65px] flex-wrap">
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/675c7cdec82fb2db41170299"}>
                            <Image alt="category" src={"/images/categories/category1.png"} width={200} height={200} />
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">قهوه دمی و اسپرسو</span>
                        </Link>
                    </div>
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/675c7cf4c82fb2db4117029f"}>
                            <Image alt="category" src={"/images/categories/category2.png"} width={200} height={200} />
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">لوازم جانبی و تجهیزات</span>
                        </Link>
                    </div>
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/shop/675c8c0ac82fb2db41170b59"}>
                            <Image alt="category" src={"/images/categories/category3.png"} width={200} height={200} />
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">اسپرسو ساز</span>
                        </Link>
                    </div>
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/675c7d10c82fb2db411702ad"}>
                            <Image alt="category" src={"/images/categories/category4.png"} width={200} height={200} />
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">پک تستر قهوه</span>
                        </Link>
                    </div>
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/675c7d1cc82fb2db411702b1"}>
                            <Image alt="category" src={"/images/categories/category5.png"} width={200} height={200} />
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">قهوه ترک</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductsCategory;