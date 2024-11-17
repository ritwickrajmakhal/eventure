import React, { useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa";


const ToTopBtn = () => {
    const [isVisible, setisVisible] = useState(false);

    const scrollFunc=()=>{
        const winHeight= document.body.scrollTop || document.documentElement.scrollTop;
            if(winHeight>250){
                setisVisible(true);
            }
            else{
                setisVisible(false);
            }
    }
    
    useEffect(() => {
        window.addEventListener("scroll", scrollFunc) ;
        return () => window.removeEventListener("scroll", scrollFunc);
        
    }, [])
    
  return (
    <>
    {isVisible && 
        
            <div onClick={()=>{
                window.scrollTo({top:0, left:0, behavior:"smooth"});
            }}  className='text-black z-50 text-xl animate-bounce bg-lime-400 h-10 w-10 rounded-full fixed left-5 bottom-5 flex justify-center items-center'>
                <FaArrowUp/>
            </div>
    }
    </>
  )
}

export default ToTopBtn
