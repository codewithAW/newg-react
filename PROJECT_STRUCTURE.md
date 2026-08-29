# Project Structure & File Organization

```
newg-react/
│
├── 📄 package.json           # Project dependencies and scripts
├── 📄 vite.config.js         # Vite build configuration
├── 📄 index.html             # HTML entry point
├── 📄 .gitignore             # Git ignore rules
├── 📄 README.md              # Comprehensive documentation
├── 📄 QUICKSTART.md          # Quick start guide
└── 📄 MIGRATION_GUIDE.md     # Migration from HTML/JS to React
│
├── 📁 public/                # Static assets (served as-is)
│   ├── day.jpg               # Background image - light theme
│   ├── night.jpg             # Background image - dark theme
│   └── image (2).png         # Logo image
│
└── 📁 src/                   # Source code
    │
    ├── 📄 main.jsx           # Application entry point
    ├── 📄 App.jsx            # Root App component with routing
    │
    ├── 📁 components/        # Reusable React components
    │   │
    │   ├── 📁 Header/
    │   │   ├── Header.jsx     # Main header component
    │   │   └── Header.css
    │   │
    │   ├── 📁 Navigation/
    │   │   ├── Navigation.jsx # Navigation bar with router
    │   │   └── Navigation.css
    │   │
    │   ├── 📁 ThemeToggle/
    │   │   ├── ThemeToggle.jsx # Liquid toggle button
    │   │   └── ThemeToggle.css
    │   │
    │   ├── 📁 MobileMenu/
    │   │   ├── MobileMenu.jsx # Mobile sidebar menu
    │   │   └── MobileMenu.css
    │   │
    │   ├── 📁 Logo/
    │   │   ├── Logo.jsx       # Logo with popup
    │   │   └── Logo.css
    │   │
    │   └── 📁 GlassBackground/
    │       └── GlassBackground.jsx # Background container
    │
    ├── 📁 pages/             # Page components (routable)
    │   ├── Home.jsx          # Homepage (route: /)
    │   ├── About.jsx         # About page (route: /about)
    │   ├── Experience.jsx    # Experience page (route: /experience)
    │   ├── Websites.jsx      # Websites page (route: /websites)
    │   └── Contact.jsx       # Contact page (route: /contact)
    │
    ├── 📁 hooks/             # Custom React hooks
    │   ├── useTheme.jsx      # Theme context and toggle hook
    │   └── useParallax.js    # Parallax scroll effect hook
    │
    ├── 📁 utils/             # Utility functions and constants
    │   └── icons.jsx         # SVG icon components
    │
    └── 📁 styles/            # Global and shared styles
        ├── global.css        # Global styles, animations, responsive
        ├── header.css        # Header component styles
        ├── background.css    # Background component styles
        └── toggle.css        # Toggle button and transitions
```

## Component Hierarchy

```
<App>
  ├── <ThemeProvider>
  │   └── <Router>
  │       ├── <GlassBackground />
  │       │
  │       ├── <Header>
  │       │   ├── <MobileMenu />
  │       │   │   └── Mobile Navigation + Theme Toggle
  │       │   │
  │       │   └── <div class="glass-button">
  │       │       ├── <Logo />
  │       │       ├── <Navigation />
  │       │       └── <ThemeToggle />
  │       │
  │       └── <Routes>
  │           ├── <Route path="/" element={<Home />} />
  │           ├── <Route path="/about" element={<About />} />
  │           ├── <Route path="/experience" element={<Experience />} />
  │           ├── <Route path="/websites" element={<Websites />} />
  │           └── <Route path="/contact" element={<Contact />} />
```

## Data Flow

```
User Interaction
    ↓
React Component (setState/hooks)
    ↓
Re-render UI
    ↓
CSS Animations (GSAP/CSS)
    ↓
Updated DOM
```

### Example: Theme Toggle
```
User clicks toggle
    ↓
ThemeToggle.jsx onClick handler
    ↓
useTheme().toggleTheme()
    ↓
ThemeContext updates isDark state
    ↓
GlassBackground re-renders
    ↓
CSS variables updated
    ↓
Smooth fade transition (CSS)
```

## File Size Reference

| Type | Purpose | Count |
|------|---------|-------|
| Components | Reusable UI pieces | 6 |
| Pages | Route destinations | 5 |
| Hooks | State/side-effects | 2 |
| CSS Files | Styling | 4 |
| Utils | Icons & helpers | 1 |

## Module Dependencies

```
App.jsx
  ├── Header.jsx
  │   ├── Navigation.jsx
  │   ├── ThemeToggle.jsx
  │   ├── Logo.jsx
  │   ├── MobileMenu.jsx
  │   └── useParallax hook
  │
  ├── GlassBackground.jsx
  │
  ├── Pages (Home, About, etc.)
  │
  ├── ThemeProvider (useTheme hook)
  │
  └── Styles
      ├── global.css
      ├── header.css
      ├── toggle.css
      └── background.css
```

## Development Workflow

1. **Edit component** in `src/components/` or `src/pages/`
2. **Vite detects change** (HMR - Hot Module Replacement)
3. **React re-renders** affected components
4. **Changes appear** in browser instantly
5. **No page reload** needed

## Build Output

```
dist/                  # Production build output
├── index.html        # Minified HTML
├── assets/           # Bundled JS/CSS
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
└── (other assets)
```

## Performance Tips

### For Development
- Use React DevTools extension
- Keep components small and focused
- Use meaningful component names

### For Production
- Run `npm run build`
- Use `npm run preview` to test build
- Check bundle size with analysis tools

### CSS Optimization
- CSS is minified in production
- Unused styles removed (if using PurgeCSS)
- All animations preserved

---

**Next:** See [QUICKSTART.md](./QUICKSTART.md) to get started! 🚀
