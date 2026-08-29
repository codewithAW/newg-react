import React, { useState } from 'react'
import { NavIcons } from '../../utils/icons'
import './Logo.css'
import logoImg from "../../assets/images/newlogo.jpg";
function Logo() {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <div className="glass-left logo-container-hover">
      <img
        className="logoimg"
        src={logoImg}
        alt="Logo"
        onClick={() => setShowPopup(!showPopup)}
      />
      <span className="logo-hover-text">Abdulwaheed Software</span>
      <div className={`logo-popup ${showPopup ? 'active' : ''}`}>
        <img className="logoimg" src={logoImg} alt="Logo" />
      </div>
    </div>
  )
}

export default Logo
