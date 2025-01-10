import React, { useState } from 'react'
import './Settings.css'
import { IoMdContact } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios'

function Settings() {
  const [passwordType, setPasswordType] = useState('password')
  const [passwordTypeSlash, setPasswordTypeSlash] = useState(<FaRegEyeSlash />)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)



  const togglePasswordVisibility = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setPasswordTypeSlash(<FaRegEye />)
    } else {
      setPasswordType('password');
      setPasswordTypeSlash(<FaRegEyeSlash />)
    }
  }

  const handleUpdate = async(e) =>{
    e.preventDefault()

    if(!userName ){
        toast.error('Please enter Name')
        return
    }else if(!email ){
        toast.error('Please enter Email')
        return
    }else if(!password ){
        toast.error('Please enter Password')
        return
    }

    const updatedData = {
      userName: userName, 
      email: userName,
      password: userName,
    }

    try{
      const token = localStorage.getItem('authToken')
      setLoading(true)
      const response = await axios.put('https://taskmanager-yxx2.onrender.com/api/auth/update', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      
      
      if(response.status===200){
        toast.success('Updated successfully')
      }else{
        toast.error('Update failed, Please try again later')
      }

      setEmail('')
      setUserName('')
      setPassword('')
    }catch(error){
        toast.error('Error while updating')
        console.error('error while updating data', error)

    }finally{
      setLoading(false)
    }

  }

  return (
    <div className='Settings'>
      <div className='settings-name'>
        <h2>Settings</h2>
      </div>
      <div className='settings-container'>
        <div className='settings-input-container'>
          <div className="settings-image-input1">
            <IoMdContact />
          </div>
          <input 
            type="text" 
            className='settings-input' 
            placeholder='Name' 
            value={userName}
            onChange={(e)=> setUserName(e.target.value)}
          />
          <div className="settings-image-input2">

          </div>
        </div>

        <div className='settings-input-container'>
          <div className="settings-image-input1">
            <MdOutlineMailOutline />
          </div>
          <input 
            type="text" 
            className='settings-input' 
            placeholder='Email' 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <div className="settings-image-input2">

          </div>
        </div>


        <div className='settings-input-container'>
          <div className="settings-image-input1">
            <MdLockOutline />
          </div>
          <input 
            type={passwordType} 
            className='settings-input' 
            placeholder='New Password'
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
          />
          <div className="settings-image-input2" onClick={togglePasswordVisibility}>
            {passwordTypeSlash}
          </div>
        </div>

        <button className='settings-update-btn' onClick={handleUpdate}>
            {loading ? 'Updating...' : 'Update'}
        </button>
      </div>

    </div>
  )
}

export default Settings
