import React, {useState} from 'react'
import ScoreHistory from './ScoreHistory';
import { Container, Box, Typography, Tabs, Tab } from '@mui/material';


import scoreData20240217 from "../data/bowlingScores_2024-02-17.json";
import scoreData20240311 from "../data/bowlingScores_2024-03-11.json";

export default function BowlingHistory() {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (event, newValue) =>{
        setSelectedTab(newValue)
    }
    const scoreSessions = [
        {
          date: "2024-02-17",
          data: scoreData20240217
        },
        {
            date: "2024-03-11",
            data: scoreData20240311
        }
    ]
  return (
    <Container maxWidth="xl">
        <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" component="h1" sx={{ color: 'var(--md-sys-color-primary)' }}>
            Bowling Score History
        </Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
            value={selectedTab} 
            onChange={handleTabChange}
            sx={{
            '& .MuiTab-root': {
                color: 'var(--md-sys-color-on-surface)',
                '&.Mui-selected': {
                color: 'var(--md-sys-color-primary)',
                }
            },
            '& .MuiTabs-indicator': {
                backgroundColor: 'var(--md-sys-color-primary)',
            }
            }}
        >
            {scoreSessions.map((session) => (
            <Tab 
                key={session.date} 
                label={session.date} 
            />
            ))}
        </Tabs>
        </Box>
        {scoreSessions.map((session, index) => (
        <Box
            key={session.date}
            hidden={selectedTab !== index}
        >
            {selectedTab === index && (
            <ScoreHistory 
                scoreData={session.data} 
                dateString={session.date} 
            />
            )}
        </Box>
        ))}
    </Container>
    );
}
