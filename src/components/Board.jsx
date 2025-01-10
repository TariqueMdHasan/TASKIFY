import React from 'react'
import './Board.css'
import Navbar from './navbar'
import BoardMain from './BoardMain'


function Board() {
  
  return (
    <div className='board'>
      
      <div className='board-upper'>
        <Navbar />
      </div>
      <div className='board-lower'>
        <BoardMain status="GENERAL"/>
        <BoardMain status="FAMILY"/>
        <BoardMain status="WORK"/>
        <BoardMain status="PERSONAL"/>
      </div>
    </div>
  )
}

export default Board