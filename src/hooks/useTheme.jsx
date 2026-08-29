import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved preference or system preference
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const darkMode = saved ? saved === 'dark' : prefersDark
    setIsDark(darkMode)
    applyTheme(darkMode)
  }, [])

  const applyTheme = (dark) => {
    const root = document.documentElement
    root.dataset.theme = dark ? 'dark' : 'light'
    
    // Explicitly enforce text colors to prevent any CSS overriding issues
    root.style.setProperty('--text-color', dark ? '#ffffff' : '#0f172a')
    root.style.setProperty('--text-muted', dark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(15, 23, 42, 0.75)')
    
    const bgElement = document.querySelector('.glass-bg')
    if (bgElement) {
      bgElement.style.setProperty(
        '--bg-image',
        dark ? 'var(--bg-night)' : 'var(--bg-day)'
      )
    }
  }

  const toggleTheme = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
    applyTheme(newDarkMode)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
