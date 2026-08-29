import React from 'react'
import { FaEnvelope, FaPhoneAlt, FaUserAlt } from 'react-icons/fa'
import TextType from '../components/TextType/TextType'
import './contact.css'

function Contact() {
  return (
    <main className="main-content">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <TextType 
            className="contact-subtitle"
            text={["We'd love to hear from you.", "Let's build something amazing together!", "Don't hesitate to reach out!"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            deletingSpeed={50}
            variableSpeed={false}
            cursorBlinkDuration={0.5}
          />
        </div>

        <div className="contact-cards">
          <div className="contact-card">
            <div className="icon-wrapper">
              <FaUserAlt className="contact-icon" />
            </div>
            <h3>Name</h3>
            <p>Abdul Waheed</p>
          </div>
          
          <a href="mailto:codewithabduulwaheed@gmail.com" className="contact-card">
            <div className="icon-wrapper">
              <FaEnvelope className="contact-icon" />
            </div>
            <h3>Email</h3>
            <p>codewithabduulwaheed@gmail.com</p>
          </a>

          <a href="tel:03362831969" className="contact-card">
            <div className="icon-wrapper">
              <FaPhoneAlt className="contact-icon" />
            </div>
            <h3>Phone</h3>
            <p>03362831969</p>
          </a>
        </div>
      </div>
    </main>
  )
}

export default Contact
