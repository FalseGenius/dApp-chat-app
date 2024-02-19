import React from 'react'

type Props = {
  error:String;
}

export default function Error(props: Props) {
  return (
    <div className='flex items-center justify-center z-50 mx-auto w-3/4 md:w-2/4 lg:w-1/4 p-4 rounded-md text-center bg-amber-700'>
      <div>
        <h1 className='text-lg'>Please fix the error and Reload browser</h1>
        <p className='border-2 rounded-md shadow-lg bg-red-500'>
          {props.error}
        </p>
      </div>
    </div>
  )
}