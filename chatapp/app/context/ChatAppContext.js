'use client'
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import {checkIfWalletIsConnected, connectWallet, connectingWithContract} from '../Utils/apiFeature';

// const object = {
//     title:'Hey, Welcome to Blockchain App',
//     weather:'Hot'
// };
export const ChatAppContext = React.createContext(null);
export const ChatAppProvider = ({children}) => {
    
    const [object, setObject] = useState({
        title:'Hey, Welcome to Blockchain App',
        weather:"Hot"
    })
    return (
        <ChatAppContext.Provider value={{object, setObject}}>
            {children}
        </ChatAppContext.Provider>
    )
}