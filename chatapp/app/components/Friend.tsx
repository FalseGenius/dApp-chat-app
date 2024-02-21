'use client'
import Chat from './Chat'
import FriendCard from './FriendCard'
import Image from 'next/image'
import React, {useState, useContext} from 'react'

import { ChatAppContext } from '../context/ChatAppContext';

type Props = {}

const Friend = (props: Props) => {
  const array  = [1, 2, 3, 4, 5, 6];
  const {object, sendMessage, readMessage, loading, readUser} = useContext<any>(ChatAppContext);
  return (
    <div className=' mr-12 ml-12 mb-12 mt-6'>
      <div className='flex flex-col md:flex-row items-center'>

        {/* Left */}
        <div className='flex-1 w-full md:flex-1/2 md:w-1/2 lg:flex-1/3  lg:w-2/5  rounded-md bg-slate-800 h-screen'>
          {object.friendList.map((el:any, idx:number) => (
            <FriendCard
              key={idx+1}
              el={el}
              idx={idx}
              readMessage={readMessage}
              sendMessage={sendMessage}
              readUser={readUser}
             />
          ))}
        </div>

        {/* Right */}
        <div className='flex-1 w-full mt-8 md:mt-0 md:flex-1/2 md:w-1/2 lg:flex-2/3 lg:w-3/5 md:ml-6 h-screen'>
            <Chat 
              functionName={sendMessage}  
              readMessage={readMessage} 
              friendMsg={object.friendMsg} 
              account={object.account}
              userName={object.userName}
              currentUserName={object.currentUserName}
              currentUserAddress={object.currentUserAddress}
              loading={loading}
                />
        </div>

      </div>
    </div>
  )
}

export default Friend