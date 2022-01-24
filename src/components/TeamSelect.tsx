import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from "react";
import {Standing} from "../interfaces/Standing";

interface TeamSelectProps {
  selectedTeam: string,
  teamList: Standing[],
  onChange: (newTeam: string) => void
}

function TeamSelect ({ selectedTeam, teamList, onChange }: TeamSelectProps) {
  return (
    <FormControl variant="standard" style={{ marginRight: 10, width: 130 }}>
      <InputLabel id="team-select">TEAM</InputLabel>
      <Select labelId="team-select" label="TEAM" value={selectedTeam} onChange={(event) => onChange(event.target.value)}>
        {
          teamList.map((team) => (
            <MenuItem value={team.teamName} key={team.teamName}>{team.teamName}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default TeamSelect
