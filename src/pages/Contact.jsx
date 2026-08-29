import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { FaEnvelope, FaPhoneAlt, FaUserAlt } from 'react-icons/fa'
import TextType from '../components/TextType/TextType'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import image from '../assets/images/ing.webp'
import './contact.css'
import './Home.css'

function Contact() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const el = document.querySelector('.professional-text.liquid-glass');
    if (!el) return;

    let draggable = null;
    (async () => {
      try {
        const [{ Draggable }, { default: ScrollTrigger }] = await Promise.all([
          import('gsap/Draggable'),
          import('gsap/ScrollTrigger')
        ]);
        try { gsap.registerPlugin(Draggable, ScrollTrigger); } catch (e) {}

        if (Draggable && typeof Draggable.create === 'function') {
          if (window.innerWidth > 768) {
            draggable = Draggable.create(el, {
              type: 'x,y',
              inertia: true,
              onRelease: function () {
                gsap.to(this.target, { x: 0, y: 0, duration: 1.5, ease: 'elastic.out(1,0.3)' });
              }
            });
          }
        }
      } catch (err) {
        console.warn('Draggable/ScrollTrigger plugins not available', err);
      }
    })();

    return () => {
      if (draggable && draggable[0] && typeof draggable[0].kill === 'function') draggable[0].kill();
    };
  }, []);

  return (
    <main className="main-content">
      <div className="contact-container">
        <div className="container">
          <div className="text-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="contact-header" style={{ textAlign: 'left', marginBottom: '0' }}>
              <h1 style={{ textAlign: 'left' }}>Get in Touch</h1>
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
          </div>
          
          <div className="image-col" style={{ display: 'flex', justifyContent: 'center' }}>
            <ProfileCard
              className='image'
              name="Abdul Waheed"
              title="Software Engineer"
              handle="AWcodes"
              status="Online"
              contactText="Message Me"
              avatarUrl={image}
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                const nameInput = document.getElementById('name');
                if (nameInput) nameInput.focus();
              }}
              behindGlowEnabled={true}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            />
          </div>
        </div>

        <div className="professional-text liquid-glass is-expanded" aria-expanded="true" style={{ marginTop: '2rem', margin: '2rem auto' }}>
          <div className="liquid-glass--bend" />
          <div className="liquid-glass--face" />
          <div className="liquid-glass--edge" />
          <div className="liquid-glass__content">
            
            <div className="contact-cards">
              {[
                { icon: <FaUserAlt className="contact-icon" />, title: 'Name', value: 'Abdul Waheed', href: null },
                { icon: <FaEnvelope className="contact-icon" />, title: 'Email', value: 'codewithabduulwaheed@gmail.com', href: 'mailto:codewithabduulwaheed@gmail.com' },
                { icon: <FaPhoneAlt className="contact-icon" />, title: 'Phone', value: '03362831969', href: 'tel:03362831969' }
              ].map((card, idx) => (
                card.href ? (
                  <a key={idx} href={card.href} className="contact-card">
                    <div className="icon-wrapper">{card.icon}</div>
                    <h3>{card.title}</h3>
                    <p>{card.value}</p>
                  </a>
                ) : (
                  <div key={idx} className="contact-card">
                    <div className="icon-wrapper">{card.icon}</div>
                    <h3>{card.title}</h3>
                    <p>{card.value}</p>
                  </div>
                )
              ))}
            </div>

            <div className="contact-form-container" style={{ background: 'transparent', border: 'none', padding: '0', marginTop: '3rem', backdropFilter: 'none' }}>
              <h2>Send a Message</h2>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="4" placeholder="How can I help you?"></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>

          </div>
        </div>

        <svg style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg">
          <filter id="glass-blur" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="1" result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="200" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

      </div>
    </main>
  )
}

export default Contact
