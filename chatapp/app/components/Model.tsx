import Image from 'next/image';
import images from "../assets";
import Loader from './Loader';
import React, {useState, useContext} from 'react';
import {ChatAppContext} from '../context/ChatAppContext';

type Props = {
  title:String;
  head:String;
  info:String;
  smallInfo:String;
  image:any;
  functionName:any;
  address:String;
  openBox:any;
}

const Model = (props: Props) => {

  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const {loading} = useContext<any>(ChatAppContext);

  return (
    <div className=''>
      {/* Model Box */}
      <div className='flex flex-row items-center justify-between space-x-5 '>

        {/* Left */}
        <div className='basis-1/2'>
          <Image src={props.image} alt="Buddy" height={700} width={700} />
        </div>

        {/* Right */}
        <div className='basis-1/2 space-y-5'>
          <h1 className='text-4xl text-orange-400 font-semibold tracking-wider'>
            {props.title}
            <br />
            <span className='font-bold text-5xl'>{props.head}</span>
          </h1>
          <p className='w-4/5 pb-2'>{props.info}</p>
          <small className='text-orange-400 text-md'>{props.smallInfo}</small>

        {/* Modex box right name */}
          <div className='space-y-3'>
            <div className='flex items-center space-x-2 bg-slate-900 w-4/5 p-2 rounded-md'>
              <Image src={images.username} alt="username" width={30} height={30} />
              <input
              
                className='bg-slate-900 w-full outline-none'
                type='text'
                placeholder='Your name...'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='flex items-center space-x-2 bg-slate-900 w-4/5 p-2 rounded-md'>
              <Image src={images.account} alt="account" width={30} height={30} />
              <input
                className='bg-slate-900 w-full outline-none'
                type='text'
                placeholder={accountAddress || "Enter address..."}
                onChange={(e) => setAccountAddress(e.target.value)}
              />
            </div>
            <div className='flex flex-row w-4/5 space-x-3'>
              <button className='bg-slate-900 basis-1/2 p-2 rounded-md text-orange-400 items-center justify-center flex space-x-2 font-semibold' onClick={() => props.functionName({name, accountAddress})}>
                {""}
                <Image src={images.send} alt="send" width={30} height={30} />
                {""}
                <span>Submit</span>
              </button>
              <button className='bg-slate-900 basis-1/2 p-2 rounded-md text-orange-400 items-center justify-center flex space-x-2 font-semibold' onClick={() => props.openBox(false)}>
                {""}
                <Image src={images.close} alt="close" width={30} height={30} />
                {""}
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Model