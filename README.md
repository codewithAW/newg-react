# Glass Morphism Website - React + Vite

A modern, fully responsive website converted from vanilla HTML/CSS/JS to React with Vite. Features a beautiful glass-morphism design with smooth animations and theme switching.

## Features

✨ **Glass-Morphism Design** - Modern glassmorphic UI with backdrop blur effects
🌓 **Theme Toggle** - Smooth light/dark mode switching with GSAP animations
📱 **Fully Responsive** - Mobile-first design with smooth mobile menu
🚀 **React Hooks** - Functional components with custom hooks for state management
⚡ **Vite Build** - Lightning-fast build tool and development server
🎨 **Smooth Animations** - Liquid toggle button, liquid menu animations, and parallax effects
🔀 **SPA Navigation** - React Router for seamless page transitions

## Project Structure

```
newg-react/
├── public/                          # Static assets
│   ├── day.jpg                     # Day theme background
│   ├── night.jpg                   # Night theme background
│   └── image (2).png               # Logo image
├── src/
│   ├── components/
│   │   ├── GlassBackground/        # Background component
│   │   ├── Header/                 # Main header component
│   │   ├── Logo/                   # Logo with popup
│   │   ├── Navigation/             # Navigation bar
│   │   ├── ThemeToggle/            # Theme toggle button
│   │   └── MobileMenu/             # Mobile menu
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Websites.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   ├── global.css              # Global styles
│   │   ├── header.css              # Header styles
│   │   ├── background.css          # Background styles
│   │   └── toggle.css              # Toggle button styles
│   ├── hooks/
│   │   ├── useTheme.jsx            # Theme context and hook
│   │   └── useParallax.js          # Parallax effect hook
│   ├── utils/
│   │   └── icons.jsx               # SVG icon components
│   ├── App.jsx                     # Main app component
│   └── main.jsx                    # Entry point
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies and scripts
└── .gitignore
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Install dependencies:**
   ```bash
   cd newg-react
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will open automatically at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Asset Setup

Before running the project, copy your image assets to the `public` folder:

1. Place `day.jpg` and `night.jpg` in the `public/` folder
2. Place your logo image as `image (2).png` in the `public/` folder

These are referenced in:
- `index.html` - Image preloading
- `src/styles/global.css` - Background images
- `src/components/Logo/Logo.jsx` - Logo display

## Key Components

### ThemeProvider & useTheme Hook
Manages theme state with localStorage persistence:
```jsx
import { useTheme } from './hooks/useTheme'

function MyComponent() {
  const { isDark, toggleTheme } = useTheme()
  // Use isDark and toggleTheme
}
```

### useParallax Hook
Implements parallax scrolling effect:
```jsx
import { useParallax } from './hooks/useParallax'

function Header() {
  useParallax() // Automatically handles parallax on scroll
  return <header>...</header>
}
```

### Navigation System
React Router v6 enables SPA routing:
- `/` - Home page
- `/about` - About page
- `/experience` - Experience page
- `/websites` - Websites page
- `/contact` - Contact page

## Customization

### Colors & Theme
Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --text-day: #1a1a1a;
  --text-night: #eaeaea;
  --card-day: rgba(255,255,255,0.75);
  --card-night: rgba(20,20,30,0.55);
}
```

### Typography
Font families are imported from Google Fonts in `src/styles/global.css`:
- **Orbitron** - Headings
- **DM Sans** - Body text

### Page Content
Edit content in `src/pages/` files:
```jsx
// src/pages/Home.jsx
function Home() {
  return (
    <main className="main-content">
      <h1>Your Title</h1>
      <p>Your content here</p>
    </main>
  )
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Code Splitting** - Automatic route-based code splitting
- **Lazy Loading** - Images preloaded in HTML
- **CSS Optimization** - Minified CSS in production
- **Tree Shaking** - Unused code removed in build

## Troubleshooting

### Images not showing
- Ensure images are in the `public/` folder with exact filenames
- Check browser console for 404 errors

### Theme not persisting
- Browser localStorage must be enabled
- Check browser's storage settings

### Mobile menu not working
- Ensure viewport meta tag is present in `index.html`
- Check mobile breakpoints in `src/styles/header.css`

## Building for Production

The production build includes:
- Minified JavaScript and CSS
- Optimized assets
- Source maps (configurable)
- HTML minification

Output folder: `dist/`

## License

This project maintains the original design and functionality from the HTML/CSS/JS version, now optimized for React and modern web standards.

## Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **gsap** - Animations library (optional, graceful degradation without it)

## Development

### Scripts Available

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

### Code Quality

The project follows React best practices:
- Functional components with hooks
- Proper prop management
- Component-based architecture
- Separation of concerns
- DRY principle

## Notes

- All original CSS functionality is preserved
- Smooth animations use GSAP with graceful fallback
- Mobile menu closes when route changes
- Theme preference is saved to localStorage
- Parallax effect on scroll works on desktop and mobile
