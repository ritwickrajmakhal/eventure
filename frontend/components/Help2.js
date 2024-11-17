import Image from "next/image";

const Help2 = ({ title, description, img }) => {
  return (
    <div>
      <div className="w-3/4 flex justify-between items-center m-auto mt-16 mb-16">
        <div className="w-96 border border-slate-700 rounded-md overflow-hidden">
          <Image src={img} alt={title} width={500} height={0}/>
        </div>
        <div>
          <h1 className="text-center font-bold text-2xl mb-2">{title}</h1>
          <p className="max-w-[360px] text-center text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help2;
