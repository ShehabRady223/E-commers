import React from 'react'
import { useContext } from 'react';
import { TokenContext } from './../Context/TokenContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from './../App';
import { useEffect } from 'react';
import { assets } from '../assets/assets';

export default function Orders() {
  const { token, currency } = useContext(TokenContext)
  const [orders, setorders] = useState([])

  async function fetchAllOrders() {
    if (!token) {
      return null
    }
    try {
      const res = await axios.post(backendUrl + 'api/order/list', {}, { headers: { token } })
      if (res.data.success) {
        setorders(res.data.orders)
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  async function statusHandeler(e, orderId) {
    try {
      const res = await axios.post(backendUrl + 'api/order/status', { orderId, status: e.target.value }, { headers: { token } })
      if (res.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchAllOrders()
  }, [])
  return <>
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      }
                      else {
                        return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                      }
                    })
                  }
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.fristName + ' ' + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ','}</p>
                  <p>{order.address.city + ' , ' + order.address.state + ' , ' + order.address.country + ' , ' + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Item : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px] text-center'>{order.amount + currency}</p>
              <select onChange={(e) => { statusHandeler(e, order._id) }} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  </>
}
