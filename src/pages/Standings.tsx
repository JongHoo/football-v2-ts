import React, { useEffect, useState } from 'react'
import Axios from 'axios'

interface Standing {
  position: number,
  teamName: string
}

interface ApiResponse {
  data: Array<Standing>
}

function Standings() {
  const [standingList, setStandingList] = useState<Array<Standing>>([])

  const getStandingList = async () => {
    try {
      const result: ApiResponse = await Axios.get('https://54s8quvzrl.execute-api.ap-northeast-2.amazonaws.com/dev/standings/LALIGA/2021')
      setStandingList(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getStandingList()
  }, [])

  return (
    <div>
      <h1>Standings!!</h1>
      <table>
        <tbody>
        {
          standingList.map((standing) => (
            <tr key={standing.position}>
              <td>{standing.position}</td>
              <td>{standing.teamName}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default Standings
