import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiHtml5, SiCss3, SiNextdotjs } from 'react-icons/si';
import './techOrb.css';

const TECHNOLOGIES = [
  { id: 'react', icon: <FaReact color="#61DAFB" />, radius: 38 },
  { id: 'next', icon: <SiNextdotjs color="#FFFFFF" />, radius: 34 },
  { id: 'js', icon: <SiJavascript color="#F7DF1E" />, radius: 30 },
  { id: 'ts', icon: <SiTypescript color="#3178C6" />, radius: 32 },
  { id: 'html', icon: <SiHtml5 color="#E34F26" />, radius: 28 },
  { id: 'css', icon: <SiCss3 color="#1572B6" />, radius: 28 },
  { id: 'node', icon: <FaNodeJs color="#339933" />, radius: 36 },
];

const WATERDROPS = Array.from({ length: 15 }).map((_, i) => ({
  id: `drop-${i}`,
  isDrop: true,
  radius: 6 + Math.random() * 6
}));

const ALL_ITEMS = [...TECHNOLOGIES, ...WATERDROPS];

const TechOrb3D = () => {
  const containerRef = useRef(null);
  const orbRef = useRef(null);
  const bubblesRef = useRef([]);
  const requestRef = useRef();
  
  // Physics state
  const physicsState = useRef(
    ALL_ITEMS.map((item) => ({
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100 - 200,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 2,
      radius: item.radius,
      mass: item.radius,
      active: false
    }))
  );

  // Interaction state
  const interactState = useRef({
    touchX: null,
    touchY: null,
    isTouching: false,
    tiltX: 0,
    tiltY: 0
  });

  useEffect(() => {
    // Drop-in entrance animation
    const timeline = gsap.timeline();
    
    // Animate orb appearance
    gsap.fromTo(orbRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );

    // Stagger bubbles becoming active in physics
    bubblesRef.current.forEach((el, index) => {
      timeline.to(el, {
        opacity: 1,
        duration: 0.3,
        onStart: () => {
          physicsState.current[index].active = true;
          // Give initial downward velocity
          physicsState.current[index].vy = 5 + Math.random() * 3;
        }
      }, index * 0.15);
    });

    let orbRadius = 150; // Will update based on actual DOM size

    const updatePhysics = () => {
      if (orbRef.current) {
        const rect = orbRef.current.getBoundingClientRect();
        orbRadius = rect.width / 2;
      }

      const state = physicsState.current;
      const { touchX, touchY, isTouching } = interactState.current;

      for (let i = 0; i < state.length; i++) {
        if (!state[i].active) continue;

        const p1 = state[i];

        // Soft drift / anti-gravity if not falling initially
        // Once they hit the bottom, we add a subtle random noise to velocity so they float
        if (p1.y > 0) {
           p1.vx += (Math.random() - 0.5) * 0.1;
           p1.vy += (Math.random() - 0.5) * 0.1;
           // Gentle pull to center to avoid them all clumping at the bottom
           p1.vx -= p1.x * 0.0005;
           p1.vy -= p1.y * 0.0005;
        }

        // Apply velocities
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Friction
        p1.vx *= 0.99;
        p1.vy *= 0.99;

        // Repulsion from touch
        if (isTouching && touchX !== null && touchY !== null) {
          const dx = p1.x - touchX;
          const dy = p1.y - touchY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100;
            p1.vx += (dx / dist) * force * 1.5;
            p1.vy += (dy / dist) * force * 1.5;
          }
        }

        // Boundary collision (inside orb)
        const distFromCenter = Math.sqrt(p1.x * p1.x + p1.y * p1.y);
        const maxDist = orbRadius - p1.radius - 4; // 4px padding
        
        if (distFromCenter > maxDist && maxDist > 0) {
          const nx = p1.x / distFromCenter;
          const ny = p1.y / distFromCenter;
          
          // Push back inside
          p1.x = nx * maxDist;
          p1.y = ny * maxDist;
          
          // Reflect velocity (bounce)
          const dot = p1.vx * nx + p1.vy * ny;
          p1.vx = (p1.vx - 2 * dot * nx) * 0.8; // 0.8 restitution (loss of energy)
          p1.vy = (p1.vy - 2 * dot * ny) * 0.8;
        }

        // Bubble collisions
        for (let j = i + 1; j < state.length; j++) {
          if (!state[j].active) continue;
          
          const p2 = state[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = p1.radius + p2.radius;

          if (dist < minDist && dist > 0) {
            // Soft overlap resolution
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            
            // Push apart
            const massRatio1 = p2.mass / (p1.mass + p2.mass);
            const massRatio2 = p1.mass / (p1.mass + p2.mass);
            
            p1.x -= nx * overlap * massRatio1 * 0.5;
            p1.y -= ny * overlap * massRatio1 * 0.5;
            p2.x += nx * overlap * massRatio2 * 0.5;
            p2.y += ny * overlap * massRatio2 * 0.5;

            // Simple elastic collision momentum transfer
            const kx = p1.vx - p2.vx;
            const ky = p1.vy - p2.vy;
            const dot = kx * nx + ky * ny;
            
            if (dot > 0) {
              const restitution = 0.5; // Soft bounce
              const impulse = (1 + restitution) * dot / (1/p1.mass + 1/p2.mass);
              
              p1.vx -= (impulse * nx) / p1.mass;
              p1.vy -= (impulse * ny) / p1.mass;
              p2.vx += (impulse * nx) / p2.mass;
              p2.vy += (impulse * ny) / p2.mass;
            }
          }
        }

        // Apply DOM transform
        if (bubblesRef.current[i]) {
          bubblesRef.current[i].style.transform = `translate3d(calc(-50% + ${p1.x}px), calc(-50% + ${p1.y}px), 0) rotate(${p1.x * 0.2}deg)`;
        }
      }

      // Smooth orb tilt return
      if (!interactState.current.isTouching) {
        interactState.current.tiltX += (0 - interactState.current.tiltX) * 0.05;
        interactState.current.tiltY += (0 - interactState.current.tiltY) * 0.05;
      }
      
      if (orbRef.current) {
         orbRef.current.style.transform = `rotateX(${interactState.current.tiltY}deg) rotateY(${interactState.current.tiltX}deg)`;
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
       requestRef.current = requestAnimationFrame(updatePhysics);
    } else {
       // Static fallback
       bubblesRef.current.forEach((el, index) => {
         const angle = (index / ALL_ITEMS.length) * Math.PI * 2;
         const dist = orbRadius * 0.5;
         const x = Math.cos(angle) * dist;
         const y = Math.sin(angle) * dist;
         gsap.to(el, { x: `calc(-50% + ${x}px)`, y: `calc(-50% + ${y}px)`, opacity: 1, duration: 1 });
       });
    }

    return () => {
      cancelAnimationFrame(requestRef.current);
      timeline.kill();
    };
  }, []);

  const handlePointerMove = (e) => {
    if (!orbRef.current || !interactState.current.isTouching) return;
    
    // Unified mouse/touch handling
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const rect = orbRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Coordinates relative to center
    const x = clientX - centerX;
    const y = clientY - centerY;
    
    interactState.current.touchX = x;
    interactState.current.touchY = y;
    
    // Tilt the orb based on pointer position (max 15 degrees)
    const tiltX = (x / (rect.width / 2)) * 15;
    const tiltY = -(y / (rect.height / 2)) * 15;
    
    interactState.current.tiltX = tiltX;
    interactState.current.tiltY = tiltY;
  };

  const handlePointerDown = (e) => {
    interactState.current.isTouching = true;
    handlePointerMove(e);
  };

  const handlePointerUp = () => {
    interactState.current.isTouching = false;
    interactState.current.touchX = null;
    interactState.current.touchY = null;
  };

  return (
    <div className="tech-orb-wrapper" ref={containerRef}>
      <div 
        className="tech-orb-sphere" 
        ref={orbRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div className="liquid-glass--bend" />
        <div className="liquid-glass--face" />
        <div className="liquid-glass--edge" />
        <div className="liquid-glass__content tech-orb-content">
          <div className="tech-orb-atmosphere"></div>
          {ALL_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => (bubblesRef.current[idx] = el)}
              className={item.isDrop ? "tech-orb-bubble waterdrop" : "tech-orb-bubble"}
              style={{ 
                width: `${item.radius * 2}px`, 
                height: `${item.radius * 2}px` 
              }}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechOrb3D;
