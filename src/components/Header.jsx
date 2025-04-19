import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme } from '@mui/material'

import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon

import { useThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom'
export default function Header() {
    const { themeMode, toggleTheme} = useThemeContext();

  return (
    <AppBar position='fixed'
        sx={{
            top: 0,
            width: '100%',
            backgroundColor: `var(--md-sys-color-surface)`,
            color: `var(--md-sys-color-on-surface)`,
            zIndex: (theme) => theme.zIndex.drawer + 1
        }}    
    >
        <Toolbar>
            <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, color: `var(--md-sys-color-primary)`}}
            >
                Bowling Tracker
            </Typography>
            <IconButton
                onClick={toggleTheme}
                aria-label={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                sx={{ color: `var(--md-sys-color-on-surface)` }}
            >
                {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}
