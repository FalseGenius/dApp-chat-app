'use client'
import Link from 'next/link';
import Image from 'next/image';
import images from '../../public/assets';
import Model from './Model';
import Error from './Error';
import { usePathname } from 'next/navigation'
import {ChatAppContext} from '../context/ChatAppContext';
import React, {useEffect, useState, useContext} from 'react';



interface Props {}

const Navbar = (props: Props) => {

  const {object, setObject, connectWallet, createAccount, error, setError} = useContext<any>(ChatAppContext);
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);


  const pathName = usePathname();


  const menuItems = [
    {
      menu:"All Users",
      link:"allusers"
    },
    {
      menu:"CHAT",
      link:"/"
    },

  ]



  useEffect(() => {
    if (pathName == '/') setActive(1);
    else setActive(0);
  }, [])



  const connect = ():void => {
    const address = connectWallet();
    if (address) setObject({...object, account:address});
    else console.log("An error occured");
  }

  return (
    <div className='mt-3 relative'>
      <div className={openModel ? `hidden` : `flex justify-between items-center`}>
        {/* Left */}
        <div className='p-8 md:pl-24 justify-normal md:justify-between'>
          <Link href='/' onClick={() => setActive(1)} className='w-14 rounded-md'>
            <Image className='cursor-pointer' src={images.logo} alt='logo' width={50} height={50} />
          </Link>
        </div>
  
        {/* Right */}
        <div className='flex p-4 mx-4 items-center'>
          {/* Desktop */}
          <div className='hidden md:flex md:space-x-4 lg:space-x-9 p-4'>
            {menuItems.map((el, i) => (
              <div key={i} onClick={() => setActive(i)} className={`${active === i ? "text-orange-400 underline underline-offset-8" : "text-white"} text-sm md:text-md`}>
                <Link href={el.link}>{el.menu}</Link>
              </div>
            ))}
          </div>
  
          {/* Mobile */}
          {open && (
            <div className='md:hidden z-20 bg-slate-800 fixed inset-0 h-screen flex items-center justify-center flex-col space-y-6 text-center'>
              {menuItems.map((el, i) => (
                <div key={i} onClick={() => setActive(i)} className={`${active === i ? "text-orange-400 underline underline-offset-8" : "text-white"} text-sm`}>
                  <Link href={el.link}>{el.menu}</Link>
                </div>
              ))}
              <p>
                <Image src={images.close} className='cursor-pointer' alt='close' width={50} height={50} onClick={() => setOpen(false)} />
              </p>
            </div>
          )}
  
          {/* CONNECT WALLET FUNCTION */}
          <div className='p-4'>
            {object.account.length == 0 ? (
              <button className='flex p-2 rounded-md w-36 items-center justify-center space-x-2 bg-slate-800' onClick={connect}>
                <span className='text-xs text-orange-400'>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)} className='flex p-3 rounded-md w-36 items-center justify-center space-x-2 bg-slate-800'>
                <Image src={object.userName ? images.accountName : images.create2} alt='Account image' width={20} height={20} />
                <small className='text-xs text-orange-400'>{object.userName || "Create Account"}</small>
              </button>
            )}
          </div>
  
          <div className='md:hidden p-4 w-14' onClick={() => setOpen(true)}>
            <Image className='cursor-pointer' src={images.open} alt='open' width={20} height={20} />
          </div>
        </div>
      </div>

      {/* Model Component */}
      {openModel && (
        <div className='top-0 z-50 bg-[#292f3f] h-screen overflow-auto w-full fixed'>
          <Model 
            openBox={setOpenModel}
            title="Welcome To"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at egestas ipsum, at fringilla leo.
            Nunc dignissim, nulla eget rhoncus malesuada, mauris metus vulputate arcu, id fermentum ex elit vitae tortor."
            smallInfo="Kindly select your name..."
            image={images.hero}
            functionName={createAccount}
            address={object.account}
            setErr={setError}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error} /> }
    </div>
  );
  
}

export default Navbar;