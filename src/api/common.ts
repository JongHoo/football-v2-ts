import Axios from 'axios'
import { ApiResponse } from '../interfaces/ApiResponse'
import { Standing } from '../interfaces/Standing'
import { TopScorer } from '../interfaces/TopScorer'
import { Fixture } from '../interfaces/Fixture'

const commonApiList = {
  async getStandingList (league: string, season: string): Promise<ApiResponse<Standing>> {
    return Axios.get(`https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/standings/${league}/${season}`)
  },
  async getTopScorerList (league: string, season: string): Promise<ApiResponse<TopScorer>> {
    return Axios.get(`https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/topscorers/${league}/${season}`)
  },
  async getTeamList (league: string, season: string): Promise<ApiResponse<Standing>> {
    return Axios.get(`https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/standings/${league}/${season}`)
  },
  async getFixtureList (league: string, season: string, team: string): Promise<ApiResponse<Fixture>> {
    return Axios.get(`https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/fixtures/${league}/${season}/${team}`)
  }
}

export default commonApiList
