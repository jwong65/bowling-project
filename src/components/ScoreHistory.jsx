import React, {useState} from 'react'
import { Box, Typography, Paper, Container, Table, TableHead, TableRow, TableContainer, TableCell, TableBody} from '@mui/material'

// import scoreData from "../data/bowlingScores_2024-02-17.json"

export default function ScoreHistory({scoreData, dateString}) {
    const [scores, setScores] = useState(scoreData.scores)
    const formatDate = (dateStr) =>{
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateStr).toLocaleDateString(undefined, options);
    };

    const maxGames = Math.max(...scores.map(player => player.scores.length));

    const calculatePlayerAverage = (scores) => {
        const validScores = scores.filter(score => score !== undefined && score !== null);
        if (validScores.length === 0) return 0;
        
        const sum = validScores.reduce((total, score) => total + score, 0);
        return Math.round((sum / validScores.length) * 10) / 10;
      };
      
      const calculateOverallAverage = () => {
        let allScores = [];
        scores.forEach(player => {
          allScores = [...allScores, ...player.scores.filter(score => score !== undefined && score !== null)];
        });
        
        if (allScores.length === 0) return 0;
        
        const sum = allScores.reduce((total, score) => total + score, 0);
        return Math.round((sum / allScores.length) * 10) / 10;
      };
      
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
                            {Array.from({ length: maxGames }, (_, i) => (
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
                                    
                                    {Array.from({ length: maxGames }, (_, i) => (
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
            <Box sx={{ 
                mt: 4, 
                pt: 3,
                borderTop: '1px solid var(--md-sys-color-outline-variant)'
            }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'var(--md-sys-color-primary)' }}>
                    Player Averages
                </Typography>
                
                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 2,
                    mt: 2 
                }}>
                    {scores.map(player => (
                        <Paper
                            key={player.id}
                            elevation={1}
                            sx={{
                                p: 2,
                                minWidth: 200,
                                backgroundColor: 'var(--md-sys-color-surface-container)',
                                borderLeft: '3px solid var(--md-sys-color-primary)',
                                color: 'var(--md-sys-color-on-surface)'
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {player.username}
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'var(--md-sys-color-primary)' }}>
                                {calculatePlayerAverage(player.scores)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                                Average score across {player.scores.length} games
                            </Typography>
                        </Paper>
                    ))}
                </Box>
                
                <Box sx={{ 
                    mt: 3, 
                    p: 2, 
                    backgroundColor: 'var(--md-sys-color-surface-container-high)',
                    borderRadius: 1,
                    borderLeft: '4px solid var(--md-sys-color-secondary)'
                }}>
                    <Typography variant="h6" gutterBottom>
                        Overall Statistics
                    </Typography>
                    <Typography variant="body1">
                        Overall Average: <Box component="span" sx={{ fontWeight: 'bold', color: 'var(--md-sys-color-secondary)' }}>
                            {calculateOverallAverage()}
                        </Box>
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--md-sys-color-on-surface-variant)', mt: 1 }}>
                        Based on {scores.reduce((total, player) => total + player.scores.filter(s => s).length, 0)} total games played
                    </Typography>
                </Box>
            </Box>
        </Paper>
    </Box>
    </Container>
  )
}
