/**
 * i18n - Internationalization System for Edge Minimal Developers
 * Automatically detects browser language and applies translations
 * Supports EN (default) and ES
 * 
 * Can be enabled/disabled via window.MSICCA_CONFIG.I18N_ENABLED in config.js
 */

(function() {
  'use strict';

  const DEFAULT_LANG = 'en';
  const SUPPORTED_LANGS = ['en', 'es'];
  
  // Cache for loaded translations
  let translations = {};
  let currentLang = DEFAULT_LANG;

  /**
   * Check if i18n is enabled via configuration
   * @returns {boolean} Whether i18n is enabled
   */
  function isI18nEnabled() {
    // Default to enabled if config is not loaded yet or I18N_ENABLED is not explicitly set
    if (!window.MSICCA_CONFIG) {
      return true;
    }
    // Use explicit false check so any truthy value enables i18n
    return window.MSICCA_CONFIG.I18N_ENABLED !== false;
  }

  /**
   * Detect user's preferred language from browser settings
   * @returns {string} Language code ('en' or 'es')
   */
  function detectLanguage() {
    // Check localStorage first (for manual override if needed in future)
    const savedLang = localStorage.getItem('msicca_lang');
    if (savedLang && SUPPORTED_LANGS.includes(savedLang)) {
      return savedLang;
    }

    // Get browser languages
    const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || DEFAULT_LANG];
    
    for (const lang of browserLangs) {
      // Extract primary language code (e.g., 'es-MX' -> 'es')
      const primaryLang = lang.split('-')[0].toLowerCase();
      if (SUPPORTED_LANGS.includes(primaryLang)) {
        return primaryLang;
      }
    }
    
    return DEFAULT_LANG;
  }

  /**
   * Load translation file for the specified language
   * @param {string} lang - Language code
   * @returns {Promise<object>} Translation object
   */
  async function loadTranslations(lang) {
    if (translations[lang]) {
      return translations[lang];
    }

    try {
      const response = await fetch(`/assets/i18n/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
      }
      translations[lang] = await response.json();
      return translations[lang];
    } catch (error) {
      console.warn(`i18n: Could not load ${lang}, falling back to ${DEFAULT_LANG}`);
      if (lang !== DEFAULT_LANG) {
        return loadTranslations(DEFAULT_LANG);
      }
      return {};
    }
  }

  /**
   * Get a nested translation value by dot-notation key
   * @param {object} obj - Translation object
   * @param {string} key - Dot-notation key (e.g., 'hero.title_line1')
   * @returns {string} Translation value or empty string
   */
  function getNestedValue(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : ''), obj);
  }

  /**
   * Apply translations to all elements with data-i18n attribute
   * @param {object} trans - Translation object
   */
  function applyTranslations(trans) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(trans, key);
      
      if (value) {
        // Check if we should use innerHTML (for HTML content like <br />)
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    });

    // Apply to placeholder attributes
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = getNestedValue(trans, key);
      if (value) {
        el.setAttribute('placeholder', value);
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
  }

  /**
   * Initialize i18n system
   */
  async function init() {
    // Check if i18n is enabled
    if (!isI18nEnabled()) {
      console.log('i18n: Translations disabled via config');
      return;
    }

    currentLang = detectLanguage();
    const trans = await loadTranslations(currentLang);
    
    // Apply translations when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyTranslations(trans));
    } else {
      applyTranslations(trans);
    }

    // Re-apply translations when dynamic content is loaded (header/footer)
    // Use MutationObserver for dynamic content with optimization
    const observer = new MutationObserver((mutations) => {
      // Check if any added nodes contain translatable content
      let hasTranslatableContent = false;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the node or its descendants have i18n attributes
            if (node.hasAttribute && (
              node.hasAttribute('data-i18n') || 
              node.hasAttribute('data-i18n-placeholder') ||
              node.querySelector('[data-i18n], [data-i18n-placeholder]')
            )) {
              hasTranslatableContent = true;
              break;
            }
          }
        }
        if (hasTranslatableContent) break;
      }
      
      // Only apply translations if translatable content was added
      if (hasTranslatableContent) {
        applyTranslations(trans);
      }
    });

    // Observe header and footer placeholders
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (headerPlaceholder) {
      observer.observe(headerPlaceholder, { childList: true, subtree: true });
    }
    if (footerPlaceholder) {
      observer.observe(footerPlaceholder, { childList: true, subtree: true });
    }
  }

  /**
   * Manually change language (for future language selector)
   * @param {string} lang - Language code
   */
  async function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      console.warn(`i18n: Unsupported language: ${lang}`);
      return;
    }
    
    currentLang = lang;
    localStorage.setItem('msicca_lang', lang);
    const trans = await loadTranslations(lang);
    applyTranslations(trans);
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  function getLanguage() {
    return currentLang;
  }

  /**
   * Get a translation value by key
   * @param {string} key - Dot-notation key
   * @returns {string} Translation value
   */
  function t(key) {
    const trans = translations[currentLang] || {};
    return getNestedValue(trans, key) || key;
  }

  // Expose API globally
  window.i18n = {
    init,
    setLanguage,
    getLanguage,
    t,
    detectLanguage
  };

  // Auto-initialize
  init();
})();
