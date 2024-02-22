import React from 'react'
import Image from 'next/image'
import images from '../../public/assets';

type Props = {}

const Loader = (props: Props) => {
  return (
    <div>
      <div>
        <Image src={images.loader} alt='loader' width={50} height={50} />
      </div>
    </div>
  )
}

export default Loader