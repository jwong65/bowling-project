import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme, Button } from '@mui/material'

import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon

import { useThemeContext } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom'
export default function Header() {
    const { themeMode, toggleTheme} = useThemeContext();
    const location = useLocation();

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
                component={Link}
                to="/"
                sx={{ 
                    color: `var(--md-sys-color-primary)`,
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}
            >
                Bowling Tracker
            </Typography>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                flexGrow: 1,
                mx: 2
            }}>
                <Button 
                    component={Link} 
                    to="/scorehistory"
                    sx={{ 
                        color: `var(--md-sys-color-on-surface)`,
                        borderBottom: location.pathname === '/scorehistory' ? 
                        '2px solid var(--md-sys-color-primary)' : 'none',
                        '&:hover': {
                            backgroundColor: 'var(--md-sys-color-surface-variant)',
                        }
                    }}
                >
                    Score History
                </Button>
            </Box>
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
