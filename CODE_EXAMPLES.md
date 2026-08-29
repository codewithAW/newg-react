# Code Examples & Common Tasks

## 🎯 Quick Code Examples

### 1. Using the Theme Hook

```jsx
import { useTheme } from '../hooks/useTheme'

function MyComponent() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default MyComponent
```

### 2. Using React Router Navigation

```jsx
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  return (
    <nav>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        Home
      </Link>
      <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
        About
      </Link>
    </nav>
  )
}

export default Navigation
```

### 3. Creating a New Page

```jsx
// src/pages/MyNewPage.jsx
function MyNewPage() {
  return (
    <main className="main-content">
      <h1>My New Page</h1>
      <p>Add your content here</p>
    </main>
  )
}

export default MyNewPage
```

Then add to `App.jsx`:
```jsx
import MyNewPage from './pages/MyNewPage'

<Route path="/mynewpage" element={<MyNewPage />} />
```

### 4. Creating a Custom Hook

```jsx
// src/hooks/useCustomHook.js
import { useState, useEffect } from 'react'

export function useCustomHook() {
  const [state, setState] = useState(null)

  useEffect(() => {
    // Do something on mount
    return () => {
      // Cleanup on unmount
    }
  }, [])

  return { state, setState }
}
```

### 5. Creating a Reusable Component

```jsx
// src/components/MyComponent/MyComponent.jsx
import './MyComponent.css'

function MyComponent({ title, children }) {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export default MyComponent
```

Usage:
```jsx
<MyComponent title="Hello">
  <p>This is the content</p>
</MyComponent>
```

## 🎨 Styling Examples

### 1. Add a New CSS Module

Create `src/styles/mycustom.css`:
```css
.my-custom-class {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.my-custom-class:hover {
  background: rgba(255, 255, 255, 0.15);
}

@media (max-width: 768px) {
  .my-custom-class {
    flex-direction: column;
    padding: 15px;
  }
}
```

Then import in `App.jsx`:
```jsx
import './styles/mycustom.css'
```

### 2. Using CSS Variables

```css
/* In src/styles/global.css */
:root {
  --my-color: #0052f5;
  --my-spacing: 20px;
}

/* In component CSS */
.my-element {
  color: var(--my-color);
  padding: var(--my-spacing);
}

/* Dark mode */
[data-theme="dark"] {
  --my-color: #40a9ff;
}
```

### 3. Glass-Morphism Pattern

```css
.glass-effect {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.08) 100%
  );
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
}
```

## 🔗 Common Tasks

### Task 1: Add a Button with Click Handler

```jsx
import { useState } from 'react'

function MyButton() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  )
}

export default MyButton
```

### Task 2: Fetch Data from API

```jsx
import { useState, useEffect } from 'react'

function DataFetcher() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return <div>{/* Display data */}</div>
}

export default DataFetcher
```

### Task 3: Handle Form Input

```jsx
import { useState } from 'react'

function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    // Submit form data
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default MyForm
```

### Task 4: Conditional Rendering

```jsx
function ConditionalComponent({ isLoggedIn, user }) {
  // If/else style
  if (!isLoggedIn) {
    return <p>Please log in</p>
  }

  // Ternary operator
  return isLoggedIn ? (
    <p>Welcome, {user.name}!</p>
  ) : (
    <p>Not logged in</p>
  )

  // Logical AND operator
  return (
    <>
      {isLoggedIn && <p>Welcome, {user.name}!</p>}
      {!isLoggedIn && <p>Please log in</p>}
    </>
  )
}

export default ConditionalComponent
```

### Task 5: Animation with GSAP

```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function AnimatedBox() {
  const boxRef = useRef(null)

  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        duration: 1,
        x: 100,
        rotation: 360,
        ease: 'back.out',
      })
    }
  }, [])

  return <div ref={boxRef} style={{ width: '100px', height: '100px', backgroundColor: 'blue' }} />
}

export default AnimatedBox
```

## 📋 File Modifications

### Adding CSS to Component

Create `src/components/MyComponent/MyComponent.css`:
```css
.my-component {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

Then in component:
```jsx
import './MyComponent.css'

function MyComponent() {
  return <div className="my-component">Content</div>
}
```

### Export Multiple Items from File

```jsx
// src/utils/helpers.js
export function helper1() { /* ... */ }
export function helper2() { /* ... */ }
export const constant1 = 'value'

// Usage
import { helper1, helper2 } from '../utils/helpers'
```

### Re-export Components

```jsx
// src/components/index.js
export { default as Header } from './Header/Header'
export { default as Navigation } from './Navigation/Navigation'

// Usage
import { Header, Navigation } from '../components'
```

## 🔄 State Management Patterns

### Simple State
```jsx
const [value, setValue] = useState(initialValue)
```

### Complex State
```jsx
const [state, setState] = useState({
  property1: value1,
  property2: value2,
})

setState(prev => ({
  ...prev,
  property1: newValue
}))
```

### Multiple Related States
```jsx
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
```

### Context API
```jsx
// Create context
const MyContext = createContext()

// Provide context
<MyContext.Provider value={{ state, dispatch }}>
  <App />
</MyContext.Provider>

// Use context
const { state, dispatch } = useContext(MyContext)
```

## 🧪 Debugging Tips

### Console Logging

```jsx
function MyComponent() {
  console.log('Component mounted')
  
  useEffect(() => {
    console.log('Effect ran', dependency)
  }, [dependency])

  return <div>Check console</div>
}
```

### React DevTools

1. Install React DevTools extension
2. Open DevTools (F12)
3. Go to React tab
4. Inspect components, state, props

### Network Tab

1. Open DevTools
2. Go to Network tab
3. Reload page
4. See all requests/responses

### Performance

```jsx
useEffect(() => {
  console.time('myTimer')
  // Do something
  console.timeEnd('myTimer')
}, [])
```

## 📦 Common npm Commands

```bash
# Add new dependency
npm install package-name

# Remove dependency
npm uninstall package-name

# Update dependencies
npm update

# Check outdated packages
npm outdated

# Audit security
npm audit

# Clean cache
npm cache clean --force
```

---

**More examples available in the component source code!** Each component has detailed comments explaining the patterns used. 📚
