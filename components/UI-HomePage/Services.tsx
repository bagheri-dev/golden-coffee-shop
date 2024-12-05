import Coffee from "../svgs/coffee";
import CoffeeDark from "../svgs/coffeeDark";
import ExpressDelivery from "../svgs/expressDelivery";
import ExpressDeliveryDark from "../svgs/ExpressDeliveryDark";
import Pitcher from "../svgs/pitcher";
import PitcherDark from "../svgs/pitcherDark";
import Support from "../svgs/support";
import SupportDark from "../svgs/supportDark";

const Services = () => {
    return ( 
        <section className="services mb-12md:mb-36">
            <div className="container">
                <div className="flex items-center justify-between flex-wrap gap-y-11 child:w-1/2 lg:child:w-auto text-zinc-700 dark:text-white">
                    <div className="flex items-center flex-col sm:flex-row gap-x-4 gap-y-5 text-center lg:text-right">
                        <Support className="dark:hidden"/>
                        <SupportDark className="hidden dark:inline-block"/>
                        <div>
                            <h5 className="font-DanaDemiBold text-sm md:text-lg/6 mb-1 md:mb-3.5">پشتیبانی شبانه روزی</h5>
                            <span className="text-xs md:text-sm/6">7 روز هفته ، 24 ساعته</span>
                        </div>
                    </div>
                    <div className="flex items-center flex-col sm:flex-row gap-x-4 gap-y-5 text-center lg:text-right">
                        <ExpressDelivery className="dark:hidden"/>
                        <ExpressDeliveryDark className="hidden dark:inline-block"/>
                        <div>
                            <h5 className="font-DanaDemiBold text-sm md:text-lg/6 mb-1 md:mb-3.5">امکان تحویل اکسپرس</h5>
                            <span className="text-xs md:text-sm/6">ارسال بسته با سرعت باد</span>
                        </div>
                    </div>
                    <div className="flex items-center flex-col sm:flex-row gap-x-4 gap-y-5 text-center lg:text-right">
                        <Coffee className="dark:hidden"/>
                        <CoffeeDark className="hidden dark:inline-block"/>
                        <div>
                            <h5 className="font-DanaDemiBold text-sm md:text-lg/6 mb-1 md:mb-3.5">رست تخصصی</h5>
                            <span className="text-xs md:text-sm/6">تازه برشته شده و با کیفیت</span>
                        </div>
                    </div>
                    <div className="flex items-center flex-col sm:flex-row gap-x-4 gap-y-5 text-center lg:text-right">
                        <Pitcher className="dark:hidden"/>
                        <PitcherDark className="hidden dark:inline-block"/>
                        <div>
                            <h5 className="font-DanaDemiBold text-sm md:text-lg/6 mb-1 md:mb-3.5">اکسسوری قهوه</h5>
                            <span className="text-xs md:text-sm/6">وسایل و ادوات دم آوری</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default Services;