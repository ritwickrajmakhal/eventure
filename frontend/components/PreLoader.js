import Image from "next/image"

const PreLoader = () => {
  return (
    <div className="flex justify-center">
        <Image className="hidden dark:block" src="/loader_dark.svg" alt="Loading..." width={100} height={100} />
        <Image className="block dark:hidden" src="/loader.svg" alt="Loading..." width={100} height={100} />
    </div>
  )
}

export default PreLoader