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
  )
}

export default StandingTable
