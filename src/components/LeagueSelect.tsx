import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from "react";

interface LeagueSelectProps {
  selectedLeague: string,
  onChange: (newLeague: string) => void
}

function LeagueSelect ({ selectedLeague, onChange }: LeagueSelectProps) {
  return (
    <FormControl variant="standard" style={{ marginRight: 10, width: 140 }}>
      <InputLabel id="league-select">LEAGUE</InputLabel>
      <Select labelId="league-select" label="LEAGUE" value={selectedLeague} onChange={(event) => onChange(event.target.value)}>
        <MenuItem value={'PL'}>Premier League</MenuItem>
        <MenuItem value={'LALIGA'}>La Liga</MenuItem>
        <MenuItem value={'SERIEA'}>Serie A</MenuItem>
        <MenuItem value={'BUNDESLIGA'}>Bundesliga</MenuItem>
        <MenuItem value={'LIGUE1'}>Ligue 1</MenuItem>
        <MenuItem value={'EREDIVISIE'}>Eredivisie</MenuItem>
      </Select>
    </FormControl>
  )
}

export default LeagueSelect
