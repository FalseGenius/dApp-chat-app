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
            <h1>Find your friends</h1>
        </div>
        <div>
            {object.userList.map((el:any, idx:number) => (
                <UserCard key={idx + 1} el={el} idx={idx}  addFriends={addFriends} />
            ))}
        </div>
    </div>
  )
}

export default allusers