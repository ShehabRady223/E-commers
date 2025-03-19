import React, { useEffect, useState } from 'react'
import Navbar from './../Components/Navbar';
import Footer from './../Components/Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './../Components/Sidebar';
import Login from './../Components/Login';

export default function Layout() {
    const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])

    return <>
        <div className='bg-gray-50 min-h-screen'>
            {token === '' ? <Login settoken={settoken} /> : <>
                <Navbar settoken={settoken} />
                <hr />
                <div className='flex w-full'>
                    <Sidebar />
                    <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                        <Outlet />
                    </div>
                </div>
            </>
            }
        </div>
    </>
}