import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Standings from './pages/Standings'
import Fixtures from './pages/Fixtures'
import './App.css'

function App () {
  return (
    <div className="App">
      <Header />
      <Route exact path="/">
        <Redirect to="/Standings" />
      </Route>
      <Route path="/Standings" component={Standings} />
      <Route path="/Fixtures" component={Fixtures} />
    </div>
  )
}

export default App
