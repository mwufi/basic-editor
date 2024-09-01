import { createContext, useContext, useState, useEffect } from 'react';
import { predefinedThemes } from './themes';
import { themeContentAtom } from '@/components/editor/atoms';
import { useAtom } from 'jotai';
const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(predefinedThemes.default);
  const [themeContent, setThemeContent] = useAtom(themeContentAtom);

  const changeTheme = (themeName) => {
    if (predefinedThemes[themeName]) {
      setCurrentTheme(predefinedThemes[themeName]);
      setThemeContent('');
    }
  };

  const loadCustomStylesheet = async (url) => {
    try {
      const response = await fetch(url);
      const content = await response.text();
      setThemeContent(content);
      setCurrentTheme({ name: 'Custom', font: predefinedThemes.default.font, colors: predefinedThemes.default.colors });
    } catch (error) {
      console.error('Failed to load custom stylesheet:', error);
    }
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = themeContent;
    style.id = 'custom-theme-style';
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('custom-theme-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [themeContent]);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, loadCustomStylesheet }}>
      {children}
    </ThemeContext.Provider>
  );
};