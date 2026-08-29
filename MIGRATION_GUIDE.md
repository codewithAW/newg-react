# Migration Guide: HTML/CSS/JS to React

## What Was Changed

### 1. **Architecture**
- **Before:** Multi-page HTML files with shared CSS and JS
- **After:** Single Page Application (SPA) with React Router

### 2. **File Organization**
```
Before:
- index.html
- about.html
- contact.html
- styles.css
- app.js

After:
- src/pages/ (Home.jsx, About.jsx, Contact.jsx, etc.)
- src/components/ (Header, Navigation, ThemeToggle, etc.)
- src/styles/ (global.css, header.css, toggle.css, background.css)
- src/hooks/ (useTheme, useParallax)
- src/utils/ (icons)
```

### 3. **State Management**
- **Before:** DOM manipulation with `document.querySelector()`, global variables
- **After:** React hooks (useState, useContext, useEffect)

### 4. **Theme Toggle**
- **Before:** Direct DOM manipulation, GSAP animations
- **After:** Context API with `useTheme` hook, localStorage persistence

### 5. **Navigation**
- **Before:** Traditional page links with manual active state detection
- **After:** React Router v6 with automatic active state

### 6. **Mobile Menu**
- **Before:** Event listeners on DOM elements
- **After:** React state management with proper cleanup

## Functionality Preserved

✅ Glass-morphism design
✅ Liquid toggle animation
✅ Theme switching with fade effect
✅ Mobile responsive menu
✅ Logo popup
✅ Parallax background
✅ Navigation indicator
✅ SVG filters (goo effect)
✅ All CSS animations and transitions

## Key Improvements

1. **Component Reusability** - Shared components (Header, Navigation) across all pages
2. **Cleaner Code** - No DOM manipulation, declarative React patterns
3. **Better Performance** - Code splitting, route-based loading
4. **Maintainability** - Clear separation of concerns
5. **Scalability** - Easy to add new pages and components

## Breaking Changes

- HTML pages now served via React Router (no static HTML files)
- All navigation must go through React Router (no direct file links)
- Images must be in `public/` folder
- Configuration via `vite.config.js` instead of server.js

## Migrating Custom Content

### Adding New Pages

1. Create new file in `src/pages/`:
```jsx
// src/pages/MyPage.jsx
function MyPage() {
  return (
    <main className="main-content">
      <h1>My Page Title</h1>
      <p>Page content here</p>
    </main>
  )
}
export default MyPage
```

2. Add route in `src/App.jsx`:
```jsx
<Route path="/mypage" element={<MyPage />} />
```

3. Add navigation item in `src/components/Navigation/Navigation.jsx`:
```jsx
{ path: '/mypage', icon: myIcon, option: '6', label: 'My Page' }
```

### Adding New Images

1. Place image in `public/` folder
2. Reference with `/filename.ext`:
```jsx
<img src="/myimage.jpg" alt="Description" />
```

### Adding Global Styles

Add to `src/styles/global.css` or create new CSS file and import in `App.jsx`:
```jsx
import './styles/mycustom.css'
```

## Performance Considerations

- Lazy load routes for better code splitting
- Optimize images before adding to `public/`
- Use CSS variables for theming instead of inline styles
- Avoid unnecessary re-renders with proper dependency arrays

## Browser DevTools

- React DevTools extension for component debugging
- Network tab shows route-based code chunks
- Console warns about React best practices
