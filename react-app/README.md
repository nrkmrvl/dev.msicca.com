# MSICCA Dev - React Application

A modern React application built with Vite, featuring the custom MSICCA design system inspired by Codecademy's Gamut.

## 🎨 Design System

The application uses a custom MSICCA theme with the following color palette:

- **Deep Navy Blue** (`rgb(16, 22, 47)`) - Hero, Footer, and Header backgrounds
- **Electric Yellow** (`#FFD300`) - Action buttons and CTAs
- **Soft Cream** (`rgb(255, 240, 229)`) - General section backgrounds
- **Blue Gray** (`#37465A`) - Main text
- **Acid Green** (`#AAE538`) - Success states
- **Pure White** (`#FFFFFF`) - Text on dark backgrounds
- **Alert Red** (`#FF0000`) - Error states

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **@emotion/react** & **@emotion/styled** - CSS-in-JS styling
- **@codecademy/gamut** - Design system components (theme structure)
- **Roboto & Roboto Mono** - Typography

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Header.jsx       # Navigation header (dark theme)
│   ├── Hero.jsx         # Hero section (dark theme)
│   ├── About.jsx        # About section (light theme)
│   ├── Features.jsx     # Features showcase
│   ├── Projects.jsx     # Projects portfolio
│   ├── Contact.jsx      # Contact section
│   └── Footer.jsx       # Footer (dark theme)
├── theme/
│   └── msiccaTheme.js   # Custom MSICCA theme definition
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## 🎯 Features

- ✅ Responsive design with mobile-first approach
- ✅ Custom MSICCA theme with consistent color palette
- ✅ Dark theme for Hero/Header/Footer sections
- ✅ Light theme for content sections
- ✅ Smooth scroll navigation
- ✅ SEO optimized with meta tags
- ✅ Accessibility focused
- ✅ Modern React patterns and hooks

## 🔧 Available Scripts

- `npm run dev` - Start development server on http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📝 Customization

The MSICCA theme can be customized by editing `/src/theme/msiccaTheme.js`. The theme follows Gamut's structure and can be extended with additional properties.

## 🌐 Deployment

The application can be deployed to any static hosting service:

```bash
npm run build
# Deploy the dist/ folder to your hosting service
```

Compatible with:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 📄 License

© 2026 MSICCA - Edge Minimal Developers

