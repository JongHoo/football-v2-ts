import SyncLoader from 'react-spinners/SyncLoader'
import React from 'react'

interface LoadingProps {
  isLoading: boolean
}

function Loading ({ isLoading }: LoadingProps) {
  return (
    <div style={{ display: isLoading ? 'unset': 'none' }}>
      <div className='loading-screen'>
      </div>
      <div className='spinner-wrapper'>
        <SyncLoader color='#36D7B7' />
      </div>
    </div>
  )
}

export default Loading
