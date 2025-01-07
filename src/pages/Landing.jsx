import React from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={()=> navigate('/Registration')}>Registerrrrrrrrrrrrrrrrrr</button>
    </div>
  )
}

export default Landing