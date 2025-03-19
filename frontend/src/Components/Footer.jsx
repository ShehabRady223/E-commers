import React from 'react'
import { assets } from './../assets/frontend_assets/assets';

export default function Footer() {
    return <>
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div >
                    <img src={assets.logo} className='mb-5 w-32' alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem iusto assumenda quae repudiandae est dicta eveniet error beatae quam.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='felx flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div >
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='text-gray-600'>
                        <li>+20 1115547848</li>
                        <li>shehabrady72@gmail.com</li>
                        <li>contact@foreveryou.com</li>
                    </ul>
                    {/* <ul className='felx flex-col gap-1 text-gray-600'>
                        <li>+20 1115547848</li>
                        <li>shehabrady72@gmail.com</li>
                        <li>contact@foreveryou.com</li>
                    </ul> */}
                </div>
            </div>
            <div>
                <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com - All Right Reserved.</p>
            </div>
        </div>
    </>
}
