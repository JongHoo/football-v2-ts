import React, {useEffect, useState} from 'react'
import SeasonSelect from '../components/SeasonSelect'
import StandingTable from '../components/StandingTable'
import { Standing } from '../interfaces/Standing'
import { ApiResponse } from '../interfaces/ApiResponse'
import commonApiList from '../api/common'
import { loadingState } from '../recoil/common'
import { useSetRecoilState } from 'recoil'
import LeagueButtonGroup from '../components/LeagueButtonGroup'

function getCurrentSeason (): number {
  const today = new Date()
  return today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
}

function Standings () {
  const [standingList, setStandingList] = useState<Standing[]>([])
  const [league, setLeague] = useState<string>('PL')
  const [season, setSeason] = useState<string>(getCurrentSeason().toString())
  const [currentSeason] = useState<number>(getCurrentSeason())
  const setLoading = useSetRecoilState(loadingState)

  const getStandingList = async () => {
    setLoading(true)
    try {
      const result: ApiResponse<Standing> = await commonApiList.getStandingList(league, season)
      setStandingList(result.data)
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

  useEffect(() => {
    getStandingList()
  }, [league, season])

  return (
    <div className='content-area'>
      <LeagueButtonGroup selectedLeague={league} onChange={changeLeague} />
      <div className="search-area">
        <SeasonSelect currentSeason={currentSeason} selectedSeason={season} onChangeSeason={changeSeason} />
      </div>
      <div className='table-area'>
        <StandingTable standingList={standingList} />
      </div>
    </div>
  )
}

export default Standings
