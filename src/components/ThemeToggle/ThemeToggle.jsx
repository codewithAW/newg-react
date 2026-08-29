import React, { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import './ThemeToggle.css'
import gsap from 'gsap'
import '../../styles/toggle.css'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const [complete, setComplete] = useState(isDark ? 100 : 0)
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    setComplete(isDark ? 100 : 0)
  }, [isDark])

  const handleClick = () => {
    setPressed(true)
    setActive(true)

    const newThemeIsDark = !isDark
    const root = document.documentElement

    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({
        onComplete: () => {
          setActive(false)
          setPressed(false)
          toggleTheme()
        },
      })

      // Animate the liquid toggle
      tl.to(
        { val: complete },
        {
          val: newThemeIsDark ? 100 : 0,
          duration: 0.12,
          delay: 0.1,
          onUpdate: function () {
            setComplete(Math.round(this.targets()[0].val))
          },
        }
      )

      // Animate text color
      tl.to(
        root,
        {
          '--text-color': newThemeIsDark ? '#ffffff' : '#0f172a',
          duration: 0.2,
          ease: 'power1.out',
        },
        '<'
      )

      // Animate background crossfade using opacity
      tl.to(
        root,
        {
          '--bg-opacity': 0,
          duration: 0.15,
          ease: 'power1.out',
          onComplete: () => {
            // Swap background image after fade out
            root.style.setProperty(
              '--bg-image',
              newThemeIsDark ? 'var(--bg-night)' : 'var(--bg-day)'
            )
          },
        },
        '<'
      ).to(
        root,
        {
          '--bg-opacity': 1,
          duration: 0.15,
          ease: 'power1.out',
        }
      )
    } else {
      // Fallback if GSAP not available
      toggleTheme()
    }
  }
  

  return (
    <div className="glass-right">
      <button
        aria-label="toggle theme"
        aria-pressed={isDark}
        className="liquid-toggle"
        onClick={handleClick}
        data-pressed={pressed}
        data-active={active}
        data-bounce="true"
        data-mapped="false"
        style={{
          '--complete': complete,
          '--hue': 144,
        }}
      >
        <div className="knockout">
          <div className="indicator indicator--masked">
            <div className="mask"></div>
          </div>
        </div>
        <div className="indicator__liquid">
          <div className="shadow"></div>
          <div className="wrapper">
            <div className="liquids">
              <div className="liquid__shadow"></div>
              <div className="liquid__track"></div>
            </div>
          </div>
          <div className="cover"></div>
        </div>
      </button>
    </div>
  )
}

export default ThemeToggle
