import React, { useContext, useState } from 'react'
import { ShopContext } from './../Context/ShopContext';
import Title from './../Components/Title';
import CartTotla from './../Components/CartTotla';
import { assets } from '../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PlaceOrder() {

  const { backendUrl, token, cartItem, setcartItem, getCartAmount, products, delivery_fee } = useContext(ShopContext)
  const [method, setmethod] = useState('stripe')
  const navigate = useNavigate()
  const [formData, setformData] = useState({
    fristName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setformData(data => ({ ...data, [name]: value }))
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      switch (method) {
        case 'cod':
          const res = await axios.post(backendUrl + 'api/order/place', orderData, { headers: { token } })
          if (res.data.success) {
            setcartItem({})
            navigate('/orders')
          }
          else {
            toast.error(res.data.message)
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return <>
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='fristName' type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-gray-700' placeholder='Frist Name' />
          <input required onChange={onChangeHandler} name='laststName' type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-gray-700' placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-gray-700' placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-gray-700' placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-gray-700' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-gray-700' placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-gray-700' placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-gray-700' placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' type="tel" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-gray-700' placeholder='Phone' />
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotla />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => (setmethod('stripe'))} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : null}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => (setmethod('razorpay'))} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : null}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => (setmethod('cod'))} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : null}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div >
        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>
      </div >
    </form >
  </>
}
