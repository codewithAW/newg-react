import React from 'react'
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import MobileMenu from '../MobileMenu/MobileMenu'
import '../../styles/header.css'

function Header() {
  return (
    <header className="switcher-container">
      <div className="header-wrapper">
        <MobileMenu />

        <div className="glass-button">
          <Logo />
          <Navigation />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
