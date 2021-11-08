import React from 'react';
import { Tabs, Tab } from '@mui/material';

function Header () {
  const [selectedTab, setSelectedTab] = React.useState('standings')
  const handleChange = (event: React.SyntheticEvent, newSelectedTab: string) => {
    setSelectedTab(newSelectedTab)
  }

  return (
    <div>
      <div className="title-area">
        <h1>해축해축</h1>
      </div>
      <Tabs value={selectedTab} onChange={handleChange} textColor="inherit" centered>
        <Tab label="순위" value="standings"></Tab>
        <Tab label="일정" value="fixtures"></Tab>
      </Tabs>
    </div>
  )
}

export default Header
