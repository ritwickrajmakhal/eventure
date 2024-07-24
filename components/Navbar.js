import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <div className='h-11 text-white bg-slate-700'>
                <div className='flex justify-between items-center ml-2'>
                    <ul className='flex gap-7'>
                        <li className='font-bold text-xl hover:cursor-pointer'>
                        <Link href="/">Eventure</Link>
                        </li>
                        <li className='text-slate-300 hover:cursor-pointer ml-5'>
                            <Link href="/aboutUs">About us</Link>
                        </li>
                        <li className='text-slate-300 hover:cursor-pointer'>
                            <Link href="/ContactUs">Contact us</Link>
                        </li>
                        <li className='text-slate-300 hover:cursor-pointer'>
                            <Link href="/enents">Events</Link>
                        </li>
                        <li className='text-slate-300 hover:cursor-pointer'>
                            <Link href="/services">Services</Link>
                        </li>
                    </ul>
                    <div className=''>
                        <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><Link href="/login">Login</Link></button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
