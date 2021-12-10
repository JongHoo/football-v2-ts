import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

interface TopScorer {
  teamName: string,
  teamLogo: string,
  name: string,
  age: number,
  nationality: string,
  photo: string,
  lineups: number,
  minutes: number,
  position: string,
  goals: number,
  assists: number | null,
  penalty: number
}

interface ApiResponse {
  data: Array<TopScorer>
}

const START_SEASON = 2014

function getCurrentSeason (): number {
  const today = new Date()
  return today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
}

function TopScorers () {
  const [topScorerList, setTopScorerList] = useState<Array<TopScorer>>([])
  const [league, setLeague] = useState<string>('PL')
  const [season, setSeason] = useState<string>(getCurrentSeason().toString())
  const [currentSeason] = useState<number>(getCurrentSeason())

  const getTopScorerList = async () => {
    try {
      const result: ApiResponse = await Axios.get(`https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/topscorers/${league}/${season}`)
      setTopScorerList(result.data)
    } catch (err) {
      alert('데이터 가져오기 실패')
      console.log(err)
    }
  }

  const changeLeague = (event: SelectChangeEvent) => {
    setLeague(event.target.value)
  }

  const changeSeason = (event: SelectChangeEvent) => {
    setSeason(event.target.value)
  }

  useEffect(() => {
    getTopScorerList()
  }, [league, season])

  return (
    <div className='content-area'>
      <div className="search-area">
        <FormControl variant="standard" style={{ marginRight: 10, width: 140 }}>
          <InputLabel id="league-select">LEAGUE</InputLabel>
          <Select labelId="league-select" label="LEAGUE" value={league} onChange={changeLeague}>
            <MenuItem value={'PL'}>Premier League</MenuItem>
            <MenuItem value={'LALIGA'}>La Liga</MenuItem>
            <MenuItem value={'SERIEA'}>Serie A</MenuItem>
            <MenuItem value={'BUNDESLIGA'}>Bundesliga</MenuItem>
            <MenuItem value={'LIGUE1'}>Ligue 1</MenuItem>
            <MenuItem value={'EREDIVISIE'}>Eredivisie</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" style={{ width: 102 }}>
          <InputLabel id="season-select">SEASON</InputLabel>
          <Select labelId="season-select" label="SEASON" value={season} onChange={changeSeason}>
            {
              new Array(currentSeason - START_SEASON + 1).fill(0).map((item, index) => (
                <MenuItem value={(START_SEASON + index).toString()} key={(START_SEASON + index).toString()}>
                  {START_SEASON + index}-{START_SEASON + index + 1}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      <div className='table-area'>
        <TableContainer component={Paper} className='dark-table'>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                <TableCell align="right" />
                <TableCell align="center">팀</TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>이름</TableCell>
                <TableCell align="right" style={{ minWidth: 25 }}>득점</TableCell>
                <TableCell align="right" style={{ minWidth: 25 }}>도움</TableCell>
                <TableCell align="right" style={{ minWidth: 25 }}>경기</TableCell>
                <TableCell align="right" style={{ minWidth: 25 }}>PK</TableCell>
                <TableCell align="left" style={{ minWidth: 25 }}>포지션</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                topScorerList.map((row, index) => (
                  <TableRow key={row.name}>
                    <TableCell align="right">{index + 1}</TableCell>
                    <TableCell align="center">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={row.teamLogo} alt='team logo' style={{ width: 25, height: 25 }} />
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={row.photo} alt={row.name + '_photo'} style={{ width: 25, height: 25, marginRight: 10 }} />
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: 120 }}>{row.name}</div>
                      </div>
                    </TableCell>
                    <TableCell align="right">{row.goals || 0}</TableCell>
                    <TableCell align="right">{row.assists || 0}</TableCell>
                    <TableCell align="right">{row.lineups || 0}</TableCell>
                    <TableCell align="right">{row.penalty || 0}</TableCell>
                    <TableCell align="left">{row.position || 0}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default TopScorers
