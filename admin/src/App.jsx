import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import TokenContextProvider from './Context/TokenContext';

let R = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: '/', element: <Add /> },
      { path: '/list', element: <List /> },
      { path: '/orders', element: <Orders /> },
      { path: '*', element: <notfound /> },
    ]
  }
])

export const backendUrl = import.meta.env.VITE_BACKEND_URL

function App() {

  return <>
    <TokenContextProvider>
      <ToastContainer />
      <RouterProvider router={R}></RouterProvider>
    </TokenContextProvider>
  </>
}

export default App
