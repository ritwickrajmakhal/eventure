import Image from "next/image";
import Link from "next/link";


function Provider({ provider, handleClick }) {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_API_URL}/api/connect/${provider}`}>
      <Image
        onClick={handleClick}
        src={`/icons/${provider}.svg`}
        alt={provider}
        className="w-6 h-6 mr-2 cursor-pointer"
        width={24}
        height={24}
      />
    </Link>
  );
}

export default Provider;
