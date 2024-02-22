'use client'
import Image from 'next/image';
import Loader from './Loader';
import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';
import { convertTime } from '../Utils/apiFeature';

type Props = {
    functionName:any;
    readMessage:any;
    friendMsg:any;
    account:string;
    userName:string;
    currentUserName:string;
    currentUserAddress:string;
    loading:boolean;
    readUser:any;
}

const Chat = (props: Props) => {

  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name:"",
    address:""
  })

  const searchParams = useSearchParams();

  const noParams = () => {
    return !searchParams.has("name") && !searchParams.has("address");
  }

  useEffect(() => {
    if (noParams()) return;
    setChatData({name:searchParams.get("name")!, address:searchParams.get("address")!});
    props.readMessage(searchParams.get("address"));

  }, [searchParams])
  return (
    <div className='bg-slate-800 rounded-md relative'>
      {chatData.name.length != 0 && chatData.address.length != 0 ? (
        <div className='flex flex-col h-[70vh] p-3 '>
          {props.currentUserName && props.currentUserAddress ? (
            <div className='p-4 flex items-center space-x-4'>
              <Image src={"/assets/acountName.png"} alt='accountName' width={70} height={70} />
              <div>
                <h4>{props.currentUserName}</h4>
                <p className='truncate w-1/3 md:w-2/4 lg:w-full'>{props.currentUserAddress}</p>
                </div>
            </div>
            ) : ("")
          }

          <div>
            <div>

              {/* Left */}
              <div className=' h-[45vh] overflow-y-scroll'>
              {/* <div className='border border-lime-50 overflow-y-scroll'> */}
                {props.friendMsg.map((el:any, idx:number) => (
                  <div className={`mr-8 ml-8  p-4 flex flex-col ${el.sender != chatData.address ? "items-end" : "items-start"}`} key={idx+1}>
        
                    <div className='flex space-x-1 items-right'>
                      <Image src={"/assets/acountName.png"} alt='image' width={50} height={50} />
                      <span className='flex items-center justify-center space-x-2 text-sm md:text-base'>
                        <h4 className='text-sm md:text-base'>{el.sender == chatData.address ? chatData.name : props.userName}</h4> {""}
                        <small>
                          Time: {convertTime(el.timestamp)}
                        </small>
                      </span>
                    </div>
                      
                    
                    <p className={`${el.sender != chatData.address ? "bg-lime-600" : "bg-[#b7772db2]"} text-sm md:text-base rounded-md max-w-xl p-3 mt-2 `} key={idx+1}>
                      {el.msg}
                      {""}
                      {""}
                    </p>
                  </div>
                ))}
              </div>

            </div>
            {props.currentUserAddress && props.currentUserName ? (
              <div className='absolute bottom-1 w-full'>
                <div className='flex h-10 space-x-2 mb-4 ml-4 mr-12'>
                  <Image className='cursor-pointer' src={"/assets/smile.png"} alt='smile' width={50} height={50} />
                  <input className=' w-full p-2 outline-none bg-orange-500 placeholder-white  rounded-md' type='text' placeholder='Type your message here' onChange={(e:any) => setMessage(e.target.value)} />
                  <Image className='cursor-pointer' src={"/assets/file.png"} alt='file' width={50} height={50} />
                  {
                    props.loading ? <Loader /> : <Image className='cursor-pointer' onClick={() => props.functionName(message, chatData.address)} src={"/assets/send.png"} alt='send' width={50} height={50} /> 
                  }
                </div>
              </div>
            ) : 
              <div>
                  
              </div>
            } 
          </div>

        </div>
      ) : ("")
      }
    </div>
  )
}

export default Chat