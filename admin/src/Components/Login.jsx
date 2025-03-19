import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

export default function Login({ settoken }) {
    const [email, setemail] = useState('imnot@admin.com')
    const [password, setpassword] = useState('qwer1234')

    async function onSubmitHandeler(e) {
        try {
            e.preventDefault()
            const res = await axios.post(backendUrl + 'api/user/admin', { email, password })
            if (res.data.success) {
                settoken(res.data.token)
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return <>
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold mb-4 text-center text-gray-900'>Admin Panel</h1>
            <form onSubmit={onSubmitHandeler} className="max-w-sm w-full flex flex-col px-8 py-6 rounded-lg shadow-md">
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={(e) => { setemail(e.target.value) }} value={email} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={(e) => { setpassword(e.target.value) }} value={password} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-gray-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <button type="submit" className="px-4 py-2 mt-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center">Login</button>
            </form>
        </div>
    </>
}
