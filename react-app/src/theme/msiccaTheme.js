/**
 * MSICCA Custom Theme for Gamut
 * 
 * Color Palette:
 * - Deep Navy Blue: rgb(16, 22, 47) - Hero/Footer/Header backgrounds
 * - Electric Yellow: #FFD300 - Action buttons and CTAs
 * - Soft Cream: rgb(255, 240, 229) - General section backgrounds
 * - Blue Gray: #37465A - Main text
 * - Acid Green: #AAE538 - Success states
 * - Pure White: #FFFFFF - Text on dark backgrounds
 * - Alert Red: #FF0000 - Error states
 * - Borders: rgba(255,255,255,0.1)
 * - Overlay: rgba(0,0,0,0.5)
 */

export const msiccaTheme = {
  colors: {
    // Primary brand colors
    navy: 'rgb(16, 22, 47)',
    yellow: '#FFD300',
    cream: 'rgb(255, 240, 229)',
    blueGray: '#37465A',
    acidGreen: '#AAE538',
    white: '#FFFFFF',
    red: '#FF0000',
    
    // Semantic colors mapped to Gamut's expected structure
    primary: '#FFD300', // Electric Yellow for primary actions
    secondary: 'rgb(16, 22, 47)', // Deep Navy Blue
    
    // Background colors
    background: 'rgb(255, 240, 229)', // Soft Cream for general backgrounds
    backgroundDark: 'rgb(16, 22, 47)', // Deep Navy Blue for hero/footer
    
    // Text colors
    text: '#37465A', // Blue Gray for main text
    textLight: '#FFFFFF', // White for text on dark backgrounds
    textSecondary: 'rgba(55, 70, 90, 0.7)',
    
    // Feedback colors
    success: '#AAE538', // Acid Green
    error: '#FF0000', // Alert Red
    warning: '#FFD300', // Electric Yellow
    info: '#37465A',
    
    // UI elements
    border: 'rgba(255, 255, 255, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Gamut compatibility overrides
    blue: {
      100: 'rgb(255, 240, 229)',
      200: 'rgb(255, 240, 229)',
      300: 'rgb(255, 240, 229)',
      400: '#37465A',
      500: 'rgb(16, 22, 47)',
      600: 'rgb(16, 22, 47)',
      700: 'rgb(16, 22, 47)',
      800: 'rgb(16, 22, 47)',
      900: 'rgb(16, 22, 47)',
    },
    yellow: {
      100: '#FFF9E0',
      200: '#FFF3C0',
      300: '#FFEDA0',
      400: '#FFE780',
      500: '#FFD300', // Electric Yellow
      600: '#E6BE00',
      700: '#CCA900',
      800: '#B39400',
      900: '#997F00',
    },
    green: {
      100: '#F3FCE3',
      200: '#E7F9C7',
      300: '#DBF6AB',
      400: '#CFF38F',
      500: '#AAE538', // Acid Green
      600: '#99CE32',
      700: '#88B72C',
      800: '#77A026',
      900: '#668920',
    },
    red: {
      100: '#FFE6E6',
      200: '#FFCCCC',
      300: '#FFB3B3',
      400: '#FF9999',
      500: '#FF0000', // Alert Red
      600: '#E60000',
      700: '#CC0000',
      800: '#B30000',
      900: '#990000',
    },
    gray: {
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
  },
  
  // Typography
  fontFamily: {
    base: '"Roboto", system-ui, -apple-system, sans-serif',
    mono: '"Roboto Mono", "Courier New", monospace',
  },
  
  // Spacing (maintaining Gamut's 8px base unit)
  space: {
    0: '0',
    2: '0.125rem',   // 2px
    4: '0.25rem',    // 4px
    8: '0.5rem',     // 8px
    12: '0.75rem',   // 12px
    16: '1rem',      // 16px
    24: '1.5rem',    // 24px
    32: '2rem',      // 32px
    40: '2.5rem',    // 40px
    48: '3rem',      // 48px
    64: '4rem',      // 64px
    80: '5rem',      // 80px
    96: '6rem',      // 96px
  },
  
  // Breakpoints
  breakpoints: ['480px', '768px', '1024px', '1280px'],
  
  // Shadows
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  
  // Border radius
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  
  // Transitions
  transitions: {
    default: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export default msiccaTheme;
