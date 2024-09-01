'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { predefinedThemes } from './themes';

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(predefinedThemes.default);
  const [customStylesheet, setCustomStylesheet] = useState(null);

  const changeTheme = (themeName) => {
    if (predefinedThemes[themeName]) {
      setCurrentTheme(predefinedThemes[themeName]);
      setCustomStylesheet(null);
    }
  };

  const loadCustomStylesheet = (url) => {
    setCustomStylesheet(url);
    setCurrentTheme({ name: 'Custom', font: predefinedThemes.default.font });
  };

  useEffect(() => {
    if (customStylesheet) {
      const link = document.createElement('link');
      link.href = customStylesheet;
      link.rel = 'stylesheet';
      link.id = 'custom-theme-stylesheet';
      document.head.appendChild(link);

      return () => {
        const existingLink = document.getElementById('custom-theme-stylesheet');
        if (existingLink) {
          existingLink.remove();
        }
      };
    }
  }, [customStylesheet]);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, loadCustomStylesheet }}>
      {children}
    </ThemeContext.Provider>
  );
};
