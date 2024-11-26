import Image from "next/image";
import Link from "next/link";

const PageNotFound = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center">
                <div>
                    <Image src={"/images/404-coffee-not-found.png"} alt="404-coffee-not-found" width={500} height={500} />
                </div>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <h1 className="text-3xl font-bold">
                        متاسفانه صفحه مورد نظر یافت نشد
                    </h1>
                    <button className="px-4 py-2 bg-brown-900 rounded-lg">
                        <Link className="text-white" href={"/"}>بازگشت به صفحه اصلی</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;