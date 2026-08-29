import React from 'react'
import { Link } from 'react-router-dom'
import SplitText from '../components/SplitText/SplitText'
import './Home.css'

function NotFound() {
  return (
    <main className="main-content">
      <SplitText text="404 Not Found" className="page-title" />
      <div className="professional-text liquid-glass is-expanded" style={{ margin: '0 auto', maxWidth: '600px', textAlign: 'center' }}>
        <div className="liquid-glass--bend"></div>
        <div className="liquid-glass--face"></div>
        <div className="liquid-glass--edge"></div>
        
        <div className="liquid-glass__content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className="cta-button" style={{ marginTop: '1.5rem' }}>
            Return Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
