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
        <BoardMain status="BACKLOG"/>
        <BoardMain status="TODO"/>
        <BoardMain status="IN PROGRESS"/>
        <BoardMain status="DONE"/>
      </div>
    </div>
  )
}

export default Board