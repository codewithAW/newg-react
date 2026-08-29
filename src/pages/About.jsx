import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import SplitText from '../components/SplitText/SplitText'
import TextType from '../components/TextType/TextType'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import './Home.css'
import image from '../assets/images/ing.webp'

function About() {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!')
  }

+  useEffect(() => {
    if (typeof window === 'undefined') return;

    const el = document.querySelector('.professional-text.liquid-glass');
    if (!el) return;

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
          <h2>About Me</h2>
          <p>
            I'm Abdul Waheed, a 21-year-old web developer who builds clear, user-focused digital experiences.
            I approach design and development with a deliberate, detail-oriented mindset and a focus on
            creating interfaces that feel intuitive and purposeful.
          </p>

          <p>
            Curiosity drives my work — I continually learn and refine my approach to make thoughtful,
            reliable decisions rather than chasing trends. I pay careful attention to detail and strive for
            clarity in how interfaces communicate and behave.
          </p>

          <p>
            Calm, confident, and professional in my approach, I collaborate openly and prioritize delivering
            considered, trustworthy results. I welcome conversations about meaningful projects and
            constructive collaboration.
          </p>

          <h3 className="timeline-title">My Journey</h3>
          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Computer Science Degree</h4>
                <span>University Placeholder &bull; 2021 - 2025</span>
                <p>Focusing on software engineering, algorithms, and human-computer interaction.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>Freelance Web Developer</h4>
                <span>Self-Employed &bull; 2023 - Present</span>
                <p>Designed and built custom React applications for small businesses, improving their digital presence.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4>First Open Source Contribution</h4>
                <span>GitHub &bull; 2022</span>
                <p>Started contributing to open-source libraries, gaining experience in collaborative development and version control.</p>
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

export default About
