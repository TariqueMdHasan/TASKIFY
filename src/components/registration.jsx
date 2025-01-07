import React, {useState} from 'react';
import './registration.css';
import { useNavigate } from 'react-router-dom';
import { IoMdContact } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


function Registration() {
    const navigate = useNavigate();
    const[passwordType, setPasswordType] = useState('password')
    const[passwordTypeOne, setPasswordTypeOne] = useState('password')
    const[passwordTypeSlashOne, setPasswordTypeSlashOne] = useState(<FaRegEyeSlash />)
    const[passwordTypeSlash, setPasswordTypeSlash] = useState(<FaRegEyeSlash />)
    

    const togglePasswordVisibilityfirst = () => {
        if(passwordTypeOne === 'password'){
            setPasswordTypeOne('text');
            setPasswordTypeSlashOne(<FaRegEye />)
        }else{
            setPasswordTypeOne('password');
            setPasswordTypeSlashOne(<FaRegEyeSlash />)
        }
    }

    const togglePasswordVisibility = () => {
        if(passwordType === 'password'){
            setPasswordType('text');
            setPasswordTypeSlash(<FaRegEye />)
        }else{
            setPasswordType('password');
            setPasswordTypeSlash(<FaRegEyeSlash />)
        }
    }
    

    return (
        <div class="Registration-main">
            <div className='Registration-container'>
                <h2>Register</h2>

                <div className='auth-input-container'>
                    <div className="auth-image-input1">
                        <IoMdContact />
                    </div>
                    <input type="text" className='auth-input' placeholder='Name' />
                    <div className="auth-image-input2">

                    </div>
                </div>

                <div className='auth-input-container'>
                    <div className="auth-image-input1">
                        <MdOutlineMailOutline />
                    </div>
                    <input type="text" className='auth-input' placeholder='Email' />
                    <div className="auth-image-input2">

                    </div>
                </div>

                <div className='auth-input-container'>
                    <div className="auth-image-input1">
                        <MdLockOutline />
                    </div>
                    <input type={passwordTypeOne} className='auth-input' placeholder='Password' />
                    <div className="auth-image-input2" onClick={togglePasswordVisibilityfirst} >
                        {passwordTypeSlashOne}
                    </div>
                </div>

                <div className='auth-input-container'>
                    <div 
                        className="auth-image-input1"
                    >
                        <MdLockOutline />
                    </div>
                    <input type={passwordType} className='auth-input' placeholder='Confirm Password' />
                    <div className="auth-image-input2" onClick={togglePasswordVisibility} >
                        {passwordTypeSlash}
                    </div>
                </div>

                <button className='auth-reg-btn'>
                    Register
                </button>

                <h4>Don't have account? click login button</h4>
                
                <button className='auth-loginInReg-btn' onClick={()=> navigate('/Login')} >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Registration;











