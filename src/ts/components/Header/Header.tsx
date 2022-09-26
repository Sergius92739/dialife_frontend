import React from 'react'
import { Auth } from './Auth'
import { Logo } from './Logo'
import { NavBar } from './NavBar'

export const Header = (): JSX.Element => {
  return (
    <div className='shadow-md shadow-black/10 bg-white fixed w-full z-10'>
      <header className="container mx-auto flex py-3 px-2 justify-between items-center">
        <Logo />
        <NavBar />
        <Auth />
      </header>
    </div>
  )
}
