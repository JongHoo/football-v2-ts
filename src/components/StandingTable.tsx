import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import React from 'react'
import { Standing } from '../interfaces/Standing'

interface StandingTableProps {
  standingList: Standing[]
}

function StandingTable ({ standingList }: StandingTableProps) {
  return (
    <TableContainer component={Paper} className='dark-table'>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <TableCell align="right" />
            <TableCell align="center" />
            <TableCell align="center">팀명</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>승점</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>경기</TableCell>
            <TableCell align="center">승</TableCell>
            <TableCell align="center">무</TableCell>
            <TableCell align="center">패</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>득점</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>실점</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>+-</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            standingList.map((row) => (
              <TableRow key={row.teamName}>
                <TableCell align="right">{row.position}</TableCell>
                <TableCell align="center">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={row.teamLogo} alt='team logo' style={{ width: 25, height: 25 }} />
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div className='name-cell team-name'>{row.teamName}</div>
                </TableCell>
                <TableCell align="center">{row.points}</TableCell>
                <TableCell align="center">{row.played}</TableCell>
                <TableCell align="center">{row.win}</TableCell>
                <TableCell align="center">{row.draw}</TableCell>
                <TableCell align="center">{row.lose}</TableCell>
                <TableCell align="center">{row.scores}</TableCell>
                <TableCell align="center">{row.conceded}</TableCell>
                <TableCell align="center">{row.goalsDiff}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StandingTable
