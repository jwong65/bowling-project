import React from 'react'
import { Box, Typography, Button, Stack, Paper, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const theme = useTheme()
  return (
    <Box
    sx={{ 
        padding: 3,
        marginTop: 2,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: 1,
        borderLeft: `4px solid ${theme.palette.primary.main}`
      }}
    >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.primary.main }}>
            Welcome to Bowling Score Tracker
        </Typography>
        <Typography variant="body1">
            Track your bowling scores and see your progress over time.
        </Typography>
    </Box>
  )
}
