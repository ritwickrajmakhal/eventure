import Image from "next/image"

function Card2({eventImage, eventName}) {
  return (
    <div>
        <div className='relative h-[250px] flex justify-center w-[250px]'>
            <Image src={eventImage} className='h-[250px] absolute w-[250px] hover:opacity-40 hover:border-2 border-black transition-all' 
            alt={eventName} width={250} height={250}
            ></Image>
            <div className='absolute bottom-5 text-xl font-serif text-white -z-10 hover:z-50 transition-all'>{eventName}</div>
        </div>
    </div>
  )
}

export default Card2
