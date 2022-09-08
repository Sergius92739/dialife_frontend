import React, { ReactNode } from 'react';

type TChildren = { children: ReactNode }

export const Main = ({ children }: TChildren): JSX.Element => {
  return (
    <main className='flex-1'>
      {children}
    </main>
  )
}
