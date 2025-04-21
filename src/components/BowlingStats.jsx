import React, {useState, useEffect} from 'react'
import { useThemeContext } from '../context/ThemeContext'

export default function BowlingStats() {
    const {themeMode} =useThemeContext()
    const [loading, setLoading] = useState(true);
    const [playerStats, setPlayerStats] = useState({})

    useEffect(()=>{

    },[])
    
  return (
    <div>BowlingStats</div>
  )
}
