import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material'

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
        <Toolbar sx={{ justifyContent: 'space-between'}}>
            <Typography
                variant='h6'
                component={Link}
                to="/"
                sx={{ 
                    color: `var(--md-sys-color-primary)`,
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    justifySelf: 'start'
                }}
            >
                Bowling Tracker
            </Typography>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
                mx: 2
            }}>
              <Button 
                    component={Link} 
                    to="/"
                    aria-current={location.pathname === '/' ? 'page' : undefined}
                    sx={{ 
                        color: `var(--md-sys-color-on-surface)`,
                        borderBottom: location.pathname === '/' ? 
                        '2px solid var(--md-sys-color-primary)' : '2px solid transparent',
                        '&:hover': {
                            backgroundColor: 'var(--md-sys-color-surface-variant)',
                        }
                    }}
                >
                    Home
                </Button>
                <Button 
                    component={Link} 
                    to="/scorehistory"
                    aria-current={location.pathname === '/scorehistory' ? 'page' : undefined}
                    sx={{ 
                        color: `var(--md-sys-color-on-surface)`,
                        borderBottom: location.pathname === '/scorehistory' ? 
                        '2px solid var(--md-sys-color-primary)' : '2px solid transparent',
                        '&:hover': {
                            backgroundColor: 'var(--md-sys-color-surface-variant)',
                        }
                    }}
                >
                    Score History
                </Button>
                <Button 
                    component={Link} 
                    to="/gallery"
                    aria-current={location.pathname === '/gallery' ? 'page' : undefined}
                    sx={{ 
                        color: `var(--md-sys-color-on-surface)`,
                        borderBottom: location.pathname === '/gallery' ? 
                        '2px solid var(--md-sys-color-primary)' : '2px solid transparent',
                        '&:hover': {
                            backgroundColor: 'var(--md-sys-color-surface-variant)',
                        }
                    }}
                >
                    Gallery
                </Button>
                <Button 
                    component={Link} 
                    to="/playerstats"
                    aria-current={location.pathname === '/playerstats' ? 'page' : undefined}
                    sx={{ 
                        color: `var(--md-sys-color-on-surface)`,
                        borderBottom: location.pathname === '/playerstats' ? 
                        '2px solid var(--md-sys-color-primary)' : '2px solid transparent',
                        '&:hover': {
                            backgroundColor: 'var(--md-sys-color-surface-variant)',
                        }
                    }}
                >
                    Player Stats
                </Button>
            </Box>
            <IconButton
                onClick={toggleTheme}
                aria-label={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                sx={{ color: `var(--md-sys-color-on-surface)`,
                    ml: { xs: 0, sm: 1}
                 }}
            >
                {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}
