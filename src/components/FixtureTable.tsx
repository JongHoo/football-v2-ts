import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import React from 'react'
import { Fixture } from '../interfaces/Fixture'

interface FixtureTableProps {
  fixtureList: Array<Fixture>
}

function formatTime (dateString: string): string {
  const tempDate = new Date(dateString)
  const korDate = new Date(tempDate.setHours(tempDate.getHours() + 9))
  return korDate.toISOString().replace('T', ' ').substr(5, 11)
}

function FixtureTable ({ fixtureList }: FixtureTableProps) {
  return (
    <TableContainer component={Paper} className='dark-table'>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <TableCell align="right" style={{ minWidth: 135 }}>홈팀</TableCell>
            <TableCell align="center" style={{ minWidth: 70 }}>vs</TableCell>
            <TableCell align="left" style={{ minWidth: 135 }}>원정팀</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            fixtureList.map((row) => (
              <TableRow key={row.round}>
                <TableCell align="right">
                  <div className='team-name' style={{ justifyContent: 'flex-end' }}>
                    <div style={{ width: 85 }}>{row.homeTeam}</div>
                    <img src={row.homeTeamLogo} alt='team logo' style={{ marginLeft: 10, marginRight: 0 }} />
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className='round-info'>{`${row.round} R`}</div>
                  <div>{`${row.homeTeamGoals ?? '-'} : ${row.awayTeamGoals ?? '-'}`}</div>
                  <div className='round-info'>{formatTime(row.date)}</div>
                </TableCell>
                <TableCell align="left">
                  <div className='team-name'>
                    <img src={row.awayTeamLogo} alt='team logo' />
                    <div style={{ width: 85 }}>{row.awayTeam}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FixtureTable
