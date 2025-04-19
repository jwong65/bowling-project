import React, {useState} from 'react'
import { Box, Typography} from '@mui/material'

export default function ScoreHistory() {
  return (
    <Box
        sx={{
            p: 3,
            backgroundColor: 'var(--md-sys-color-background)',
            color: 'var(--md-sys-color-on-background)',
        }}
    >
        <Typography variant='h4' component='h1'sx={{ color: 'var(--md-sys-color-primary)' }}>
            Score History
        </Typography>
    </Box>
  )
}
