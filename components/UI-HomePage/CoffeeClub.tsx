import Image from "next/image";
import Activity from "../svgs/activity";
import Discovery from "../svgs/discovery";
import TicketStar from "../svgs/ticketStar";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";

const CoffeeClub = () => {
    return (
        <section className="mb-8 md:mb-20">
            <div className="container">
                <div className="flex items-center flex-wrap lg:flex-nowrap lg:gap-x-4 xl:gap-x-24 gap-y-9 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-8 lg:py-0 px-3 lg:px-5 xl:px-11 xl:h-36 rounded-2xl">
                    <div className="flex items-center md:shrink-0 gap-x-3 lg:gap-x-4 xl:gap-x-6">
                        <Image src={"/images/club/diamond.png"} alt="diamond" width={110} height={98} className="w-[87px] lg:w-[100px] xl:w-[110px]" />
                        <div>
                            <h4 className="font-MorabbaBold text-2xl md:text-5xl mb-2">کافی کلاب</h4>
                            <p className="font-MorabbaLight text-lg md:text-2xl">میدونستی میتونی با امتیاز هات قهوه بگیری ؟</p>
                        </div>
                    </div>
                    <div className="flex gap-x-3 flex-wrap md:justify-between  w-full">
                        <div className="flex items-center gap-x-2 lg:gap-x-3 xl:gap-x-5 mb-9 sm:mb-0">
                            <div className="size-[72px] md:size-[98px] text-emerald-600 bg-white py-1.5 text-center  md:pt-5 md:pb-1 rounded-2xl">
                                <Activity className="size-10 md:size-12 mb-1 md:mb-1.5 mx-auto" />
                                <span className="text-xs md:text-sm">چرخ و بخت</span>
                            </div>
                            <div className="size-[72px] md:size-[98px] text-emerald-600 bg-white py-1.5 text-center  md:pt-5 md:pb-1 rounded-2xl">
                                <Discovery className="size-10 md:size-12 mb-1 md:mb-1.5 mx-auto" />
                                <span className="text-xs md:text-sm">ماموریت ها</span>
                            </div>
                            <div className="size-[72px] md:size-[98px] text-emerald-600 bg-white py-1.5 text-center  md:pt-5 md:pb-1 rounded-2xl">
                                <TicketStar className="size-10 md:size-12 mb-1 md:mb-1.5 mx-auto" />
                                <span className="text-xs md:text-sm">جایزه ها</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="md:mb-1 font-DanaDemiBold text-2xl md:text-3xl">542</span>
                            <span className="text-xs md:text-sm">امتیـــــــاز شما</span>
                            <Link href="#" className="flex justify-center items-center mt-1 md:mt-2 sm:w-[120px] h-[26px] md:h-8 bg-gradient-to-r from-orange-200 to-orange-300 font-DanaMedium text-sm md:text-sm rounded-full">
                                دریافت جایزه
                                <FaAngleLeft className="size-5 md:size-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CoffeeClub;