import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import NewslatterBox from '../Components/NewslatterBox'

export default function Home() {
    return <>
        <Hero />
        <LatestCollection />
        <BestSeller/>
        <OurPolicy/>
        <NewslatterBox/>
    </>
}
