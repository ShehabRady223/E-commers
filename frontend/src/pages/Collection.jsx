import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { ShopContext } from './../Context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from './../Components/Title';
import ProductsItem from './../Components/ProductsItem';

export default function Collection() {
    let { products, search, showSearch } = useContext(ShopContext);
    const [showFillter, setshowFillter] = useState(false)
    const [filterProducts, setfilterProducts] = useState([])
    const [category, setcategory] = useState([])
    const [subCategory, setsubCategory] = useState([])
    const [sortType, setsortType] = useState('relavent')

    function toggleCategory(e) {
        if (e.target.checked) {
            setcategory([...category, e.target.value])
        } else {
            setcategory(category.filter(item => item !== e.target.value))
        }
    }
    function toggleSubCategory(e) {
        if (e.target.checked) {
            setsubCategory([...subCategory, e.target.value])
        } else {
            setsubCategory(subCategory.filter(item => item !== e.target.value))
        }
    }

    function applyFilter() {
        let tempProducts = products.slice()
        if (showSearch && search) {
            tempProducts = tempProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if (category.length > 0) {
            tempProducts = tempProducts.filter(item => category.includes(item.category))
        }
        if (subCategory.length > 0) {
            tempProducts = tempProducts.filter(item => subCategory.includes(item.subCategory))
        }
        setfilterProducts(tempProducts)
    }

    function sortProducts(sortType) {
        let tempProducts = filterProducts.slice()
        switch (sortType) {
            case 'low-high':
                setfilterProducts(tempProducts.sort((a, b) => a.price - b.price))
                break;
            case 'high-low':
                setfilterProducts(tempProducts.sort((a, b) => b.price - a.price))
                break;
            default:
                applyFilter()
                break;
        }
    }

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch])

    useEffect(() => {
        sortProducts(sortType)
    }, [sortType, products])

    return <>
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='min-w-60'>
                <p onClick={() => setshowFillter(!showFillter)} className='my-2 text-xl flex items-center cursor-pointer sm:cursor-default gap-2'>FILTERS
                    <img className={`h-3 sm:hidden ${showFillter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>
                <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFillter ? '' : 'hidden'} `} >
                    <p className='mb-3 text-sm font-medium'>CATEGOTIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Men
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
                        </p>
                    </div>
                </div>
                <div className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${showFillter ? '' : 'hidden'} `} >
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='flex justify-between text-base sm:text-2xl mb-4 '>
                    <Title text1={'ALL'} text2={'COLLECIONS'} />
                    <select onChange={(e) => setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 outline-none'>
                        <option value="relavent">Sort by:Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterProducts.map((item, index) => {
                            return <ProductsItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        })
                    }
                </div>
            </div>
        </div >
    </>
}
