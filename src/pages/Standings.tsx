import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import Axios from 'axios'
// import testStandingList from '../assets/testData.json'

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

function Standings() {
  const [standingList, setStandingList] = useState<Array<Standing>>([])

  const getStandingList = async () => {
    try {
      const result: ApiResponse = await Axios.get('https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/standings/PL/2021')
      setStandingList(result.data)
    } catch (err) {
      console.log(err)
    }
    // const result: ApiResponse = testStandingList
    // setStandingList(result.data)
  }

  useEffect(() => {
    getStandingList()
  }, [])

  return (
    <div className='content-area'>
      <TableContainer component={Paper} className='dark-table'>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right" />
              <TableCell align="center" style={{ minWidth: 120 }}>팀명</TableCell>
              <TableCell align="right" style={{ minWidth: 25 }}>승점</TableCell>
              <TableCell align="right" style={{ minWidth: 38 }}>경기수</TableCell>
              <TableCell align="right">승</TableCell>
              <TableCell align="right">무</TableCell>
              <TableCell align="right">패</TableCell>
              <TableCell align="right" style={{ minWidth: 25 }}>득점</TableCell>
              <TableCell align="right" style={{ minWidth: 25 }}>실점</TableCell>
              <TableCell align="right" style={{ minWidth: 38 }}>득실차</TableCell>
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
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: 95 }}>{row.teamName}</div>
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
  )
}

export default Standings
