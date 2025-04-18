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
        borderRadius: 1,
        boxShadow: 1
      }}
    >
        <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Bowling Score Tracker
        </Typography>
        <Typography variant="body1">
            Track your bowling scores and see your progress over time.
        </Typography>
    </Box>
  )
}
