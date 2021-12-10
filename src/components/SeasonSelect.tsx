import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

interface SeasonSelectProps {
  currentSeason: number,
  selectedSeason: string,
  onChangeSeason: (newSeason: string) => void
}
const START_SEASON = 2014

function SeasonSelect ({currentSeason, selectedSeason, onChangeSeason}: SeasonSelectProps) {
  return (
    <FormControl variant="standard" style={{ width: 102 }}>
      <InputLabel id="season-select">SEASON</InputLabel>
      <Select labelId="season-select" label="SEASON" value={selectedSeason} onChange={(event) => onChangeSeason(event.target.value)}>
        {
          new Array(currentSeason - START_SEASON + 1).fill(0).map((item, index) => (
            <MenuItem value={(START_SEASON + index).toString()} key={(START_SEASON + index).toString()}>
              {START_SEASON + index}-{START_SEASON + index + 1}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default SeasonSelect
