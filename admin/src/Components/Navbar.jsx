import React from 'react'
import { assets } from './../assets/assets';
import { Link } from 'react-router-dom';

export default function Navbar({ settoken }) {
    return <>
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <Link to={'/add'}><img className='w-[max(10%,130px)]' src={assets.logo} alt="" /></Link>
            {/* <img className='w-[max(10%,80px)]' src={assets.logo} alt="" /> */}
            <button onClick={() => { settoken('') }} className='bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    </>
}
