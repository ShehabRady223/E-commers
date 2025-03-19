import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {

  const { token, settoken, backendUrl } = useContext(ShopContext)
  const navigate = useNavigate()
  const [currentSate, setcurrentSate] = useState('Login')
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentSate === 'Sign Up') {
        const res = await axios.post(backendUrl + 'api/user/register', { name, email, password })
        if (res.data.success) {
          settoken(res.data.token)
          localStorage.setItem('token', res.data.token)
        }
        else {
          toast.error(res.data.message)
        }
      }
      else {
        const res = await axios.post(backendUrl + 'api/user/login', { email, password })
        if (res.data.success) {
          settoken(res.data.token)
          localStorage.setItem('token', res.data.token)
        }
        else {
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return <>
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentSate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentSate === 'Login' ? '' : <input onChange={(e) => { setname(e.target.value) }} type="text" placeholder='Name' className='w-full px-3 py-2 border border-gray-800' required />}
      <input onChange={(e) => { setemail(e.target.value) }} type="email" placeholder='Email' className='w-full px-3 py-2 border border-gray-800' required />
      <input onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='Password' className='w-full px-3 py-2 border border-gray-800' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget your Password ?</p>
        {
          currentSate === 'Login' ?
            <p className='cursor-pointer' onClick={() => { setcurrentSate('Sign Up') }}>Create account</p>
            : <p className='cursor-pointer' onClick={() => { setcurrentSate('Login') }}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentSate === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  </>
}
