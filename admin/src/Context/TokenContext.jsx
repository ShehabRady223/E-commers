import React, { useState } from 'react'
import { createContext } from "react";

export const TokenContext = createContext()

export default function TokenContextProvider(props) {
    const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const currency = '$'
    const value = { settoken, token, currency }

    return <TokenContext.Provider value={value}>
        {props.children}
    </TokenContext.Provider>
}
