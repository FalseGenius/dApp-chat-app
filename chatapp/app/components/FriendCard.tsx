import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

type Props = {
  el:any
  idx:number;
  readMessage:any;
  sendMessage:any;
  readUser:any;
}

const FriendCard = (props: Props) => {
  return (
    <div className='pl-8 pr-8 pt-8 pb-4 rounded-md'>
      <Link href={{pathname:'/', query:{name:`${props.el.name}`, address:`${props.el.pubKey}`}}}>
        <div className='pb-5 border-b-2 border-x-cyan-100' onClick={() => (props.readMessage(props.el.pubKey), props.readUser(props.el.pubKey))}>
          <div className='flex flex-row space-x-4'>

            {/* Left */}
            <div>
              <Image src={'/assets/acountName.png'} alt='accountName' width={50} height={50} />
            </div>
            
            {/* Right */}
            <div className='flex flex-1 justify-between'>
              <div>
                <h4>{props.el.name}</h4>
                <p>{props.el.pubKey.slice(0, 20)}...</p>
              </div>
              <div>
                <small>{props.idx+1}</small>
              </div>
            </div>

          </div>
        </div>
      </Link>
    </div>
  )
}

export default FriendCard