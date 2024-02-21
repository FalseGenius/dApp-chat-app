'use client'
import Image from 'next/image';
import Loader from './Loader';
import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'
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
    setChatData({name:searchParams.get("name")!, address:searchParams.get("address")!})

  }, [searchParams])
  return (
    <div>
      {props.currentUserName && props.currentUserAddress ? (
        <div>
          <Image src={"/assets/acountName.png"} alt='accountName' width={70} height={70} />
          <div>
            <h4>{props.currentUserName}</h4>
            <p>{props.currentUserAddress}</p>
            </div>
        </div>
        ) : ("")
      }

      <div>
        <div>

          {/* Left */}
          <div>
            {props.friendMsg.map((el:any, idx:number) => (
              <div key={idx+1}>
                {el.sender == chatData.address ? (
                  <div>
                    <Image src={"/assets/acountName.png"} alt='image' width={50} height={50} />
                    <span>
                      <h4>{chatData.name}</h4> {""}
                      <small>
                        Time: {convertTime(el.timestamp)}
                      </small>
                    </span>
                  </div>
                ) : (
                  <div>
                    <Image src={"/assets/acountName.png"} alt='image' width={50} height={50} />
                    <span>
                      <h4>{props.userName}</h4> {""}
                      <small>
                        Time: {convertTime(el.timestamp)}
                      </small>
                    </span>
                  </div>
                )
              }
              <p key={idx+1}>
                {el.msg}
                {""}
                {""}
              </p>
              </div>
            ))}
          </div>
        
          {/* Left */}
          <div>

          </div>

        </div>
        {props.currentUserAddress && props.currentUserName ? (
          <div>
            <div>
              <Image src={"/assets/smile.png"} alt='smile' width={50} height={50} />
              <input type='text' placeholder='Type your message here' onChange={(e:any) => setMessage(e.target.value)} />
              <Image src={"/assets/file.png"} alt='file' width={50} height={50} />
              {
                props.loading ? <Loader /> : <Image onClick={() => props.functionName(message, chatData.address)} src={"/assets/send.png"} alt='send' width={50} height={50} /> 
              }
            </div>
          </div>
        ) : 
          <div>
              
          </div>
        } 
      </div>
    </div>
  )
}

export default Chat