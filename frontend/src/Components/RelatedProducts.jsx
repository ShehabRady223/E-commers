import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Product from './../pages/Product';
import Title from './Title';
import ProductsItem from './ProductsItem';

export default function RelatedProducts({ category, subCategory }) {
    let { products } = useContext(ShopContext)
    const [related, setrelated] = useState([])
    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice()
            productCopy = productCopy.filter(item => category === item.category)
            productCopy = productCopy.filter(item => subCategory === item.subCategory)
            setrelated(productCopy.slice(0, 5))
        }
    }, [products])
    return <>
        <div className='my-20'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    related.map((item, index) => (
                        <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    </>
}
