import React, {useState, useEffect} from 'react'
import ScoreHistory from './ScoreHistory';
import { Container, Box, Typography, Tabs, Tab, CircularProgress } from '@mui/material';

export default function BowlingHistory() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [scoreSessions, setScoreSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadScoreData = async () => {
            try {
                const scoreFiles = import.meta.glob('../data/bowling-scores/*.json');
                const sessions = [];

                for (const path in scoreFiles) {
                    const module = await scoreFiles[path]();
                  
                    const filename = path.split('/').pop();
                    const date = filename.replace('.json', '');
                    
                    sessions.push({
                        date,
                        data: module.default
                    });
                }
                sessions.sort((a, b) => new Date(a.date) - new Date(b.date));
                
                setScoreSessions(sessions);
                setLoading(false);
            } catch (error) {
                console.error('Error loading score data:', error);
                setLoading(false);
            }
        };
        
        loadScoreData();
    }, []);
    const handleTabChange = (event, newValue) =>{
        setSelectedTab(newValue)
    }
    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Container>
        );
    }
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
                    color: 'var(--md-sys-color-on-surface-variant)',
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
