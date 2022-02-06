import SyncLoader from 'react-spinners/SyncLoader'
import React from 'react'
import { loadingState } from '../recoil/common'
import { useRecoilState } from 'recoil'

function Loading () {
  const [loading] = useRecoilState(loadingState)

  return (
    <div style={{ display: loading ? 'unset': 'none' }}>
      <div className='loading-screen'>
      </div>
      <div className='spinner-wrapper'>
        <SyncLoader color='#36D7B7' />
      </div>
    </div>
  )
}

export default Loading
