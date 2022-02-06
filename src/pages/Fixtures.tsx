import React, { useEffect, useState } from 'react'
import { ApiResponse } from '../interfaces/ApiResponse'
import { Standing } from '../interfaces/Standing'
import SeasonSelect from '../components/SeasonSelect'
import TeamSelect from '../components/TeamSelect'
import FixtureTable from '../components/FixtureTable'
import { Fixture } from '../interfaces/Fixture'
import commonApiList from '../api/common'
import { loadingState } from '../recoil/common'
import { useSetRecoilState } from 'recoil'
import { Button } from '@mui/material'
import LeagueButtonGroup from '../components/LeagueButtonGroup'

function getCurrentSeason (): number {
  const today = new Date()
  return today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
}

function Fixtures () {
  const [teamList, setTeamList] = useState<Standing[]>([])
  const [fixtureList, setFixtureList] = useState<Fixture[]>([])
  const [league, setLeague] = useState<string>('PL')
  const [season, setSeason] = useState<string>(getCurrentSeason().toString())
  const [team, setTeam] = useState<string>('')
  const [currentSeason] = useState<number>(getCurrentSeason())
  const setLoading = useSetRecoilState(loadingState)

  const getTeamList = async () => {
    setLoading(true)
    try {
      const result: ApiResponse<Standing> = await commonApiList.getStandingList(league, season)
      const sortedTeamList = result.data.sort((a, b) => a.teamName.localeCompare(b.teamName))
      setTeam('')
      setTeamList(sortedTeamList)
      setTeam(sortedTeamList[0].teamName)
    } catch (err) {
      alert('데이터 가져오기 실패')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const getFixtureList = async () => {
    setLoading(true)
    try {
      const result: ApiResponse<Fixture> = await commonApiList.getFixtureList(league, season, team)
      setFixtureList(result.data)
    } catch (err) {
      alert('데이터 가져오기 실패')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const changeLeague = (newLeague: string) => {
    setLeague(newLeague)
  }

  const changeSeason = (newSeason: string) => {
    setSeason(newSeason)
  }

  const changeTeam = (newTeam: string) => {
    setTeam(newTeam)
  }

  useEffect(() => {
    getTeamList()
  }, [league, season])

  return (
    <div className='content-area'>
      <LeagueButtonGroup selectedLeague={league} onChange={changeLeague} />
      <div className="search-area">
        <div>
          <SeasonSelect currentSeason={currentSeason} selectedSeason={season} onChangeSeason={changeSeason} />
          <TeamSelect selectedTeam={team} teamList={teamList} onChange={changeTeam} />
        </div>
        <Button onClick={getFixtureList}>Search</Button>
      </div>
      <div className='table-area'>
        <FixtureTable fixtureList={fixtureList} />
      </div>
    </div>
  )
}

export default Fixtures
