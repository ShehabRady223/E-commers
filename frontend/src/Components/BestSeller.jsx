import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from './../Context/ShopContext';
import { useState } from 'react';
import Title from './Title';
import ProductsItem from './ProductsItem';

export default function BestSeller() {
    const { products } = useContext(ShopContext);
    const [bestSeller, setbestSeller] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((product) => product.bestSeller)
        setbestSeller(bestProduct)
    }, [products])

    return <>
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque tempore hic velit.</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10'>
                {
                    bestSeller.map((item, index) => (
                        <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    </>
}
