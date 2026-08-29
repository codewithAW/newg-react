import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import GlassBackground from './components/GlassBackground/GlassBackground'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Websites from './pages/Websites'
import Contact from './pages/Contact'
import { ThemeProvider } from './hooks/useTheme'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlassBackground />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
