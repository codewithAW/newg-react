# Quick Start Guide - Glass Morphism React Website

## 📋 Prerequisites

- Node.js 16+ ([Download here](https://nodejs.org/))
- npm (comes with Node.js)
- Git (optional)

## 🚀 Step-by-Step Setup

### 1. Install Node Modules
```bash
cd newg-react
npm install
```

This installs all required dependencies:
- React & React DOM
- React Router for navigation
- Vite for build tooling
- GSAP for animations

**Installation time:** 1-2 minutes depending on internet speed

### 2. Copy Image Assets

Copy these image files to the `public/` folder:
- `day.jpg` - Background for light theme
- `night.jpg` - Background for dark theme  
- `image (2).png` - Logo image

### 3. Start Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
```

The app will automatically open in your browser!

## 🎯 What to Try

1. **Click Navigation Icons** - Switch between Home, About, Experience, Websites, Contact
2. **Toggle Theme** - Click the circular button in the header to switch light/dark mode
3. **Mobile Menu** - On small screens, click the hamburger menu
4. **Scroll** - Notice the parallax background effect
5. **Logo Popup** - Click the logo to see a popup animation

## 📦 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (auto-reload on changes) |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code for issues |

## 🔧 Customization

### Change Theme Colors
Edit `src/styles/global.css`:
```css
:root {
  --text-day: #1a1a1a;      /* Light mode text */
  --text-night: #eaeaea;    /* Dark mode text */
}
```

### Edit Page Content
Edit files in `src/pages/`:
- `Home.jsx` - Homepage content
- `About.jsx` - About page
- `Experience.jsx` - Experience page
- `Websites.jsx` - Websites page
- `Contact.jsx` - Contact page

### Add New Page
1. Create file: `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/Navigation/Navigation.jsx`

## 🐛 Troubleshooting

### Images not showing?
- Check that `day.jpg`, `night.jpg`, and `image (2).png` are in the `public/` folder
- Restart dev server with `npm run dev`

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### Theme not saving?
- Browser must allow localStorage (check privacy settings)
- Clear browser cache and try again

## 📱 Testing on Mobile

### Local Network Testing
```bash
npm run dev -- --host
```

Then access from mobile using the local IP shown in terminal.

### Responsive Design
- Press F12 to open DevTools
- Click device icon to toggle device toolbar
- Test different screen sizes

## 🎨 Features Overview

| Feature | Location | How It Works |
|---------|----------|--------------|
| Glass Effect | `src/styles/header.css` | CSS backdrop-filter |
| Theme Toggle | `src/components/ThemeToggle/` | Custom hook + Context |
| Mobile Menu | `src/components/MobileMenu/` | React state management |
| Navigation | `src/components/Navigation/` | React Router |
| Parallax | `src/hooks/useParallax.js` | Scroll event listener |
| Animations | `src/styles/toggle.css` | GSAP + CSS animations |

## 📚 Learn More

- [React Docs](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Vite Docs](https://vitejs.dev/)
- [GSAP Docs](https://gsap.com/docs/)

## 🚢 Deploy to Production

### Build for Production
```bash
npm run build
```

Creates optimized files in `dist/` folder.

### Deploy Options
- **Netlify** - Drag and drop `dist/` folder
- **Vercel** - Connect GitHub repo
- **GitHub Pages** - Push `dist/` to gh-pages branch
- **Traditional Server** - Upload `dist/` via FTP

## ✅ Checklist

- [ ] Node.js installed
- [ ] `npm install` completed
- [ ] Images copied to `public/` folder
- [ ] `npm run dev` running
- [ ] App opens in browser
- [ ] Navigation works
- [ ] Theme toggle works
- [ ] Mobile menu works on small screens

## 🆘 Getting Help

1. Check [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for architecture changes
2. Review [README.md](./README.md) for comprehensive documentation
3. Check browser console for error messages
4. Try clearing cache and restarting dev server

---

**Ready to customize?** Start editing files in `src/` and watch changes appear in real-time! 🎉
