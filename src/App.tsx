import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from './components/Header'
import Standings from './pages/Standings'
import TopScorers from './pages/TopScorers'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App () {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Route exact path="/">
          <Redirect to="/Standings" />
        </Route>
        <Route path="/Standings" component={Standings} />
        <Route path="/TopScorers" component={TopScorers} />
      </ThemeProvider>
    </div>
  )
}

export default App
