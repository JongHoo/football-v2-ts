export interface TopScorer {
  teamName: string,
  teamLogo: string,
  name: string,
  age: number,
  nationality: string,
  photo: string,
  lineups: number,
  minutes: number,
  position: string,
  goals: number,
  assists: number | null,
  penalty: number,
  rank: number
}
