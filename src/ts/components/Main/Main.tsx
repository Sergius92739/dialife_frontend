import React, { ReactNode } from 'react';

type TChildren = { children: ReactNode }

export const Main = ({ children }: TChildren): JSX.Element => {
  return (
    <div className="flex-1 mt-5">
      <main className='container mx-auto px-2 text-[#404242]'>
        {children}
      </main>
    </div>
  )
}
