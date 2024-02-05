'use client'

import React, {useEffect} from 'react';
import {useContext} from 'react';
import {ChatAppContext} from '../context/ChatAppContext';

interface Props {}

const Homepage = (props: Props) => {
  const {object, setObject}:any = useContext(ChatAppContext);
  const handleClick = (e:any) => {
    setObject({...object, weather:"Cold"});
  }

  useEffect(() => {
    console.log(object);
  }, [object])

  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={handleClick}>Press me</button>
      <h2>{object.weather}</h2>
    </div>
  )
}

export default Homepage;