import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import React from 'react'
import { Fixture } from '../interfaces/Fixture'

interface FixtureTableProps {
  fixtureList: Fixture[]
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
            <TableCell align="right" style={{ width: '40%' }}>홈팀</TableCell>
            <TableCell align="center" style={{ width: '20%' }}>vs</TableCell>
            <TableCell align="left" style={{ width: '40%' }}>원정팀</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            fixtureList.length ?
            fixtureList.map((row) => (
              <TableRow key={row.round}>
                <TableCell align="right">
                  <div className='team-with-image' style={{ justifyContent: 'flex-end' }}>
                    <div>{row.homeTeam}</div>
                    <img src={row.homeTeamLogo} alt='team logo' style={{ marginLeft: 10, marginRight: 0 }} />
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className='round-info'>{`${row.round} R`}</div>
                  <div>{`${row.homeTeamGoals ?? '-'} : ${row.awayTeamGoals ?? '-'}`}</div>
                  <div className='round-info'>{formatTime(row.date)}</div>
                </TableCell>
                <TableCell align="left">
                  <div className='team-with-image'>
                    <img src={row.awayTeamLogo} alt='team logo' />
                    <div>{row.awayTeam}</div>
                  </div>
                </TableCell>
              </TableRow>
            )) :
              <TableRow>
                <TableCell colSpan={3} align={'center'}>Press Search button</TableCell>
              </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FixtureTable
