import React, { useEffect } from 'react'
import { gsap } from 'gsap'

import SplitText from '../components/SplitText/SplitText'
import TextType from '../components/TextType/TextType'
import './website.css'
import image from '../assets/images/ing.webp'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import { Link } from 'react-router-dom'

function Websites() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const el = document.querySelector('.professional-text.liquid-glass');
    if (!el) return;

    // Dynamically import Draggable & ScrollTrigger to avoid ReferenceErrors in environments where plugins are absent
    let draggable = null;
    (async () => {
      try {
        const [{ Draggable }, { default: ScrollTrigger }] = await Promise.all([
          import('gsap/Draggable'),
          import('gsap/ScrollTrigger')
        ]);

        try {
          gsap.registerPlugin(Draggable, ScrollTrigger);
        } catch (e) {
          // ignore registration errors
        }

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
        // Plugin(s) not available; keep app running without draggable
        console.warn('Draggable/ScrollTrigger plugins not available', err);
      }
    })();

    return () => {
      if (draggable && draggable[0] && typeof draggable[0].kill === 'function') draggable[0].kill();
    };
  }, []);

  return (
    <main className="main-content">
          <div className='container'>
      <div className='text-col'>
      <SplitText
        text="Hallo there!"
        className="home-split"
        delay={120}
        duration={0.55}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="left"
        onLetterAnimationComplete={handleAnimationComplete}
      />

      <SplitText
        text={"I'm Abdul Waheed"}
        className="name-split test2"
        delay={340}
        duration={0.7}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 36 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.05}
        rootMargin="-80px"
        textAlign="left"
        onLetterAnimationComplete={handleAnimationComplete}
      />

      <TextType 
        className="intro-type text-type"
        text={["Advanced Web Developer", "Mobile App Developer", "UI/UX designer!"]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor
        cursorCharacter="_"
        deletingSpeed={50}
        variableSpeed={false}
        cursorBlinkDuration={0.5}
      />

      </div>
      <div className='image-col'>
        <ProfileCard
          className='image'
          name="Abdul Waheed"
          title="Software Engineer"
          handle="AWcodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl={image}
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log('Contact clicked')}
          behindGlowEnabled={true}
          behindGlowColor="rgba(125, 190, 255, 0.67)"
          innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />
      </div>
      </div>
<div className="professional-text liquid-glass is-expanded" aria-expanded="true">
  <div className="liquid-glass--bend" />
  <div className="liquid-glass--face" />
  <div className="liquid-glass--edge" />
  <div className="liquid-glass__content">
    <h2 style={{ marginBottom: '2rem' }}>Featured Projects</h2>
      
      <div className="projects-grid">
        <div className="project-card">
          <div className="project-content">
            <h3>E-Commerce Dashboard</h3>
            <p>A full-stack admin dashboard for managing products, orders, and analytics with real-time updates.</p>
            <div className="project-tags">
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link" aria-label="View live site">Live Demo</a>
              <a href="#" className="project-link outline" aria-label="View source code">GitHub</a>
            </div>
          </div>
        </div>

        <div className="project-card">
          <div className="project-content">
            <h3>Task Manager Pro</h3>
            <p>A collaborative project management tool featuring drag-and-drop kanban boards and team chat.</p>
            <div className="project-tags">
              <span>TypeScript</span>
              <span>Next.js</span>
              <span>Tailwind</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link" aria-label="View live site">Live Demo</a>
              <a href="#" className="project-link outline" aria-label="View source code">GitHub</a>
            </div>
          </div>
        </div>

        <div className="project-card">
          <div className="project-content">
            <h3>AI Image Generator</h3>
            <p>A web interface for generating and editing images using custom machine learning models and APIs.</p>
            <div className="project-tags">
              <span>React</span>
              <span>Python</span>
              <span>FastAPI</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link" aria-label="View live site">Live Demo</a>
              <a href="#" className="project-link outline" aria-label="View source code">GitHub</a>
            </div>
          </div>
        </div>
        
        <div className="project-card">
          <div className="project-content">
            <h3>Portfolio Website</h3>
            <p>The website you're looking at right now! Built with advanced GSAP animations and glassmorphism UI.</p>
            <div className="project-tags">
              <span>React</span>
              <span>GSAP</span>
              <span>CSS</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link outline" aria-label="View source code">GitHub</a>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>

<svg style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg">
  <filter id="glass-blur" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
    <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="1" result="turbulence" />
    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="200" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>


    </main>
  )
}

export default Websites
