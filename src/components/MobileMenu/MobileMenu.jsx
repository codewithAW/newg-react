import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { NavIcons } from '../../utils/icons'
import { useTheme } from '../../hooks/useTheme'
import './MobileMenu.css'

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const icons = NavIcons()

  const navItems = [
    { path: '/', icon: icons.home, label: 'Home' },
    { path: '/about', icon: icons.about, label: 'About' },
    { path: '/experience', icon: icons.experience, label: 'Experience' },
    { path: '/websites', icon: icons.websites, label: 'Websites' },
    { path: '/contact', icon: icons.contact, label: 'Contact' },
  ]

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const menu = document.querySelector('.mobile-menu')
      const btn = document.querySelector('.mobile-menu-btn')
      if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <button
        className={`mobile-menu-btn ${isOpen ? 'active' : ''}`}
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`} id="mobile-menu">
        <nav className="mobile-menu-content">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-menu-link ${location.pathname === item.path ? 'active' : ''}`}
              data-page={item.label.toLowerCase()}
            >
              <span className="mobile-menu-icon">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="mobile-menu-divider"></div>
          
          <div className="mobile-theme-toggle">
            <span className="toggle-label">Dark Mode</span>
            <button
              className="mobile-toggle-switch"
              aria-label="Toggle theme"
              aria-pressed={isDark}
              onClick={() => {
                toggleTheme()
              }}
            >
              <span className="toggle-circle"></span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default MobileMenu
