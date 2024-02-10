'use client'
import React, {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ChatAppContext} from '../context/ChatAppContext';
// import {Model, Error} from 


interface Props {}

const Navbar = (props: Props) => {

  const {object, setObject} = useContext<any>(ChatAppContext);



  return (
    <div>Navbar</div>
  )
}

export default Navbar;