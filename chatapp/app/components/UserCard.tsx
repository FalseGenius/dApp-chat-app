import React from 'react'
import Image, { StaticImageData } from 'next/image'

// Internal imports


type Props = {
  el:any;
  idx:number;
  addFriends:any;
  friendAddresses:Record<string, boolean>;
}

const UserCard = (props: Props) => { 
  const imagePath:any = `/assets/img${props.idx}.gif`;

  return (
    <div className='relative bg-slate-800 flex flex-col items-center justify-center rounded-md shadow-2xl shadow-zinc-600 hover:shadow-zinc-500'>
      <div className='flex flex-col items-center text-center p-4'>
        <Image className='rounded-full' src={imagePath} alt='image' width={100} height={100}  />
        <div className='text-center flex-flex-col items-center justify-center mx-auto'>
          <h3>{props.el.name}</h3>
          <p className='text-sm md:text-md'>{props.el.pubKey.slice(0,20)}...</p>
        </div>
      </div>
      <button disabled={props.friendAddresses && props.el.pubKey in props.friendAddresses} className='flex p-3 rounded-md w-36 items-center justify-center space-x-2 bg-slate-900 m-2' onClick={() => props.addFriends(props.el.name, props.el.pubKey)}>
        <small className='text-xs text-orange-400'>{props.el.pubKey in props.friendAddresses ? "Already friends!": "Add friend"}</small>
      </button>
      <span className='absolute top-5 right-5 p-2 w-10 flex items-center justify-center bg-orange-400 rounded-full'>{props.idx}</span>
    </div>
  )
}

export default UserCard