import React from 'react'
import './navbar.css'

function navbar() {
  const date = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-IN', options);
  return (
    <div className='navbar'>
      <h2>Board</h2>
      <h3>{formattedDate}</h3>
    </div>
  )
}

export default navbar