import React, {useState} from 'react'
import { Box, Typography, Paper, Container, Table, TableHead, TableRow, TableContainer, TableCell, TableBody} from '@mui/material'

import scoreData from "../data/bowlingScores_2024-02-17.json"

export default function ScoreHistory() {
    const [scores, setScores] = useState(scoreData.scores)
  return (
    <Container maxWidth="xl" sx={{ mt: 8 }}>
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
    <Box sx={{ mt: 3 }}>
        <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            sx={{ color: 'var(--md-sys-color-primary)' }}
        >
            February 17, 2024
        </Typography>
        <Paper 
            elevation={2} 
            sx={{ 
                p: 3,
                mt: 2,
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                borderRadius: 1,
                boxShadow: 1,
                overflow: 'hidden'
            }}
        >
            <Typography variant="h6" gutterBottom>
                Bowling Scores
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--md-sys-color-primary)', mb: 2 }}>
                Displaying scores for {scores.length} players
            </Typography>
            <TableContainer sx={{ maxHeight: '70vh' }}>
                <Table stickyHeader sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow sx={{backgroundColor: 'var(--md-sys-color-surface-variant)'}}>
                            <TableCell
                                sx={{ color: 'var(--md-sys-color-on-surface-variant)',
                                    fontWeight: 'bold'
                                }}
                            >
                                Player
                            </TableCell>
                            {Array.from({ length: 19 }, (_, i) => (
                                <TableCell 
                                    key={i} 
                                    align="center"
                                    sx={{ 
                                        color: 'var(--md-sys-color-on-surface-variant)',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Game {i + 1}
                                </TableCell>
                            ))}                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {scores.map((player) => (
                                <TableRow 
                                    key={player.id}
                                    sx={{ 
                                        '&:nth-of-type(odd)': {
                                            backgroundColor: 'var(--md-sys-color-surface-container-low)',
                                        },
                                         '&:hover': {
                                        backgroundColor: 'var(--md-sys-color-surface-container)',
                                        },
                                        color: 'var(--md-sys-color-on-surface)'
                                    }}
                                >
                                    <TableCell component="th" scope="row"
                                     sx={{ 
                                        color: 'var(--md-sys-color-on-surface)', // Explicitly set text color
                                        fontWeight: 'medium'
                                    }}
                                    >
                                        {player.username}
                                    </TableCell>
                                    
                                    {Array.from({ length: 19 }, (_, i) => (
                                        <TableCell key={i} align="center"
                                        sx={{
                                            color: 'var(--md-sys-color-on-surface)',
                                            ...(player.scores[i] > 150 && {
                                                color: 'var(--md-sys-color-primary)',
                                                fontWeight: 'bold'
                                            })
                                        }}
                                        >
                                            {player.scores[i] || '-'}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Box>
    </Container>
  )
}
