'use client'
import React, {useState, useEffect, useContext} from 'react';
import {ChatAppContext} from '../context/ChatAppContext';
import UserCard from '../components/UserCard';


type Props = {}

const allusers = (props: Props) => {
    const {object, addFriends} = useContext<any>(ChatAppContext);
  return (
    <div>
        <div>
            <h1 className='text-3xl font-semibold mx-5 md:mx-20 my-5 mb-10'>Find your friends</h1>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-5 md:mx-20 mt-10'>
            {object.userList.map((el:any, idx:number) => (
                <UserCard key={idx + 1} el={el} idx={idx+1}  addFriends={addFriends} friendAddresses={object.friendAddresses}/>
            ))}
        </div>
    </div>
  )
}

export default allusers