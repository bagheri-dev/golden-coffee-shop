import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import Curve from "../svgs/curve";
import AppLogo from "../svgs/app-logo";
import AppLogoType from "../svgs/app-logo-type";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhone } from "react-icons/lu";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="relative bg-zinc-700 py-8 md:pb-11 md:mt-[62px]">
            <Curve className="hidden md:inline-block absolute top-0 right-0 left-0 mx-auto text-white dark:text-zinc-800 rotate-180" />
            {/* Arrow Circle */}
            <div className="absolute top-0 right-0 left-0 mx-auto -translate-y-2/4 hidden md:flex items-center justify-center w-[30px] h-[30px] border-2 border-orange-300 rounded-full rotate-180">
                <FaAngleDown className="size-5 text-zinc-700 dark:text-white" />
            </div>
            <div className="flex justify-between flex-wrap text-gray-300 sm:w-[94%] lg:w-[90%] px-4 md:px-0 mx-auto">
                <div>
                    <div className="flex mb-6 md:mb-4.5 text-gray-300">
                        <AppLogo className="h-[54px]" />
                        <AppLogoType className="h-[54px]" />
                    </div>
                    <p className="xl:max-w-[606px] text-lg md:text-xl/[48px]">ما برآنیم تا با پیشرو بودن در فرآیند تولید، نوع و کیفیت محصول، خدمات و توزیع، الگویی برای تولیدکنندگان ایرانی باشیم و به مرجع فرهنگ قهوه در ایران تبدیل شویم. می‌پنداریم که نظر مردم ایران و منطقه باید نسبت به کالای ایرانی بهبود یابد و در این راستا با اشتیاق می‌کوشیم.</p>
                </div>
                <div className="mt-10 md:mt-[26px]">
                    <h4 className="font-DanaDemiBold text-2xl text-white mb-6 md:mb-7">دسترسی سریع</h4>
                    <div className="grid grid-cols-2 gap-y-2.5 md:gap-y-5 gap-x-10 md:gap-x-16">
                        <Link href={"/"} className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                            <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                            حریم خصوصی
                        </Link>
                        <Link href={"/"} className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                            <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                            عودت کالا
                        </Link>
                        <Link href={"/"} className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                            <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                            شرایط استفاده
                        </Link>
                        <Link href={"/"} className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                            <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                            ثبت سفارش
                        </Link>
                        <Link href={"/"} className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                            <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                            پرسش های متداول
                        </Link>
                        <Link href={"/"} className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                            <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                            فرصت های شغلی
                        </Link>
                        <Link href={"/"} className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                            <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                            ضمانت نامه ها
                        </Link>
                        <Link href={"/"} className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                            <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                            ارتباط با ما
                        </Link>
                    </div>
                </div>
                <div className="mt-10 md:mt-[26px]">
                    <h4 className="font-DanaDemiBold text-2xl text-white mb-6 md:mb-7">در تماس باشیم</h4>
                    <div className="md:text-xl mb-6 md:mb-10">
                        <div className=" md:text-xl">
                            <span className="flex items-center gap-x-2 md:gap-x-3 mb-4 md:mb-5">
                                <CiLocationOn className="size-5 md:size-6 shrink-0" />
                                بلوار میرداماد، خیابان البرز، کوچه قبادیان شرقی، پلاک ۳۳
                            </span>
                            <div className="flex flex-wrap gap-x-5 gap-y-4 font-DanaMedium">
                                <Link href={"/"} className="flex items-center gap-x-2 md:gap-x-3 text-orange-300">
                                    <HiOutlineMail />
                                    info@Coffee.com
                                </Link>
                                <div className="flex items-center gap-x-2 md:gap-x-3">
                                    <LuPhone />
                                    <span>0902 123 6628</span>
                                    <span>021 - 6789012</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-1.5 md:gap-x-6 direction-ltr font-DanaMedium md:text-xl">
                        <Link href={"/"} className="flex-center gap-x-2 flex-grow h-12 text-zinc-700 bg-gradient-to-r from-orange-200 to-orange-300 rounded-xl">
                            @golden_coffee
                            <PiTelegramLogoDuotone className="size-[26px] md:size-[38px]" />
                        </Link>
                        <Link href={"/"} className="flex-center gap-x-2 flex-grow h-12 border-orange-200 text-orange-200 rounded-xl">
                            @golden_coffee
                            <FaInstagram className="size-[26px] md:size-[38px]" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;