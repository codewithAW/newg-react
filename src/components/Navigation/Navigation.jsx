import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NavIcons } from '../../utils/icons';
import './Navigation.css';
import '../../styles/header.css';

function Navigation() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState('1');
  const [animate, setAnimate] = useState(false);
  const switcherRef = useRef(null);
  const icons = NavIcons();

  const navItems = [
    { path: '/', icon: icons.home, option: '1', label: 'Home' },
    { path: '/about', icon: icons.about, option: '2', label: 'About' },
    { path: '/experience', icon: icons.experience, option: '3', label: 'Experience' },
    { path: '/websites', icon: icons.websites, option: '4', label: 'Websites' },
    { path: '/contact', icon: icons.contact, option: '5', label: 'Contact' },
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      const newOption = navItems[currentIndex].option;
      setActiveIndex(newOption);
      
      if (switcherRef.current) {
        const tabWidth = switcherRef.current.offsetWidth / navItems.length;
        const xPercent = (currentIndex / navItems.length) * 100;
        switcherRef.current.style.setProperty('--indicator-x', `${xPercent}%`);
      }

      // Trigger animation on route change
      setAnimate(false);
      const timeout = setTimeout(() => setAnimate(true), 20);

      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);

  const handleClick = (option, index) => {
    setActiveIndex(option);
    if (switcherRef.current) {
      const xPercent = (index / navItems.length) * 100;
      switcherRef.current.style.setProperty('--indicator-x', `${xPercent}%`);
    }
    
    // Trigger animation on click
    setAnimate(false);
    setTimeout(() => setAnimate(true), 20);
  };

  return (
    <fieldset
      ref={switcherRef}
      className={`switcher ${animate ? 'animate' : ''}`}
      data-active={activeIndex}
    >
      {navItems.map((item, index) => (
        <label
          key={item.option}
          className={`switcher__option ${activeIndex === item.option ? 'active' : ''}`}
          onClick={() => handleClick(item.option, index)}
        >
          <Link to={item.path} title={item.label} aria-label={item.label}>
            <span className="switcher__icon" aria-hidden="true">{item.icon}</span>
          </Link>
        </label>
      ))}
    </fieldset>
  );
}

export default Navigation;
