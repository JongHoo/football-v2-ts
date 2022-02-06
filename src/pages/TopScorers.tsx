import React, {useEffect, useState} from 'react'
import SeasonSelect from '../components/SeasonSelect'
import { TopScorer } from '../interfaces/TopScorer'
import TopScorerTable from '../components/TopScorerTable'
import { ApiResponse } from '../interfaces/ApiResponse'
import commonApiList from '../api/common'
import { loadingState } from '../recoil/common'
import { useSetRecoilState } from 'recoil'
import LeagueButtonGroup from '../components/LeagueButtonGroup'

function getCurrentSeason (): number {
  const today = new Date()
  return today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1
}

function TopScorers () {
  const [topScorerList, setTopScorerList] = useState<TopScorer[]>([])
  const [league, setLeague] = useState<string>('PL')
  const [season, setSeason] = useState<string>(getCurrentSeason().toString())
  const [currentSeason] = useState<number>(getCurrentSeason())
  const setLoading = useSetRecoilState(loadingState)

  const getTopScorerList = async () => {
    setLoading(true)
    try {
      const result: ApiResponse<TopScorer> = await commonApiList.getTopScorerList(league, season)
      result.data.forEach((item: TopScorer, index: number) => {
        if (!index) {
          item.rank = 1
          return
        }
        item.rank = item.goals === result.data[index - 1].goals ? result.data[index - 1].rank : index + 1
      })
      setTopScorerList(result.data)
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
    getTopScorerList()
  }, [league, season])

  return (
    <div className='content-area'>
      <LeagueButtonGroup selectedLeague={league} onChange={changeLeague} />
      <div className="search-area">
        <SeasonSelect currentSeason={currentSeason} selectedSeason={season} onChangeSeason={changeSeason} />
      </div>
      <div className='table-area'>
        <TopScorerTable topScorerList={topScorerList} />
      </div>
    </div>
  )
}

export default TopScorers
