import React from 'react'
import './Analytics.css'
import StatusChart from './Charts/StatusChart'
import PriorityChart from './Charts/PriorityChart'
import ToStartChart from './Charts/toStartChart'
import ToEndChart from './Charts/toEndChart'

function Analytics() {
  return (
    <div className='Analytics'>
      <StatusChart />
      <PriorityChart />
      <ToStartChart />
      <ToEndChart />
    </div>
  )
}

export default Analytics