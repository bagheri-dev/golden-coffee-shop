import Image from "next/image";
import Link from "next/link";

const Category = () => {
    return (
        <section className="my-10 md:my-20">
            <div className="container">
                <div className="flex items-center justify-center gap-y-6 gap-x-[29px] md:gap-[65px] flex-wrap">
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/674aa8e8f2cf95d67d5a9cd7"}>
                            <Image alt="category" src={"/images/categories/category1.png"} width={200} height={200} />
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">قهوه اسپرسو</span>
                        </Link>
                    </div>
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/674aa998f2cf95d67d5a9ceb"}>
                            <Image alt="category" src={"/images/categories/category2.png"} width={200} height={200} />
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">لوازم جانبی و تجهیزات</span>
                        </Link>
                    </div>
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/674aa97af2cf95d67d5a9ce7"}>
                            <Image alt="category" src={"/images/categories/category7.webp"} width={200} height={200} className="rounded-full"/>
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">پودر های ترکیبی</span>
                        </Link>
                    </div>
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/674aa95df2cf95d67d5a9ce3"}>
                            <Image alt="category" src={"/images/categories/category4.png"} width={200} height={200} />
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">قهوه فوری</span>
                        </Link>
                    </div>
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/674aa92af2cf95d67d5a9cdb"}>
                            <Image alt="category" src={"/images/categories/category5.png"} width={200} height={200} />
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">قهوه ترک</span>
                        </Link>
                    </div>
                    <div className="w-25 md:w-50 text-center">
                        <Link href={"/category/674aa94df2cf95d67d5a9cdf"}>
                            <Image alt="category" src={"/images/categories/category6.webp"} width={200} height={200} className="rounded-full"/>
                            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">قهوه فرانسه</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Category;