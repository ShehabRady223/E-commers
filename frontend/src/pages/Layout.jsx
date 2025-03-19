import React from 'react'
import Navbar from './../Components/Navbar';
import Footer from './../Components/Footer';
import { Outlet } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';

export default function Layout() {
    return (<>
        <Navbar />
        <SearchBar/>
        <Outlet />
        <Footer />
    </>)
}
