"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

import { FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { VscCallOutgoing } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import AppLogo from "../svgs/app-logo";
import AppLogoType from "../svgs/app-logo-type";


const Header: React.FC = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [isShopSubmenuOpen, setIsShopSubmenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newTheme = !prev;
            if (newTheme) {
                localStorage.setItem("theme", "dark");
                document.documentElement.classList.add("dark");
            } else {
                localStorage.setItem("theme", "light");
                document.documentElement.classList.remove("dark");
            }
            return newTheme;
        });
    };
    const toggleShopSubmenu = () => {
        setIsShopSubmenuOpen((prev) => !prev);
    };
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };


    return (
        <>
            <header
                className="fixed top-9 right-0 left-0 z-50 hidden md:flex items-center w-[98%] lg:w-[90%] h-24 px-5 lg:px-10 py-5 mx-auto bg-black/50 rounded-3xl backdrop-blur-[6px]"
            >
                <div className="flex items-center justify-between w-full">
                    {/*Logo & Menu*/}
                    <nav className="flex items-center gap-x-6 lg:gap-x-9 h-14">
                        {/*Logo*/}
                        <Link href="/">
                            <div className="shrink-0">
                                <AppLogo className="text-orange-300" />
                            </div></Link>
                        {/*Menu*/}
                        <ul
                            className="flex items-center gap-x-5 lg:gap-x-9 h-full text-xl text-gray-300 tracking-tightest child:leading-[56px]"
                        >
                            <li className="font-DanaMedium text-orange-200">
                                <Link href="/">صفحه اصلی</Link>
                            </li>
                            {/*Has Sub*/}
                            <li className="relative group">
                                <Link href="shop" className="group-hover:text-orange-300 transition-colors">فروشگاه</Link>
                            </li>
                            <li>
                                <Link href="dictionary">دیکشنری</Link>
                            </li>
                            <li>
                                <Link href="blogs">بلاگ</Link>
                            </li>
                            <li>
                                <Link href="about">درباره ما</Link>
                            </li>
                            <li>
                                <Link href="contact">تماس با ما</Link>
                            </li>
                        </ul>
                    </nav>
                    {/*Cart & Theme Toggle & Login Link*/}
                    <div className="flex gap-x-4 lg:gap-x-5 xl:gap-x-10 text-xl text-orange-200">
                        {/*Cart Icon & Theme Switch Btn*/}
                        <div className="flex items-center gap-x-4 lg:gap-x-5">
                            {/*Cart*/}
                            <div className="relative group">
                                {/*Cart Icon*/}
                                <Link href="cart" className="py-3 cursor-pointer flex items-center gap-x-1">
                                    <FiShoppingCart className="w-8 h-8" />
                                </Link>
                            </div>
                            {/*Theme Switch Btn*/}
                            <div className="cursor-pointer transition-all" id="toggle-theme" onClick={toggleTheme}>
                                {darkMode ? <FaMoon /> : <MdWbSunny />}
                            </div>
                        </div>
                        {/*Divide Border*/}
                        <span className="block w-px h-14 bg-white/20"></span>
                        {/*Login Link*/}
                        <Link href="/login" className="flex items-center gap-x-2.5 tracking-tightest">
                            <RxExit className="w-8 h-8" />
                            <span className="hidden xl:inline-block">ورود | ثبت‌نام</span>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="flex md:hidden items-center justify-between px-4 h-16 bg-white dark:bg-zinc-700">
                {/* Nav Icon */}
                <div onClick={toggleMenu} className="cursor-pointer">
                    {isMenuOpen ? <FaXmark className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </div>

                {/* Nav */}
                {isMenuOpen && (
                    <div className={`fixed top-0 bottom-0 right-0 w-64 min-h-screen pt-3 px-4 bg-white dark:bg-zinc-700 z-20 transition-all duration-300 ease-in-out ${isMenuOpen ? 'animate-slideIn' : 'animate-slideOut'
                        }`}>
                        {/* Nav Header */}
                        <div className="flex items-center justify-between pb-5 mb-6 border-b border-b-gray-100 dark:border-b-white/10">
                            <div className="flex gap-x-3.5">
                                <AppLogo className="text-orange-300" />
                                <AppLogoType className="text-orange-300" />
                            </div>
                            <FaXmark className="w-5 h-5 text-zinc-600 dark:text-white" onClick={toggleMenu} />
                        </div>
                        {/* Nav Menu */}
                        <div className="flex items-center bg-orange-200/20 text-orange-300 pr-2.5 mb-4 h-10 rounded-md">
                            <Link href={"/"} className="flex items-center gap-x-2">
                                <IoHomeOutline className="w-5 h-5" />
                                صفحه اصلی
                            </Link>
                        </div>
                        <ul className="child:pr-2.5 space-y-6 text-zinc-600 dark:text-white ">
                            <li className="transition-all">
                                <div className="flex items-center justify-between">
                                    <Link href={"/"} className="flex items-center gap-x-2">
                                        <MdOutlineShoppingCart className="w-5 h-5" />
                                        فروشگاه
                                    </Link>
                                    <span className={isShopSubmenuOpen ? `rotate-180` : `submenu-open-btn`} onClick={toggleShopSubmenu}>
                                        <FaChevronDown className="w-4 h-4" />
                                    </span>
                                </div>
                                {isShopSubmenuOpen && (
                                    <div className="submenu pl-6 mt-2 space-y-2">
                                        <Link href="/">
                                            لوازم و تجهیزات
                                        </Link>
                                        <Link href="/">
                                            پودر های ترکیبی
                                        </Link>
                                        <Link href="/">
                                            قهوه فوری
                                        </Link>
                                        <Link href="/">
                                            قهوه فرانسه
                                        </Link>
                                        <Link href="/">
                                            قهوه ترک
                                        </Link>
                                        <Link href="/">
                                            قهوه اسپرسو
                                        </Link>
                                    </div>
                                )}
                            </li>
                            <li>
                                <Link href={"/"} className="flex items-center gap-x-2">
                                    <IoChatboxEllipsesOutline className="w-5 h-5" />
                                    دیکشنری
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="flex items-center gap-x-2">
                                    <FiShoppingCart className="w-5 h-5" />
                                    درباره ما
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="flex items-center gap-x-2">
                                    <IoDocumentTextOutline className="w-5 h-5" />
                                    بلاگ
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="flex items-center gap-x-2">
                                    <VscCallOutgoing className="w-5 h-5" />
                                    تماس با ما
                                </Link>
                            </li>
                        </ul>
                        <div className="flex flex-col items-start gap-y-6 text-orange-300 pt-8 px-2.5 mt-8 border-t border-t-gray-100 dark:border-t-white/10">
                            <Link className="inline-flex items-center gap-x-2" href={"#"}>
                                <RxExit className="w-5 h-5" />
                                ورود | ثبت‌نام</Link>
                            <div className="cursor-pointer transition-all  inline-flex items-center gap-x-2" id="toggle-theme" onClick={toggleTheme}>
                                {darkMode ? <span className="flex items-center gap-x-2"><FaMoon className="w-5 h-5" />تم تیره</span> : <span className="flex items-center gap-x-2"><MdWbSunny className="w-5 h-5" /> تم روشن</span>}
                            </div>
                            <Link className=" inline-flex items-center gap-x-2" href={"#"}>
                                <FiShoppingCart className="w-5 h-5" />
                                سبد خرید</Link>
                        </div>
                    </div>
                )}
                {/* Logo type */}
                <div>
                    <Link href="/">
                        <AppLogoType className="text-orange-300" />
                    </Link>
                </div>
                {/* Cart Icon */}
                <div className="flex items-center gap-x-1">
                    (0)<FiShoppingCart className="w-6 h-6 text-zinc-700 dark:text-white" />
                </div>
            </div>
            {isMenuOpen && (
                <div className="overlay md:hidden fixed inset-0 w-full h-full z-10 bg-black/40" onClick={toggleMenu}></div>
            )}
        </>
    );
}

export default Header;