import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Layout from './pages/Layout';
import About from './pages/About';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Cart from './pages/Cart';
import ShopContextProvider from './Context/ShopContext';
import { ToastContainer } from 'react-toastify';


let R = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'cart', element: <Cart /> },
      { path: 'collection', element: <Collection /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'orders', element: <Orders /> },
      { path: 'place-order', element: <PlaceOrder /> },
      { path: 'product', element: <Product /> },
      { path: '/product/:productId', element: <Product /> },
      // { path: '*', element: <notfound /> },
    ]
  }
])

export default function App() {

  return <>
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
      <ShopContextProvider>
        <ToastContainer />
        <RouterProvider router={R}></RouterProvider>
      </ShopContextProvider>
    </div>
  </>
}