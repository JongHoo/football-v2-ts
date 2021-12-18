import React, {useEffect, useState} from 'react'
import {ApiResponse} from '../interfaces/ApiResponse'
import {Standing} from '../interfaces/Standing'
import LeagueSelect from '../components/LeagueSelect'
import SeasonSelect from '../components/SeasonSelect'
import TeamSelect from '../components/TeamSelect'
import FixtureTable from '../components/FixtureTable'
import {Fixture} from '../interfaces/Fixture'
import commonApiList from '../api/common'

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

  const getTeamList = async () => {
    try {
      const result: ApiResponse<Standing> = await commonApiList.getStandingList(league, season)
      const sortedTeamList = result.data.sort((a, b) => a.teamName.localeCompare(b.teamName))
      setTeamList(sortedTeamList)
      setTeam(sortedTeamList[0].teamName)
    } catch (err) {
      alert('데이터 가져오기 실패')
      console.log(err)
    }
  }

  const getFixtureList = async () => {
    try {
      const result: ApiResponse<Fixture> = await commonApiList.getFixtureList(league, season, team)
      setFixtureList(result.data)
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

  const changeTeam = (newTeam: string) => {
    setTeam(newTeam)
  }

  useEffect(() => {
    getTeamList()
  }, [league, season])

  useEffect(() => {
    if (team) {
      getFixtureList()
    }
  }, [team])

  return (
    <div className='content-area'>
      <div className="search-area">
        <LeagueSelect selectedLeague={league} onChange={changeLeague} />
        <SeasonSelect currentSeason={currentSeason} selectedSeason={season} onChangeSeason={changeSeason} />
        <TeamSelect selectedTeam={team} teamList={teamList} onChange={changeTeam} />
      </div>
      <div className='table-area'>
        <FixtureTable fixtureList={fixtureList} />
      </div>
    </div>
  )
}

export default Fixtures
