import React from 'react'

export const Loading = (): JSX.Element => {
  return (
    <div className="absolute inset-0 bg-black opacity-90 z-10">
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="
        absolute 
        w-[200px] 
        h-[200px] 
        rounded-full 
        animate-ring 
        before:content-none 
        before:absolute 
        before:top-0
        before:left-0
        before:w-full
        before:h-full
        before:rounded-full
        before:shadow-[0_0_5px_rgba(255,255,255,0.3)]
        "></div>
        <span
          className='
        text-[#737373]
        text-xl
        uppercase
        tracking-[1px]
        leading-[200px]
        animate-text
        '>loading...</span>
      </div>
    </div>
  )
}
