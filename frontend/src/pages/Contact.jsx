import React from 'react'
import Title from './../Components/Title';
import { assets } from './../assets/frontend_assets/assets';
import NewslatterBox from './../Components/NewslatterBox';

export default function Contact() {
    return <>
        <div>
            <div className='text-center text-2xl pt-10 border-t'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>
            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
                <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                    <p className='text-gray-600'>221B Baker Street <br />Marylebone, London, NW1 6XE, England</p>
                    <p className='text-gray-600'>Tel: +20 1115547848 <br />Email: shehabrady72@gamil.com</p>
                    <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
                    <p className='text-gray-600'>Learn more about our teams and job openings.</p>
                    <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
                </div>
            </div>
            <NewslatterBox />
        </div>
    </>
}
