import React from 'react'

const Help = () => {
    return (
        <div className='w-3/4 flex justify-between items-center m-auto mt-10 mb-10'>
            <div>
                <h1 className='text-center font-bold text-2xl mb-2'>Accomodation</h1>
                <p className='max-w-[360px] text-center text-gray-400'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo voluptates est corrupti? Debitis cupiditate, libero natus cum blanditiis eos officiis dolorem, magni eaque aliquam quod architecto dolor veritatis doloremque distinctio.</p>
            </div>
            <div className="w-96 border border-slate-700 rounded-md overflow-hidden"><img src="/accomodation.jpg" alt="image" /></div>
        </div>
    )
}

export default Help
