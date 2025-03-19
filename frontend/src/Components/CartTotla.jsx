import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';

export default function CartTotla() {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
    // console.log(getCartAmount());

    return <>
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{getCartAmount()}.00{currency}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{delivery_fee+'.00' + currency}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}{currency}</b>
                </div>
            </div>
        </div>
    </>
}
