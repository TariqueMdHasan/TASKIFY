import React from 'react'
import './LogPage.css';
import StartImage from '../components/startImage';
import Login from '../components/login';

function LogPage() {
  return (
    <div className='auth-Login-Main'>
        <StartImage/>
        <Login/>
    </div>
  )
}

export default LogPage