import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import React from 'react'
import { TopScorer } from '../interfaces/TopScorer'

interface TopScorerTableProps {
  topScorerList: TopScorer[]
}

function formatPosition (position: string) {
  return position === 'Attacker' ? 'Foward' : position
}

function TopScorerTable ({ topScorerList }: TopScorerTableProps) {
  return (
    <TableContainer component={Paper} className='dark-table'>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <TableCell align="right" />
            <TableCell align="center">팀</TableCell>
            <TableCell align="center" style={{ minWidth: 100 }}>이름</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>득점</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>도움</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>경기</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>PK</TableCell>
            <TableCell align="center" style={{ minWidth: 25 }}>포지션</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            topScorerList.map((row, index) => (
              <TableRow key={row.teamName + row.name}>
                <TableCell align="right">{row.rank}</TableCell>
                <TableCell align="center">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={row.teamLogo} alt='team logo' style={{ width: 25, height: 25 }} />
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div className='name-cell player-name'>{row.name}</div>
                </TableCell>
                <TableCell align="center">{row.goals || 0}</TableCell>
                <TableCell align="center">{row.assists || 0}</TableCell>
                <TableCell align="center">{row.lineups || 0}</TableCell>
                <TableCell align="center">{row.penalty || 0}</TableCell>
                <TableCell align="left">{formatPosition(row.position) || '-'}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TopScorerTable
