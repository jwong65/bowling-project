import React, {useState, useEffect} from 'react'
import { useThemeContext } from '../context/ThemeContext'

import { Container, Box, Typography, CircularProgress, Paper, Divider, Grid, Avatar, Card, CardContent, CardHeader, Tabs, Tab } from '@mui/material';

export default function BowlingStats() {
    const {themeMode} =useThemeContext()
    const [loading, setLoading] = useState(true);
    const [playerStats, setPlayerStats] = useState({})

    useEffect(() => {
        const loadAllScoreData = async () => {
            try {
                const scoreFiles = import.meta.glob('../data/bowling-scores/*.json');
                const sessions = []
                const playerStatsMap = {}
    
                for (const path in scoreFiles) {
                    const module = await scoreFiles[path]();
                    const filename = path.split('/').pop();
                    const date = filename.replace('.json', '')
    
                    sessions.push({
                        date,
                        data: module.default
                    })
                }
    
                sessions.sort((a, b) => new Date(a.date) - new Date(b.date))
                sessions.forEach(session => {
                    session.data.scores.forEach(player => {
                        const { username, scores, statistics } = player;
    
                        if (!playerStatsMap[username]) {
                            playerStatsMap[username] = {
                                username,
                                sessions: [],
                                totalGames: 0,
                                totalPins: 0,
                                highScore: 0,
                                lowScore: 300,
                                averageScore: 0,
                                strikes: 0,
                                spares: 0
                            }
                        }
    
                        const validScores = scores.filter(score => score !== null && score !== undefined)
                        
                        playerStatsMap[username].sessions.push({
                            date: session.date,
                            scores: validScores,
                            strikes: statistics?.strikes || 0,
                            spares: statistics?.spares || 0
                        });
                        
                        playerStatsMap[username].totalGames += validScores.length;
                        playerStatsMap[username].totalPins += validScores.reduce((sum, score) => sum + score, 0);
    
                        if (validScores.length > 0) {
                            playerStatsMap[username].highScore = Math.max(
                                playerStatsMap[username].highScore,
                                ...validScores
                            );
    
                            if (playerStatsMap[username].lowScore === 300) {
                                playerStatsMap[username].lowScore = Math.min(...validScores);
                            } else {
                                playerStatsMap[username].lowScore = Math.min(
                                    playerStatsMap[username].lowScore,
                                    ...validScores
                                );
                            }
                        }
    
                        playerStatsMap[username].strikes += statistics?.strikes || 0;
                        playerStatsMap[username].spares += statistics?.spares || 0;
                    });
                });
    
                Object.keys(playerStatsMap).forEach(username => {
                    const player = playerStatsMap[username];
                    player.averageScore = player.totalGames > 0
                        ? Math.round(player.totalPins / player.totalGames)
                        : 0;
                });
                setPlayerStats(playerStatsMap);
                setLoading(false);
            } catch (error) {
                console.error('Error loading score data:', error);
                setLoading(false);
            }
        };
    
        loadAllScoreData();
    }, []);
    
    
    if (loading) {
        return (
          <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Container>
        );
      }
    if (Object.keys(playerStats).length === 0) {
    return (
        <Container maxWidth="xl">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h5" color= 'var(--md-sys-color-on-surface-variant)'>
            No bowling statistics available
            </Typography>
        </Box>
        </Container>
    );
    }

  return (
    <Container maxWidth="xl">
        <Box sx={{ mt: 8, textAlign: 'center', backgroundColor: 'var(--md-sys-color-surface-container)', p: 2 }}>
            <Typography variant="h4" component="div" gutterBottomsx={{ color: 'var(--md-sys-color-primary)' }}>
                Bowling Statistics
            </Typography>
            <Typography variant="subtitle1" color="var(--md-sys-color-on-surface-variant)" sx={{ mt: 1 }}>
                Performance data for {Object.keys(playerStats).length} players
            </Typography>
        </Box>

         
      <Paper 
        elevation={2}
        sx={{
          backgroundColor: 'var(--md-sys-color-surface)',
          color: 'var(--md-sys-color-on-surface)',
          borderRadius: 2,
          p: 3,
          mb: 4
        }}
      >
        <Typography variant="h5" gutterBottom>
          Player Overview
        </Typography>
        <Divider sx={{ mb: 3 }} />
    
        {Object.values(playerStats).map((player) => (
          <Box 
            key={player.username}
            sx={{ 
              mb: 3, 
              p: 2, 
              borderRadius: 1,
              backgroundColor: 'var(--md-sys-color-surface-container)',
              border: '1px solid var(--md-sys-color-outline-variant)'
            }}
          >
            <Typography variant="h6">
              {player.username}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
              <Box>
                <Typography variant="body2" color="var(--md-sys-color-on-surface-variant)">
                  Average Score
                </Typography>
                <Typography variant="h6" color="var(--md-sys-color-primary)">
                  {player.averageScore}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="var(--md-sys-color-on-surface-variant)">
                  High Score
                </Typography>
                <Typography variant="h6" sx={{ color: 'var(--md-sys-color-tertiary)' }} >
                  {player.highScore}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="var(--md-sys-color-on-surface-variant)">
                  Low Score
                </Typography>
                <Typography variant="h6" sx={{ color: 'var(--md-sys-color-error)' }}>
                  {player.lowScore === 300 ? '-' : player.lowScore}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="var(--md-sys-color-on-surface-variant)">
                  Games Played
                </Typography>
                <Typography variant="h6">
                  {player.totalGames}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="var(--md-sys-color-on-surface-variant)">
                  Strikes
                </Typography>
                <Typography variant="h6" sx={{ color: 'var(--md-sys-color-tertiary)' }}>
                  {player.strikes}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="var(--md-sys-color-on-surface-variant)">
                  Spares
                </Typography>
                <Typography variant="h6" sx={{ color: 'var(--md-sys-color-secondary)' }}>
                  {player.spares}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Paper>
      <Box sx={{ mb: 4, textAlign: 'center', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: 1, p: 2, }}>
        <Typography variant="body2" sx={{ color: "var(--md-sys-color-on-surface-variant)" }}>
          Data compiled from {Object.values(playerStats)[0]?.sessions.length || 0} bowling sessions
        </Typography>
      </Box>

    </Container>
  )
}
