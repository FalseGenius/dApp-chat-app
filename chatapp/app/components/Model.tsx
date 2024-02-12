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
}

const Model = (props: Props) => {

  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const {loading} = useContext<any>(ChatAppContext);

  return (
    <div>
      {/* Model Box */}
      <div>

        {/* Left */}
        <div>
          <Image src={props.image} alt="Buddy" height={700} width={700} />
        </div>

        {/* Right */}
        <div>
          <h1>
            {props.title}<span>{props.head}</span>
          </h1>
          <p>{props.info}</p>
          <small>{props.smallInfo}</small>

        {/* Modex box right name */}
        <div>
          <div>
            <Image src={images.username} alt="username" width={50} height={50} />
          </div>
        </div>

        </div>
      
      </div>
    </div>
  )
}

export default Model