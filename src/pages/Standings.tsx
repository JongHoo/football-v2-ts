import React, {useEffect, useState} from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import Axios from 'axios'
import LeagueSelect from '../components/LeagueSelect'
import SeasonSelect from '../components/SeasonSelect'

interface Standing {
  position: number,
  teamLogo: string,
  teamName: string,
  points: number,
  played: number,
  win: number,
  draw: number,
  lose: number,
  scores: number,
  conceded: number,
  goalsDiff: number
}

interface ApiResponse {
  data: Array<Standing>
}

function getCurrentSeason (): number {
  const today = new Date()
  return today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
}

function Standings () {
  const [standingList, setStandingList] = useState<Array<Standing>>([])
  const [league, setLeague] = useState<string>('PL')
  const [season, setSeason] = useState<string>(getCurrentSeason().toString())
  const [currentSeason] = useState<number>(getCurrentSeason())

  const getStandingList = async () => {
    try {
      const result: ApiResponse = await Axios.get(`https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/standings/${league}/${season}`)
      setStandingList(result.data)
    } catch (err) {
      alert('데이터 가져오기 실패')
      console.log(err)
    }
  }

  const changeLeague = (newLeague: string) => {
    setLeague(newLeague)
  }

  const changeSeason = (newSeason: string) => {
    setSeason(newSeason)
  }

  useEffect(() => {
    getStandingList()
  }, [league, season])

  return (
    <div className='content-area'>
      <div className="search-area">
        <LeagueSelect selectedLeague={league} onChange={changeLeague} />
        <SeasonSelect currentSeason={currentSeason} selectedSeason={season} onChangeSeason={changeSeason} />
      </div>
      <div className='table-area'>
        <TableContainer component={Paper} className='dark-table'>
          <Table stickyHeader size='small'>
            <TableHead>
              <TableRow>
                <TableCell align="right" />
                <TableCell align="center" style={{ minWidth: 135 }}>팀명</TableCell>
                <TableCell align="right" style={{ minWidth: 25 }}>승점</TableCell>
                <TableCell align="right" style={{ minWidth: 25 }}>경기</TableCell>
                <TableCell align="right">승</TableCell>
                <TableCell align="right">무</TableCell>
                <TableCell align="right">패</TableCell>
                <TableCell align="right" style={{ minWidth: 25 }}>득점</TableCell>
                <TableCell align="right" style={{ minWidth: 25 }}>실점</TableCell>
                <TableCell align="right" style={{ minWidth: 25 }}>+-</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                standingList.map((row) => (
                  <TableRow key={row.teamName}>
                    <TableCell align="right">{row.position}</TableCell>
                    <TableCell align="left">
                      <div className='team-name'>
                        <img src={row.teamLogo} alt='team logo' />
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: 122 }}>{row.teamName}</div>
                      </div>
                    </TableCell>
                    <TableCell align="right">{row.points}</TableCell>
                    <TableCell align="right">{row.played}</TableCell>
                    <TableCell align="right">{row.win}</TableCell>
                    <TableCell align="right">{row.draw}</TableCell>
                    <TableCell align="right">{row.lose}</TableCell>
                    <TableCell align="right">{row.scores}</TableCell>
                    <TableCell align="right">{row.conceded}</TableCell>
                    <TableCell align="right">{row.goalsDiff}</TableCell>
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

export default Standings
