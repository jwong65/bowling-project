import React, { useState } from 'react'
import { Container, Typography, Grid, Card, CardMedia} from '@mui/material'

import galleryData from '../assets/gallery.json'
import image1 from "../assets/03-02-2024.jpg"

export default function BowlingGallery() {
    
  const [images, setImages] = useState(galleryData.images || []);

  return (
    <Container maxWidth='xl' sx={{ mt: 8, mb: 4}}>
        <Typography variant='h4' component='h1' align='center' gutterBottom
        sx={{ color: 'var(--md-sys-color-primary)' }}
        >
            Bowling Gallery
        </Typography>
        <Grid
            container
            spacing={2}
            sx={{ mt: 4 }}
        >
            {images.map((image)=>(
                <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                    <Card>
                        <CardMedia
                            component='img'
                            image={image1}
                            alt={image.description}
                            sx={{ height: 200, objectFit: 'cover' }}
                        />
                    </Card>
                    <Typography>{image.description}</Typography>
                    <Typography>{image.date}</Typography>
                </Grid>
            ))}
        </Grid>
    </Container>
  )
}
