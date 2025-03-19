import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'
import { TokenContext } from '../Context/TokenContext'

export default function Add() {
  const { token } = useContext(TokenContext)

  const [image1, setimage1] = useState(false)
  const [image2, setimage2] = useState(false)
  const [image3, setimage3] = useState(false)
  const [image4, setimage4] = useState(false)

  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState('Men')
  const [subCategory, setsubCategory] = useState('Topwear')
  const [bestSeller, setbestSeller] = useState(false)
  const [sizes, setsizes] = useState([])

  const [isLoading, setisLoading] = useState(false)

  async function onSubmitHandler(e) {
    e.preventDefault()
    setisLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestSeller', bestSeller)
      formData.append('sizes', sizes.length ? JSON.stringify(sizes) : '')
      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }
      const res = await axios.post(backendUrl + 'api/product/add', formData,
        { headers: { token } }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        setname('')
        setdescription('')
        setprice('')
        setbestSeller(false)
        setsizes([])
        setimage1(false)
        setimage2(false)
        setimage3(false)
        setimage4(false)
        setisLoading(false)
      }
      else {
        toast.warning(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return <>
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => { setimage1(e.target.files[0]) }} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => { setimage2(e.target.files[0]) }} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => { setimage3(e.target.files[0]) }} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => { setimage4(e.target.files[0]) }} type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => { setname(e.target.value) }} value={name} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => { setdescription(e.target.value) }} value={description} className='w-full max-w-[500px] px-3 py-2 ' type="texta" placeholder='Write content here' required />
      </div>
      <div className='flex flex-col sm:flex-row items-center gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => { setcategory(e.target.value) }} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => { setsubCategory(e.target.value) }} value={subCategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product price</p>
          <input onChange={(e) => { setprice(e.target.value) }} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='Price' required />
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => { setsizes(sizes.includes('S') ? sizes.filter(item => item !== 'S') : [...sizes, "S"]) }}>
            <p className={`${sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => { setsizes(sizes.includes('M') ? sizes.filter(item => item !== 'M') : [...sizes, "M"]) }}>
            <p className={`${sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => { setsizes(sizes.includes('L') ? sizes.filter(item => item !== 'L') : [...sizes, "L"]) }}>
            <p className={`${sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => { setsizes(sizes.includes('XL') ? sizes.filter(item => item !== 'XL') : [...sizes, "XL"]) }}>
            <p className={`${sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={() => { setsizes(sizes.includes('XLL') ? sizes.filter(item => item !== 'XLL') : [...sizes, "XLL"]) }}>
            <p className={`${sizes.includes('XLL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XLL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={() => { setbestSeller(!bestSeller) }} value={bestSeller} type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button disabled={isLoading} type='submit' className='w-28 py-3 mt-4 bg-black text-white rounded-sm flex justify-center'>
        {isLoading ? <>
          <div className="sk-chase">
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
          </div>
        </> : 'ADD'}
        {/* ADD */}
      </button>
    </form>
  </>
}
