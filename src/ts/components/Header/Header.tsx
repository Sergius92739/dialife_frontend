import React from 'react'
import { Auth } from './Auth/Auth'
import { Logo } from './Logo/Logo'
import { NavBar } from './NavBar/NavBar'

export const Header = (): JSX.Element => {
  return (
    <div className='shadow-2xl shadow-black/30 bg-white'>
      <header className="container mx-auto flex py-5 px-2 justify-between items-center">
        <Logo />
        <NavBar />
        <Auth />
      </header>
    </div>
  )
}
