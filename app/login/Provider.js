import Image from "next/image";

function Provider({ provider, handleClick }) {
  return (
    <Image
      onClick={handleClick}
      src={`/icons/${provider}.svg`}
      alt={provider}
      className="w-6 h-6 mr-2 cursor-pointer"
      width={24}
      height={24}
    />
  );
}

export default Provider;
