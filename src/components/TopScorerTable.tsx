import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import React from 'react'
import { TopScorer } from '../interfaces/TopScorer'

interface TopScorerTableProps {
  topScorerList: Array<TopScorer>
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
                <TableCell align="right">{row.rank}</TableCell>
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
  )
}

export default TopScorerTable
