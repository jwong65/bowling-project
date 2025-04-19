import React, { createContext, useState, useEffect, useContext } from 'react';

import '../theme/light.css';
import '../theme/dark.css';
import '../theme/light-mc.css';
import '../theme/light-hc.css';
import '../theme/dark-mc.css';
import '../theme/dark-hc.css';

// var(--md-sys-color-primary) - Main primary color
// var(--md-sys-color-on-primary) - Text/icons on primary color
// var(--md-sys-color-primary-container) - Container with primary color
// var(--md-sys-color-on-primary-container) - Text/icons on primary container

// var(--md-sys-color-surface) - Main surface color
// var(--md-sys-color-on-surface) - Text/icons on surface
// var(--md-sys-color-surface-variant) - Variant surface color
// var(--md-sys-color-on-surface-variant) - Text/icons on surface variant

// var(--md-sys-color-background) - Background color
// var(--md-sys-color-on-background) - Text/icons on background
// var(--md-sys-color-outline) - Outline color for borders
// var(--md-sys-color-error) - Error color
const ThemeContext = createContext();

export const ThemeProvider = ({children})=>{
    const [themeMode, setThemeMode] = useState('light');
    const [contrastMode, setContrastMode] = useState('standard');
    const toggleTheme = () =>{
        setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    }
    const setContrast = (level)=>{
        setContrastMode(level);
        // This is to set the contrast mode to standard, medium or high.
    }

    useEffect(() => {
        document.body.classList.remove(
          'light', 'dark', 
          'light-medium-contrast', 'light-high-contrast',
          'dark-medium-contrast', 'dark-high-contrast'
        );
        
        if (contrastMode === 'standard') {
          document.body.classList.add(themeMode);
        } else if (contrastMode === 'medium') {
          document.body.classList.add(`${themeMode}-medium-contrast`);
        } else if (contrastMode === 'high') {
          document.body.classList.add(`${themeMode}-high-contrast`);
        }
        
        console.log('Current theme:', document.body.className);
      }, [themeMode, contrastMode]);

    return (
        <ThemeContext.Provider value={{
            themeMode,
            contrastMode,
            toggleTheme,
            setContrast,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)