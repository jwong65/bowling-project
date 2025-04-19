import './App.css'
import HomePage from './components/HomePage'
import Header from './components/Header'
import ScoreHistory from './components/ScoreHistory'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'
import {ThemeProvider} from './context/ThemeContext'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {

  return (
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/scorehistory' element={<ScoreHistory/>}/>
        </Routes>
        </BrowserRouter>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

export default App
