import Image from "next/image";

const LogoType = () => {
    return (
        <>
            <Image
                src="/images/svgs/app-logo-type.svg"
                alt="app logo type"
                width={100}
                height={40}
                className="text-orange-300"
            />
        </>
    );
}

export default LogoType;