'use client'
import Chat from './Chat'
import FriendCard from './FriendCard'
import Loader from './Loader';
import Image from 'next/image'
import React, {useState, useEffect, useContext} from 'react'

import { ChatAppContext } from '../context/ChatAppContext';

type Props = {}

const Friend = (props: Props) => {
  const {object, sendMessage, readMessage, loading, readUser} = useContext<any>(ChatAppContext);
  return (
    <div className=' mr-12 ml-12 mb-12 mt-6'>
      <div className='flex flex-col md:flex-row items-center'>

        {/* Left */}
        <div className='w-full overflow-y-scroll h-[50vh] md:h-[70vh] md:w-1/2 lg:w-2/6 rounded-md bg-slate-800'>
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
        <div className='w-full h-[70vh] md:w-1/2 lg:w-4/6 mt-8 md:mt-0  md:ml-6'>
            <Chat 
              functionName={sendMessage}  
              readMessage={readMessage} 
              friendMsg={object.friendMsg} 
              account={object.account}
              userName={object.userName}
              currentUserName={object.currentUserName}
              currentUserAddress={object.currentUserAddress}
              loading={loading}
              readUser={readUser}
                />
        </div>
      </div>
    </div>
  )
}

export default Friend