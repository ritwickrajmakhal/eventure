
import Image from "next/image";

const Gallery = ({ img }) => {
    
    return (
        <div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <div >
                    <Image className=" rounded-lg" src={img} alt="image" width={500} height={0}/>
                </div>
            </div>

        </div>
    )
}

export default Gallery
