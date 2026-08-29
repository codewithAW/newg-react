import React, { useState } from 'react'
import { NavIcons } from '../../utils/icons'
import './Logo.css'
import logoImg from "../../assets/images/logo.webp";
function Logo() {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div className="glass-left">
      <img
        className="logoimg"
        src={logoImg}
        alt="Logo"
        onClick={() => setShowPopup(!showPopup)}
      />
      <div className={`logo-popup ${showPopup ? 'active' : ''}`}>
        <img className="logoimg" src={logoImg} alt="Logo" />
      </div>
    </div>
  )
}

export default Logo
