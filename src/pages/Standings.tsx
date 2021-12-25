import React, {useEffect, useState} from 'react'
import LeagueSelect from '../components/LeagueSelect'
import SeasonSelect from '../components/SeasonSelect'
import StandingTable from '../components/StandingTable'
import { Standing } from '../interfaces/Standing'
import { ApiResponse } from '../interfaces/ApiResponse'
import commonApiList from '../api/common'
import { loadingState } from '../recoil/common'
import { useSetRecoilState } from 'recoil'

function getCurrentSeason (): number {
  const today = new Date()
  return today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
}

function Standings () {
  const [standingList, setStandingList] = useState<Array<Standing>>([])
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
      <div className="search-area">
        <LeagueSelect selectedLeague={league} onChange={changeLeague} />
        <SeasonSelect currentSeason={currentSeason} selectedSeason={season} onChangeSeason={changeSeason} />
      </div>
      <div className='table-area'>
        <StandingTable standingList={standingList} />
      </div>
    </div>
  )
}

export default Standings
