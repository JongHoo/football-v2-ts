import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import LeagueSelect from '../components/LeagueSelect'
import SeasonSelect from '../components/SeasonSelect'
import StandingTable from '../components/StandingTable'
import { Standing } from '../interfaces/Standing'

interface ApiResponse {
  data: Array<Standing>
}

function getCurrentSeason (): number {
  const today = new Date()
  return today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
}

function Standings () {
  const [standingList, setStandingList] = useState<Array<Standing>>([])
  const [league, setLeague] = useState<string>('PL')
  const [season, setSeason] = useState<string>(getCurrentSeason().toString())
  const [currentSeason] = useState<number>(getCurrentSeason())

  const getStandingList = async () => {
    try {
      const result: ApiResponse = await Axios.get(`https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/standings/${league}/${season}`)
      setStandingList(result.data)
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
