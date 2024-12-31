import { FaAngleDown } from "react-icons/fa";
import Curve from "../svgs/curve";

const HeroSection = () => {
    return (
        <section className="h-[200px] relative xs:h-auto xs:aspect-[2/1] md:aspect-auto bg-home-mobile md:bg-home-desktop bg-no-repeat bg-cover bg-[center_top]">
            <div className="container overflow-y-hidden relative h-full md:min-h-screen flex justify-end items-center">
                <div className="text-white">
                    <h2 className="font-MorabbaBold text-2xl md:text-6xl/[62px] mb-0.5 md:mb-2">قهوه عربیکا تانزانیا</h2>
                    <span className="font-MorabbaLighttext-xl md:text-5xl/[64px]">یک فنجان بالانس !</span>
                    <span className="w-[100px] h-px md:h-0.5 bg-orange-300 block my-3 md:my-8"></span>
                    <p className="font-Dana max-w-[201px] md:max-w-[460px] text-xs md:text-2xl">قطعا نام آشنای عربیکا را شنیده اید، عربیکا یکی از گونه های قهوه است که در نواحی مختلف کمربند قهوه کشت میشود.</p>
                </div>
                {/* Circle */}
                <div className="circle circle--main circle--lg">
                    <div className="circle circle--md">
                        <div className="circle circle--sm"></div>
                    </div>
                </div>
            </div>
            {/* Curve */}
            <Curve  className="hidden md:inline-block absolute bottom-0 right-0 left-0 mx-auto text-white dark:text-zinc-800"/>

                {/* Arrow Circle */}
                <div className="absolute bottom-0 right-0 left-0 mx-auto translate-y-2/4 hidden md:flex items-center justify-center w-[30px] h-[30px] border-2 border-orange-300 rounded-full">
                    <FaAngleDown className="size-5 text-zinc-700 dark:text-white" />
                </div>
        </section>
    );
}

export default HeroSection;