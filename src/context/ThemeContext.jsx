import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check local storage or system preference for theme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light'; // Default theme
  };

  const [theme, setTheme] = useState(getInitialTheme);
  
  // Apply theme to the document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Add animation class for theme transition
    document.body.classList.add('theme-transition');
    
    // Remove animation class after transition completes
    const timer = setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [theme]);
  
  // Toggle between themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Get current theme mode text
  const getThemeText = () => {
    return theme === 'light' ? 'Light' : 'Dark';
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getThemeText }}>
      {children}
    </ThemeContext.Provider>
  );
}; 