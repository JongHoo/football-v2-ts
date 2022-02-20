import Axios from 'axios'
import { ApiResponse } from '../interfaces/ApiResponse'
import { Standing } from '../interfaces/Standing'
import { TopScorer } from '../interfaces/TopScorer'
import { Fixture } from '../interfaces/Fixture'

const apiInstance = Axios.create({
  baseURL: 'https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com'
})

const commonApiList = {
  async getStandingList (league: string, season: string): Promise<ApiResponse<Standing>> {
    return apiInstance.get(`/dev/standings/${league}/${season}`)
  },
  async getTopScorerList (league: string, season: string): Promise<ApiResponse<TopScorer>> {
    return apiInstance.get(`/dev/topscorers/${league}/${season}`)
  },
  async getTeamList (league: string, season: string): Promise<ApiResponse<Standing>> {
    return apiInstance.get(`/dev/standings/${league}/${season}`)
  },
  async getFixtureList (league: string, season: string, team: string): Promise<ApiResponse<Fixture>> {
    return apiInstance.get(`/dev/fixtures/${league}/${season}/${team}`)
  }
}

export default commonApiList
