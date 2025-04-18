import React, { createContext, useState, useEffect, useContext } from 'react';

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