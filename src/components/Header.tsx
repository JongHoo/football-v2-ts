import React from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs, Tab } from '@mui/material'

function Header () {
  const history = useHistory()
  const [selectedTab, setSelectedTab] = React.useState(window.location.pathname.split('/')[1] || 'Standings')
  const handleChange = (event: React.SyntheticEvent, newSelectedTab: string) => {
    setSelectedTab(newSelectedTab)
    history.push(newSelectedTab)
  }

  return (
    <div className="header">
      <div className="title-area">
        <h1>해축해축</h1>
      </div>
      <Tabs value={selectedTab} onChange={handleChange} textColor="inherit" centered>
        <Tab label="리그순위" value="Standings" />
        <Tab label="개인순위" value="TopScorers" />
        <Tab label="팀별일정" value="Fixtures" />
      </Tabs>
    </div>
  )
}

export default Header
