# MSICCA Dev - Edge Minimal Developers

This repository contains both the original static HTML site and the new React-based application.

## 🏗️ Project Structure

```
.
├── react-app/              # React application with MSICCA custom theme
├── index.html              # Original static HTML landing page
├── assets/                 # Shared assets (images, fonts, etc.)
├── components/             # Original HTML components
└── README.md              # This file
```

## 🚀 React Application (react-app/)

The modern React application built with Vite and the MSICCA custom theme. This is the **recommended version** for further development.

### Quick Start

```bash
cd react-app
npm install
npm run dev
```

For detailed information, see [react-app/README.md](react-app/README.md)

### Features
- ✅ React 18 + Vite
- ✅ Custom MSICCA theme with Gamut design system principles
- ✅ @emotion/styled for CSS-in-JS
- ✅ Fully responsive
- ✅ SEO optimized
- ✅ Modern component architecture

### Color Palette
- **Deep Navy Blue** (`rgb(16, 22, 47)`) - Hero, Footer, Header backgrounds
- **Electric Yellow** (`#FFD300`) - Action buttons and CTAs
- **Soft Cream** (`rgb(255, 240, 229)`) - General section backgrounds
- **Blue Gray** (`#37465A`) - Main text
- **Acid Green** (`#AAE538`) - Success states
- **Pure White** (`#FFFFFF`) - Text on dark backgrounds
- **Alert Red** (`#FF0000`) - Error states

## 📄 Static HTML Version

The original static HTML version remains in the root directory for reference and backwards compatibility.

### Files
- `index.html` - Main landing page
- `wordpress.html` - WordPress project showcase
- `dolibarr.html` - Dolibarr project showcase
- `projects.html` - Projects overview
- `components/` - Reusable HTML components (header, footer, etc.)

## 🔄 Migration Status

The React application is a complete migration of the static site with the following improvements:

| Feature | Static HTML | React App |
|---------|-------------|-----------|
| Modern Framework | ❌ | ✅ React 18 |
| Component Architecture | ❌ | ✅ Modular |
| Theme System | ❌ | ✅ MSICCA Custom |
| Hot Module Reload | ❌ | ✅ Vite HMR |
| Build Optimization | ❌ | ✅ Production builds |
| State Management | ❌ | ✅ React Hooks |
| TypeScript Ready | ❌ | ✅ Easy to add |

## 🌐 Deployment

### React App (Recommended)
```bash
cd react-app
npm run build
# Deploy the dist/ folder
```

### Static HTML
Simply deploy the root directory to any static hosting service.

## 📝 Development Roadmap

- ✅ Phase 1: React migration with custom theme
- ⏳ Phase 2: Add interactive forms
- ⏳ Phase 3: Backend integration
- ⏳ Phase 4: CMS integration
- ⏳ Phase 5: Multi-language support (i18n)
- ⏳ Phase 6: Progressive Web App features

## 🤝 Contributing

1. Work in the `react-app/` directory for new features
2. Follow the existing component structure
3. Use the MSICCA theme colors consistently
4. Ensure responsive design across breakpoints
5. Test accessibility features

## 📄 License

© 2026 MSICCA - Edge Minimal Developers

---

For questions or support, contact: hello@msicca.com
