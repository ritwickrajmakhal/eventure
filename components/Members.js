import Image from "next/image"

function Members({name,about,image,delay,type}) {
  return (
    <div className='text-white w-[250px] text-center' data-aos={type} data-aos-delay={delay}>
        <div>
            <Image className='h-[400px] w-[250px] rounded-[50%] object-cover' src={image}
            alt={name} width={250} height={400}
            />
        </div>
        <div className='py-8'>
            <div className='font-bold font-serif text-3xl'>{name}</div>
            <div className='py-2'>{about}</div>
        </div>
    </div>
  )
}

export default Members
