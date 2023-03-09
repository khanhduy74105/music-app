import React from 'react'
import { MdDoNotTouch } from 'react-icons/md'

const Processing = () => {
  return (
    <div className='flex h-[60vh] items-center justify-center'>
        <div className="flex flex-col gap-5">
            <span> <MdDoNotTouch size={40}/></span>
            <h2 className='text-4xl font-bold '>Trang không có sẵn</h2>
        </div>
    </div>
  )
}

export default Processing