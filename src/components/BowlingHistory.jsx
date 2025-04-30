import React, {useState, useEffect} from 'react'
import ScoreHistory from './ScoreHistory';
import { Container, Box, Typography, Tabs, Tab, CircularProgress, Paper } from '@mui/material';

import {useThemeContext} from '../context/ThemeContext'
export default function BowlingHistory() {
    const {themeMode} = useThemeContext();
    const [yearTab, setYearTab] = useState(0);
    const [dateTabs, setDateTabs] = useState({});
    const [scoresByYear, setScoresByYear] = useState({});
    const [loading, setLoading] = useState(true);
    const [years, setYears] = useState([]);
    
    useEffect(() => {
        const loadScoreData = async () => {
            try {
                const scoreFiles = import.meta.glob('../data/bowling-scores/*.json');
                const sessionsByYear = {}; 

                for (const path in scoreFiles) {
                    const module = await scoreFiles[path]();
                  
                    const filename = path.split('/').pop();
                    const date = filename.replace('.json', '');
                    const year = date.split('-')[0];
                    if (!sessionsByYear[year]) {
                        sessionsByYear[year] = [];
                    }
                    
                    sessionsByYear[year].push({
                        date,
                        data: module.default
                    });
                }
                
                Object.keys(sessionsByYear).forEach((year) => {
                    sessionsByYear[year].sort((a, b) => new Date(a.date) - new Date(b.date));
                });
                
                const sortedYears = Object.keys(sessionsByYear).sort((a, b) => b - a);
            
                const initialDateTabs = {};
                sortedYears.forEach(year => {
                    initialDateTabs[year] = 0;
                });
                
                setYears(sortedYears);
                setScoresByYear(sessionsByYear);
                setDateTabs(initialDateTabs);
                setLoading(false);
            } catch (error) {
                console.error('Error loading score data:', error);
                setLoading(false);
            }
        };
        
        loadScoreData();
    }, []);
    
    const handleTabChange = (event, newValue) => {
        setYearTab(newValue);
    }
    
    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Container>
        );
    }
    
    if (years.length === 0) {
        return (
            <Container maxWidth="xl">
                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Typography variant="h5" color="var(--md-sys-color-on-surface-variant)">
                        No bowling score data available
                    </Typography>
                </Box>
            </Container>
        );
    }

    const currentYear = years[yearTab];
    const currentSessions = scoresByYear[currentYear] || [];

    const handleDateTabChange = (event, newValue) => {
        setDateTabs(prev => ({
            ...prev,
            [currentYear]: newValue
        }));
    };
    
    const formatDate = (dateStr) => {
        try {
            const date = new Date(`${dateStr}T00:00:00`);
            return date.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    };
    
    return (
        <Container maxWidth="xl">
            <Box sx={{ mt: 8, mb: 2 }}>
                <Typography variant="h4" component="h1" sx={{ color: 'var(--md-sys-color-primary)' }}>
                    Bowling Score History
                </Typography>
            </Box>
            <Paper 
                elevation={2}
                sx={{
                    backgroundColor: 'var(--md-sys-color-surface)',
                    borderRadius: 1,
                    mb: 3,
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                        value={yearTab} 
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTab-root': {
                                fontWeight: 'bold',
                                margin: '2px',
                                borderRadius: '4px 4px 0 0',
                                color: 'var(--md-sys-color-on-surface-variant)',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'var(--md-sys-color-primary)',
                                height: 3
                            }
                        }}
                    >
                        {years.map((year) => (
                            <Tab 
                                key={year} 
                                label={year} 
                                sx={{
                                    textTransform: 'none',
                                    fontSize: { xs: '1rem', sm: '1.1rem' }
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>
             
                {currentSessions.length > 0 && (
                    <Box sx={{ 
                        borderBottom: 1, 
                        borderColor: 'divider',
                        backgroundColor: 'var(--md-sys-color-surface-variant)'
                    }}>
                        <Tabs 
                            value={dateTabs[currentYear] || 0} 
                            onChange={handleDateTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={{
                                '& .MuiTab-root': {
                                    color: 'var(--md-sys-color-on-surface-variant)',
                                    fontWeight: 'medium',
                                    '&.Mui-selected': {
                                        color: 'var(--md-sys-color-primary)',
                                        backgroundColor: 'var(--md-sys-color-surface)',
                                        fontWeight: 'bold'
                                    }
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'var(--md-sys-color-primary)',
                                    height: 2
                                }
                            }}
                        >
                            {currentSessions.map((session, index) => (                                 <Tab 
                                    key={session.date} 
                                    label={formatDate(session.date)}
                                    sx={{
                                        textTransform: 'none',
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Box>
                )}
                
                {currentSessions.map((session, dateIndex) => ( 
                    <Box
                        key={session.date}
                        hidden={dateTabs[currentYear] !== dateIndex}
                        sx={{ display: dateTabs[currentYear] === dateIndex ? 'block' : 'none' }}
                    >
                        {dateTabs[currentYear] === dateIndex && (
                            <ScoreHistory 
                                scoreData={session.data} 
                                dateString={session.date} 
                            />
                        )}
                    </Box>
                ))}
            </Paper>
        </Container>
    );
}