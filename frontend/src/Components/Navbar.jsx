import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

export default function Navbar() {

    const [visible, setvisible] = useState(false)
    const { setshowSearch, getCartCount, token, settoken, setcartItem } = useContext(ShopContext)
    const navigate = useNavigate()

    function logout() {
        navigate('/login')
        localStorage.removeItem('token')
        settoken('')
        setcartItem({})
    }

    return <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'> <img src={assets.logo} className='w-36' alt="" /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gary-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
            <img onClick={() => setshowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            <div className='group relative'>
                <img onClick={() => { token ? null : navigate('/login') }} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black '>My Profile</p>
                        <p onClick={()=>{navigate('/orders')}} className='cursor-pointer hover:text-black '>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black '>Logout</p>
                    </div>
                </div>}
            </div>
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                {getCartCount() ? <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[9px]'>{getCartCount()}</p> : null}
            </Link>
            <img onClick={() => { setvisible(true) }} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full ' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={() => setvisible(false)} className=' cursor-pointer flex items-center gap-4 p-3'>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                    <p> Back</p>
                </div>
                <NavLink className='py-2 pl-6 border' onClick={() => setvisible(false)} to='/'>HOME</NavLink>
                <NavLink className='py-2 pl-6 border' onClick={() => setvisible(false)} to='/collection'>COLLECTION</NavLink>
                <NavLink className='py-2 pl-6 border' onClick={() => setvisible(false)} to='/about'>ABOUT</NavLink>
                <NavLink className='py-2 pl-6 border' onClick={() => setvisible(false)} to='/contact'>CONTACT</NavLink>
            </div>
        </div>
    </div >
}
