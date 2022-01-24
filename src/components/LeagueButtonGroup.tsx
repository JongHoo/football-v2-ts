import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

interface LeagueButtonGroupProps {
  selectedLeague: string,
  onChange: (newLeague: string) => void
}

function LeagueButtonGroup ({ selectedLeague, onChange }: LeagueButtonGroupProps) {
  return (
    <div style={{ margin: '10px auto' }}>
      <ButtonGroup size={'small'} className='league_select_group'>
        <Button variant={selectedLeague === 'PL' ? 'contained' : 'outlined'} onClick={() => onChange('PL')}>PL</Button>
        <Button variant={selectedLeague === 'LALIGA' ? 'contained' : 'outlined'} onClick={() => onChange('LALIGA')}>La Liga</Button>
        <Button variant={selectedLeague === 'SERIEA' ? 'contained' : 'outlined'} onClick={() => onChange('SERIEA')}>Serie A</Button>
      </ButtonGroup>
      <ButtonGroup size={'small'} className='league_select_group'>
        <Button variant={selectedLeague === 'BUNDESLIGA' ? 'contained' : 'outlined'} onClick={() => onChange('BUNDESLIGA')}>Bundesliga</Button>
        <Button variant={selectedLeague === 'LIGUE1' ? 'contained' : 'outlined'} onClick={() => onChange('LIGUE1')}>Ligue 1</Button>
        <Button variant={selectedLeague === 'EREDIVISIE' ? 'contained' : 'outlined'} onClick={() => onChange('EREDIVISIE')}>Eredivisie</Button>
      </ButtonGroup>
    </div>
  )
}

export default LeagueButtonGroup
