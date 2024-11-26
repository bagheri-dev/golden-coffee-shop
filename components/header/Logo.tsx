import Image from "next/image";

const Logo = () => {
    return (
        <>
            <Image
                src="/images/app-logo.png"
                alt="Golden Coffee"
                width={56}
                height={56}
            />
        </>
    );
}

export default Logo;