/**
 * MSICCA Theme System - Light/Dark Theme Toggle
 * Version: 2.0.0
 * 
 * Maneja el toggle entre tema claro y oscuro con:
 * - Persistencia en localStorage
 * - Fallback a prefers-color-scheme
 * - Inicialización temprana para evitar flash
 * - Respeto de secciones forzadas (data-surface="dark")
 */

(function () {
  'use strict';

  // =========================================
  // CONSTANTS
  // =========================================
  const STORAGE_KEY = 'msicca-theme';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };
  const DEFAULT_THEME = THEMES.LIGHT;

  // =========================================
  // THEME STATE
  // =========================================
  let currentTheme = null;

  /**
   * Get the user's preferred color scheme from the browser
   * @returns {string} 'dark' or 'light'
   */
  function getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    return THEMES.LIGHT;
  }

  /**
   * Get the stored theme preference from localStorage
   * @returns {string|null} The stored theme or null if not set
   */
  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (stored === THEMES.LIGHT || stored === THEMES.DARK)) {
        return stored;
      }
    } catch (error) {
      console.warn('Could not access localStorage:', error);
    }
    return null;
  }

  /**
   * Store the theme preference in localStorage
   * @param {string} theme - The theme to store
   */
  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error);
    }
  }

  /**
   * Get the initial theme based on priority:
   * 1. Stored preference in localStorage
   * 2. System preference (prefers-color-scheme)
   * 3. Default theme (light)
   * @returns {string} The initial theme
   */
  function getInitialTheme() {
    const stored = getStoredTheme();
    if (stored) {
      return stored;
    }
    
    // Check if user has visited before
    try {
      const hasVisited = localStorage.getItem('msicca-has-visited');
      if (!hasVisited) {
        // First visit - use system preference
        localStorage.setItem('msicca-has-visited', 'true');
        return getSystemPreference();
      }
    } catch (error) {
      // Ignore localStorage errors
    }
    
    return DEFAULT_THEME;
  }

  /**
   * Apply theme to the document
   * @param {string} theme - The theme to apply
   * @param {boolean} skipTransition - Whether to skip the transition animation
   */
  function applyTheme(theme, skipTransition = false) {
    const html = document.documentElement;
    const body = document.body;

    // Skip transition on initial load to prevent flash
    if (skipTransition) {
      html.style.transition = 'none';
      if (body) {
        body.style.transition = 'none';
      }
    }

    // Set the theme attribute
    html.setAttribute('data-theme', theme);
    currentTheme = theme;

    // Store the preference
    storeTheme(theme);

    // Update toggle buttons if they exist
    updateToggleButtons(theme);

    // Re-enable transitions after a frame
    if (skipTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          html.style.transition = '';
          if (body) {
            body.style.transition = '';
          }
        });
      });
    }

    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    applyTheme(newTheme, false);
  }

  /**
   * Set a specific theme
   * @param {string} theme - The theme to set
   */
  function setTheme(theme) {
    if (theme === THEMES.LIGHT || theme === THEMES.DARK) {
      applyTheme(theme, false);
    }
  }

  /**
   * Update the visual state of toggle buttons
   * @param {string} theme - The current theme
   */
  function updateToggleButtons(theme) {
    const buttons = document.querySelectorAll('.theme-toggle__btn');
    buttons.forEach(btn => {
      const btnTheme = btn.getAttribute('data-theme');
      const isActive = btnTheme === theme;
      
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      
      // Update aria-label for accessibility
      btn.setAttribute('aria-label', `Switch to ${btnTheme} theme${isActive ? ' (current)' : ''}`);
    });
  }

  /**
   * Create and mount the theme toggle UI
   */
  function mountThemeToggle() {
    // Check if toggle already exists
    if (document.querySelector('.theme-toggle')) {
      return;
    }

    const toggle = document.createElement('div');
    toggle.className = 'theme-toggle';
    toggle.setAttribute('role', 'group');
    toggle.setAttribute('aria-label', 'Theme selector');
    
    toggle.innerHTML = `
      <span class="theme-toggle__label" aria-hidden="true">Theme</span>
      <div class="theme-toggle__group" role="radiogroup" aria-label="Theme selection">
        <button 
          class="theme-toggle__btn" 
          type="button" 
          data-theme="${THEMES.LIGHT}"
          aria-pressed="false"
          aria-label="Switch to light theme"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Light
        </button>
        <button 
          class="theme-toggle__btn" 
          type="button" 
          data-theme="${THEMES.DARK}"
          aria-pressed="false"
          aria-label="Switch to dark theme"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Dark
        </button>
      </div>
    `;

    // Add event listener for toggle clicks
    toggle.addEventListener('click', (event) => {
      const button = event.target.closest('.theme-toggle__btn');
      if (!button) return;

      const selectedTheme = button.getAttribute('data-theme');
      if (selectedTheme && selectedTheme !== currentTheme) {
        setTheme(selectedTheme);
      }
    });

    // Add keyboard support
    const buttons = toggle.querySelectorAll('.theme-toggle__btn');
    buttons.forEach((btn, index) => {
      btn.addEventListener('keydown', (e) => {
        let nextIndex = null;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = (index + 1) % buttons.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = (index - 1 + buttons.length) % buttons.length;
        }
        
        if (nextIndex !== null) {
          buttons[nextIndex].focus();
        }
      });
    });

    // Append to body
    document.body.appendChild(toggle);
    
    // Update button states
    updateToggleButtons(currentTheme);
  }

  /**
   * Listen for system theme changes
   */
  function watchSystemTheme() {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', (e) => {
        // Only apply system theme if user hasn't set a preference
        const stored = getStoredTheme();
        if (!stored) {
          const systemTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
          applyTheme(systemTheme, false);
        }
      });
    }
    // Older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener((e) => {
        const stored = getStoredTheme();
        if (!stored) {
          const systemTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
          applyTheme(systemTheme, false);
        }
      });
    }
  }

  /**
   * Initialize the theme system
   */
  function initTheme() {
    // Get and apply initial theme (skip transition)
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme, true);

    // Mount toggle UI when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mountThemeToggle);
    } else {
      mountThemeToggle();
    }

    // Watch for system theme changes
    watchSystemTheme();
  }

  // =========================================
  // PUBLIC API
  // =========================================
  window.ThemeSystem = {
    toggle: toggleTheme,
    set: setTheme,
    get: () => currentTheme,
    THEMES: THEMES
  };

  // =========================================
  // AUTO-INITIALIZE
  // =========================================
  // Initialize immediately (before DOM loads) to prevent flash
  initTheme();

})();
