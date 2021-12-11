import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import LeagueSelect from '../components/LeagueSelect'
import SeasonSelect from '../components/SeasonSelect'

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

  const changeLeague = (newLeague: string) => {
    setLeague(newLeague)
  }

  const changeSeason = (newSeason: string) => {
    setSeason(newSeason)
  }

  useEffect(() => {
    getTopScorerList()
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
                        {/*<img src={row.photo} alt={row.name + '_photo'} style={{ width: 25, height: 25, marginRight: 10 }} />*/}
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
