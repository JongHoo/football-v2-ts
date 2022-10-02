import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from './components/Header'
import Standings from './pages/Standings'
import TopScorers from './pages/TopScorers'
import Fixtures from './pages/Fixtures'
import Loading from './components/Loading'
import './App.css'
import { RecoilRoot } from "recoil"

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App () {
  return (
    <div className="App">
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Header />
          <Route exact path="/">
            <Redirect to="/standings" />
          </Route>
          <Route path="/standings" component={Standings} />
          <Route path="/top-scorers" component={TopScorers} />
          <Route path="/fixtures" component={Fixtures} />
        </ThemeProvider>
        <Loading />
      </RecoilRoot>
    </div>
  )
}

export default App
