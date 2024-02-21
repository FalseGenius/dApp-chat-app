"use client"
import Image from 'next/image';
import Model from './Model';
import React, {useEffect, useState, useContext} from 'react'
import { ChatAppContext } from '../context/ChatAppContext';


type Props = {}

const Filter = (props: Props) => {
  const {object, error, setError,addFriends} = useContext<any>(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className='ml-8 mr-8 md:ml-12 md:mr-12 mt-4'>

      <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 items-center content-center justify-between'>
        {/* Left */}
        <div className='bg-slate-800 p-3 rounded-full md:w-2/4 lg:w-1/4'>
          <div className='flex flex-row items-center justify-center space-x-2'>
            <Image src={'/assets/search.png'} alt='search' width={20} height={20} />
            <input className='bg-slate-800 w-full outline-none' type='text' placeholder='search...' />
          </div>
        </div>
        {/* Right */}
        <div className='flex space-x-4 items-center justify-center'>
          <button className='flex items-center justify-between text-orange-400 bg-slate-800 rounded-full text-xs md:text-md py-2 md:py-4 px-8 space-x-4'>
            <Image className='' src={"/assets/delete.png"} alt='clear' width={20} height={20} />
            <p>Clear Chat</p>
          </button>
          <button className='flex items-center justify-between text-orange-400 bg-slate-800 rounded-full text-xs md:text-md py-2 md:py-4 px-8 space-x-4' onClick={() => setAddFriend(true)}>
            <Image className='' src={"/assets/user.png"} alt='clear' width={20} height={20} />
            <p>Add Friend</p>
          </button>
        </div>
      </div>

      {/* Model component */}
      {addFriend && (
        <div className=''>
          <Model
            title='WELCOME TO'
            head="CHAT BUDDY"
            info="StringLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at egestas ipsum, at fringilla leo.
            Nunc dignissim, nulla eget rhoncus malesuada, mauris metus vulputate arcu, id fermentum ex elit vitae tortor."
            smallInfo="Kindly select your friend name and address"
            image={'/assets/hero.png'}
            functionName={addFriends}
            address=""
            openBox={setAddFriend}
            setErr={setError}
          />
        </div>
      )}
    </div>
  )
}

export default Filter;