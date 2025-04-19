import React from 'react'
import { Container, Typography } from '@mui/material'

export default function BowlingGallery() {
  return (
    <Container maxWidth='xl' sx={{ mt: 8, mb: 4}}>
        <Typography variant='h4' component='h1' align='center' gutterBottom>
            Bowling Gallery
        </Typography>
    </Container>
  )
}
