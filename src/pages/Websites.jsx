import React, { useEffect } from 'react'
import { gsap } from 'gsap'

import SplitText from '../components/SplitText/SplitText'
import TextType from '../components/TextType/TextType'
import './website.css'
import image from '../assets/images/ing.png'
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
          import('gsap/draggable'),
          import('gsap/scrolltrigger')
        ]);

        try {
          gsap.registerPlugin(Draggable, ScrollTrigger);
        } catch (e) {
          // ignore registration errors
        }

        if (Draggable && typeof Draggable.create === 'function') {
          draggable = Draggable.create(el, {
            type: 'x,y',
            inertia: true,
            onRelease: function () {
              gsap.to(this.target, { x: 0, y: 0, duration: 1.5, ease: 'elastic.out(1,0.3)' });
            }
          });
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
    <h2>Welcome to My Portfolio</h2>
    <p>
      I am a dedicated and highly skilled <strong>software developer</strong> with expertise in 
      <span className="highlight"> front-end technologies </span> and a passion for creating 
      intuitive, user-friendly web applications. My work is driven by a commitment to excellence 
      and continuous learning in the ever-evolving tech landscape.
    </p>
    <p>
      Over the years, I have gained hands-on experience with a variety of frameworks and libraries, 
      including <strong>React, TypeScript, and Node.js</strong>. I have also honed my skills in UI/UX 
      design, focusing on delivering visually appealing, functional, and responsive web interfaces.
    </p>
    <p>
      My goal is to collaborate on innovative projects that push the boundaries of what’s possible, 
      delivering high-quality solutions that make a real impact. Feel free to explore my work, 
      and let's connect to discuss how I can contribute to your next big project!
    </p>
    <p>
      I design and build scalable front‑end architectures and component libraries, with a strong focus on 
      accessibility and performance. Recent work includes performance optimisation of complex UI, creating
      reusable design systems, and crafting refined motion using GSAP to elevate user experiences.
    </p>

    <ul className="glass-skills">
      <li><strong>Skills:</strong>
        <span>React</span>
        <span>TypeScript</span>
        <span>CSS</span>
        <span>Accessibility</span>
      </li>
      <li><strong>Tools:</strong>
        <span>Vite</span>
        <span>Storybook</span>
        <span>ESLint</span>
      </li>
    </ul>
    <Link to="/contact" className="cta-button" aria-label="Go to contact page">Get In Touch</Link>
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
