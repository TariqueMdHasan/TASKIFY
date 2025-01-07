import React from 'react'
import './RegPage.css'
import StartImage from '../components/startImage'
import Registration from '../components/registration'

function AuthPage() {
  return (
    <div className='auth-Main'>
        <StartImage/>
        <Registration/>
    </div>
  )
}

export default AuthPage