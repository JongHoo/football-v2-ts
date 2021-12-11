import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import LeagueSelect from '../components/LeagueSelect'
import SeasonSelect from '../components/SeasonSelect'
import { TopScorer } from '../interfaces/TopScorer'
import TopScorerTable from '../components/TopScorerTable'
import { ApiResponse } from '../interfaces/ApiResponse'

function getCurrentSeason (): number {
  const today = new Date()
  return today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
}

function TopScorers () {
  const [topScorerList, setTopScorerList] = useState<Array<TopScorer>>([])
  const [league, setLeague] = useState<string>('PL')
  const [season, setSeason] = useState<string>(getCurrentSeason().toString())
  const [currentSeason] = useState<number>(getCurrentSeason())

  const getTopScorerList = async () => {
    try {
      const result: ApiResponse<TopScorer> = await Axios.get(`https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/topscorers/${league}/${season}`)
      setTopScorerList(result.data)
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
    getTopScorerList()
  }, [league, season])

  return (
    <div className='content-area'>
      <div className="search-area">
        <LeagueSelect selectedLeague={league} onChange={changeLeague} />
        <SeasonSelect currentSeason={currentSeason} selectedSeason={season} onChangeSeason={changeSeason} />
      </div>
      <div className='table-area'>
        <TopScorerTable topScorerList={topScorerList} />
      </div>
    </div>
  )
}

export default TopScorers
