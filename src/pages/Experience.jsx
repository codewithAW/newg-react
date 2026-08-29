import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import SplitText from '../components/SplitText/SplitText'
import TextType from '../components/TextType/TextType'
import './Experience.css'
import image from '../assets/images/ing.png'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import { Link } from 'react-router-dom'

function Experience() {
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

  const skillsRef = useRef(null)

  useEffect(() => {
    const wrapper = skillsRef.current
    if (!wrapper) return

    const cards = Array.from(wrapper.querySelectorAll('.skill-card'))

    const animateCard = (card) => {
      const fill = card.querySelector('.progress-fill')
      const pct = Number(card.getAttribute('data-percent')) || 0
      if (!fill) return
      // animate width
      fill.style.width = pct + '%'

      // animate number
      const label = card.querySelector('.skill-percentage')
      if (!label) return
      let start = null
      const duration = 900
      const initial = 0
      const animate = (timestamp) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const value = Math.round(initial + (pct - initial) * progress)
        label.textContent = value + '%'
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((c) => animateCard(c))
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  return (
    <main className="main-content">
          <div className='container'>
      <div className='text-col'>
      <SplitText
        text="My Skills"
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
        text={"Included but not limited to... "}
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
        text={["HTML", "CSS", "JavaScript", "React", "TypeScript", "Node.js", "MangoDB", "Git", "GitHub", "SQL"]}
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
          {/* Skills cards area inside the glass */}
          <div className="skills-wrapper" ref={skillsRef}>
            <div className="skills-grid">
              {[
                ['HTML', 90],
                ['CSS', 90],
                ['JavaScript', 85],
                ['React', 85],
                ['Next.js', 80],
                ['TypeScript', 80],
                ['MongoDB', 80],
                ['MySQL', 80]
              ].map(([name, percent]) => (
                <div key={name} className="skill-card" data-percent={percent}>
                  <div className="skill-row">
                    <div className="skill-name">{name}</div>
                    <div className="skill-percentage">0%</div>
                  </div>
                  <div className="progress-bar" aria-hidden>
                    <div className="progress-fill" style={{ width: 0 }} />
                  </div>
                </div>
              ))}
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

      
      {/* Skills cards area */}

    </main>
  )
}

export default Experience
