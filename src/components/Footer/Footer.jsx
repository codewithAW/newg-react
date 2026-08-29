import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <h3 className="footer-brand-title" title="Abdul Waheed Software">AWS</h3>
          <p className="footer-description">
            Crafting elegant digital experiences with modern React and cutting-edge design principles.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section footer-links">
          <h4 className="footer-section-title">Quick Links</h4>
          <nav className="footer-nav">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/experience" className="footer-link">Experience</Link>
            <Link to="/websites" className="footer-link">Websites</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </nav>
        </div>

        {/* Social Media Section */}
        <div className="footer-section footer-social">
          <h4 className="footer-section-title">Connect</h4>
          <div className="social-icons">
            <a
              href="https://web.facebook.com/profile.php?id=61593986908807"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Facebook"
              title="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/codewithaw/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
              title="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@CodeWithAbdulWaheed"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="YouTube"
              title="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/in/abdul-waheed-1ba53542a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="X (Twitter)"
              title="X (Twitter)"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com/codewithAW"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
              title="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} <span title="Abdul Waheed Software">AWS</span>. All rights reserved. | Designed with <span className="heart">❤</span> using React & Vite
        </p>
      </div>
    </footer>
  )
}

export default Footer
