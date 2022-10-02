import React from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs, Tab } from '@mui/material'

function Header () {
  const history = useHistory()
  const [selectedTab, setSelectedTab] = React.useState(window.location.pathname.split('/')[1] || 'standings')
  const handleChange = (event: React.SyntheticEvent, newSelectedTab: string) => {
    setSelectedTab(newSelectedTab)
    history.push(newSelectedTab)
  }

  return (
    <div className="header">
      <div className="title-area">
        <span>&#9917; 해축해축 &#9917;️</span>
      </div>
      <Tabs value={selectedTab} onChange={handleChange} textColor="inherit" centered>
        <Tab label="리그순위" value="standings" />
        <Tab label="개인순위" value="top-scorers" />
        <Tab label="팀별일정" value="fixtures" />
      </Tabs>
    </div>
  )
}

export default Header
