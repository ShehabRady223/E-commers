import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

export const ShopContext = createContext();

export default function ShopContextProvider(props) {

    const currency = '$'
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setsearch] = useState('')
    const [showSearch, setshowSearch] = useState(false)
    const [cartItem, setcartItem] = useState({})
    const [products, setproducts] = useState([])
    const [token, settoken] = useState('')

    async function addToCart(itemId, size) {
        if (!size) {
            toast.warning('Select Product Size 🦄')
            return
        }
        let cartData = structuredClone(cartItem)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setcartItem(cartData)
        if (token) {
            try {
                const res = await axios.post(backendUrl + 'api/cart/add', { itemId, size }, { headers: { token } })
                //* if (res.data.success) {
                //     toast.success(res.data.message)
                // } else {
                //     toast.error(res.data.message)
                // }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    function getCartCount() {
        let totalCount = 0
        for (let items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    totalCount += cartItem[items][item]
                }
            }
        }
        return totalCount
    }

    async function updateQuantity(itemId, size, quantity) {
        let cartData = structuredClone(cartItem)
        cartData[itemId][size] = quantity
        setcartItem(cartData)
        if (token) {
            try {
                await axios.post(backendUrl + 'api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    function getCartAmount() {
        let totalAmount = 0
        for (const items in cartItem) {
            const itemInfo = products.find((product) => product._id === items)
            for (const item in cartItem[items])
                if (cartItem[items][item]) {
                    totalAmount += cartItem[items][item] * itemInfo.price
                }
        }
        return totalAmount
    }

    async function getProductsData() {
        try {
            const res = await axios.get(backendUrl + 'api/product/list')
            if (res.data.success) {
                setproducts(res.data.products)
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    async function getUserCart(token) {
        const res = await axios.get(backendUrl + 'api/cart/get', { headers: { token } })
        if (res.data.success) {
            setcartItem(res.data.cartData)
        }
        else {
            toast.error(res.data.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            settoken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, delivery_fee, search,
        setsearch, showSearch, setshowSearch,
        cartItem, addToCart, getCartCount, updateQuantity, getCartAmount,
        backendUrl, token, settoken, setcartItem
    }

    return <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
}