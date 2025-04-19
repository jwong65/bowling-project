import React, { useContext } from 'react'
import { Box, Typography, Button, Stack, useTheme } from '@mui/material';
// import { Link } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';

export default function HomePage() {
    const theme = useTheme()
    const { themeMode, contrastMode, toggleTheme, setContrast } = useThemeContext();
  return (
    <Box
    sx={{ 
        padding: 3,
        marginTop: 2,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'var(--md-sys-color-background)',
        color: 'var(--md-sys-color-on-background)',
        boxShadow: 1,
        borderLeft: `4px solid var(--md-sys-color-outline)`
      }}
    >
        <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ color: `var(--md-sys-color-primary)` }}
        >
            Welcome to Bowling Score Tracker
        </Typography>
        <Typography variant="body1" sx={{color: `var(--md-sys-color-on-surface-variant)`}}>
            Track your bowling scores and see your progress over time.
        </Typography>
    </Box>
  )
}
