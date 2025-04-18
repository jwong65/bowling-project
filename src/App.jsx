import './App.css'
import HomePage from './components/HomePage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'

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
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
