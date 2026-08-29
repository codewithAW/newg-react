import { useEffect } from 'react'

export function useParallax() {
  useEffect(() => {
    const glassBg = document.querySelector('.glass-bg')
    
    if (!glassBg) return

    const updateParallax = () => {
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollY = window.scrollY
      const maxScroll = Math.max(1, documentHeight - viewportHeight)

      const speed = viewportHeight / maxScroll
      const translateY = Math.min(scrollY * speed, viewportHeight)

      glassBg.style.backgroundPosition = `center ${translateY}px`
    }

    updateParallax()
    window.addEventListener('scroll', updateParallax, { passive: true })
    window.addEventListener('resize', updateParallax)

    return () => {
      window.removeEventListener('scroll', updateParallax)
      window.removeEventListener('resize', updateParallax)
    }
  }, [])
}
