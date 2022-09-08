import React from 'react'
import { Auth } from './Auth/Auth'
import { Logo } from './Logo/Logo'
import { NavBar } from './NavBar/NavBar'

export const Header = (): JSX.Element => {
  return (
    <header className="flex py-5 justify-between items-center">
      <Logo />
      <NavBar />
      <Auth />
    </header>
  )
}
