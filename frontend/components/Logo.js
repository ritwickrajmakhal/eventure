import Image from "next/image"

const Logo = () => {
    return (
        <>
            <Image
                className="mx-auto hidden dark:block"
                src="/rectangular_logo.png"
                height={0}
                width={150}
                alt="Website logo"
            />
            <Image
                className="mx-auto block dark:hidden"
                src="/rectangular_logo_light.png"
                height={0}
                width={150}
                alt="Website logo"
            />
        </>
    )
}

export default Logo