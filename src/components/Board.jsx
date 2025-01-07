import React from 'react'
import './Board.css'
import Navbar from './navbar'

function Board() {
  return (
    <div className='board'>
        <div className='board-upper'>
          <Navbar />
        </div>
        <div className='board-lower'>
          
        </div>
    </div>
  )
}

export default Board