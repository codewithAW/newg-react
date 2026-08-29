import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { FaReact, FaNodeJs, FaGithub, FaFigma } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiMongodb, SiNextdotjs } from 'react-icons/si'

import SplitText from '../components/SplitText/SplitText'
import TextType from '../components/TextType/TextType'
import './Home.css'
import image from '../assets/images/ing.webp'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import TechOrb3D from '../components/TechOrb3D/TechOrb3D'
import { Link } from 'react-router-dom'  

function Home() {
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

    // Click / keyboard expand functionality removed per request.
    // Draggable remains enabled for dragging the glass around.

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
      <TechOrb3D />
<div className="professional-text liquid-glass is-expanded" aria-expanded="true">
  <div className="liquid-glass--bend" />
  <div className="liquid-glass--face" />
  <div className="liquid-glass--edge" />
  <div className="liquid-glass__content">
    <h2>Engineering Premium Digital Experiences</h2>
    <p>
      I build <span className="highlight">scalable frontend architectures</span> and robust web applications 
      that prioritize performance, accessibility, and exceptional user experience. I bridge the gap between 
      meticulous design and complex engineering.
    </p>
    <p>
      Specializing in <strong>React, TypeScript, and modern JavaScript ecosystems</strong>, I deliver 
      high-impact solutions ranging from performance-optimized complex UIs to reusable design systems 
      and refined micro-interactions.
    </p>
    <p>
      My approach is deliberate and detail-oriented. I believe that true engineering excellence 
      means writing code that is not only functional but maintainable, accessible to all users, 
      and inherently performant by default.
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

    <div className="services-grid">
      <div className="service-card">
        <h3>UI/UX Design</h3>
        <p>Crafting beautiful, intuitive interfaces that prioritize user experience and aesthetic excellence.</p>
      </div>
      <div className="service-card">
        <h3>Web Development</h3>
        <p>Building robust, scalable frontend architectures using modern React and TypeScript ecosystems.</p>
      </div>
      <div className="service-card">
        <h3>Performance Focus</h3>
        <p>Optimizing web applications for maximum speed, accessibility, and smooth animations.</p>
      </div>
    </div>

    <Link to="/contact" className="cta-button" aria-label="Go to contact page">Get In Touch</Link>
  </div>
</div>

<svg style={{display: 'none'}} xmlns="http://www.w3.org/2000/svg">
  <filter id="glass-blur" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
    <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="1" result="turbulence" />
    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="200" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>

      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content">
          <div className="marquee-item"><FaReact /> React</div>
          <div className="marquee-item"><SiTypescript /> TypeScript</div>
          <div className="marquee-item"><FaNodeJs /> Node.js</div>
          <div className="marquee-item"><SiTailwindcss /> Tailwind</div>
          <div className="marquee-item"><SiNextdotjs /> Next.js</div>
          <div className="marquee-item"><SiMongodb /> MongoDB</div>
          <div className="marquee-item"><FaFigma /> Figma</div>
          <div className="marquee-item"><FaGithub /> GitHub</div>
          {/* Duplicate for infinite effect */}
          <div className="marquee-item"><FaReact /> React</div>
          <div className="marquee-item"><SiTypescript /> TypeScript</div>
          <div className="marquee-item"><FaNodeJs /> Node.js</div>
          <div className="marquee-item"><SiTailwindcss /> Tailwind</div>
          <div className="marquee-item"><SiNextdotjs /> Next.js</div>
          <div className="marquee-item"><SiMongodb /> MongoDB</div>
          <div className="marquee-item"><FaFigma /> Figma</div>
          <div className="marquee-item"><FaGithub /> GitHub</div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2 className="section-title">What Clients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"Abdul transformed our outdated website into a modern, lightning-fast application. His attention to detail and design sense is unmatched!"</p>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Habib Ullah</h4>
                <span>CEO, TechStart</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"An absolute pleasure to work with. He delivered our e-commerce dashboard ahead of schedule and the code quality was exceptional."</p>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Muhammed Sheraz</h4>
                <span>Product Manager</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"The new animations and UI improvements increased our user engagement by 40%. Highly recommend for any complex frontend projects."</p>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>Farhadullah</h4>
                <span>Design Lead</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default Home
