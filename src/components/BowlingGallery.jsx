import React, { useState, useEffect } from 'react'
import { Container, Typography, Grid, Card, CardMedia} from '@mui/material'

import galleryData from '../assets/gallery.json'

export default function BowlingGallery() {
    
  const [images, setImages] = useState(galleryData.images || []);
 
  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageFiles = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png}');
        
        const processedImages = await Promise.all(
          galleryData.images.map(async (imageData) => {
            const imagePath = `../assets/gallery/${imageData.filename}`;
            
            if (imageFiles[imagePath]) {
              const module = await imageFiles[imagePath]();
              return {
                ...imageData,
                imageUrl: module.default
              };
            }
            
            return {
              ...imageData,
              imageUrl: null
            };
          })
        );
        
        setImages(processedImages);
      } catch (error) {
        console.error('Error loading gallery images:', error);
      }
    };
    
    loadImages();
  }, []);

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
                <Grid key={image.id}>
                    <Card>
                        <CardMedia
                            component='img'
                            image={image.imageUrl}
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
