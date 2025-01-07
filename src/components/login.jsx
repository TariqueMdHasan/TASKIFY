import React, {useState} from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


function Registration() {
    const navigate = useNavigate();
    const[passwordTypeOne, setPasswordTypeOne] = useState('password')
    const[passwordTypeSlashOne, setPasswordTypeSlashOne] = useState(<FaRegEyeSlash />)
    

    const togglePasswordVisibilityfirst = () => {
        if(passwordTypeOne === 'password'){
            setPasswordTypeOne('text');
            setPasswordTypeSlashOne(<FaRegEye />)
        }else{
            setPasswordTypeOne('password');
            setPasswordTypeSlashOne(<FaRegEyeSlash />)
        }
    }

    

    return (
        <div class="Login-main">
            <div className='Login-container'>
                <h2>Login</h2>


                <div className='auth-Login-input-container'>
                    <div className="auth-Login-image-input1">
                        <MdOutlineMailOutline />
                    </div>
                    <input type="text" className='auth-Login-input' placeholder='Email' />
                    <div className="auth-Login-image-input2">

                    </div>
                </div>

                <div className='auth-Login-input-container'>
                    <div className="auth-Login-image-input1">
                        <MdLockOutline />
                    </div>
                    <input type={passwordTypeOne} className='auth-Login-input' placeholder='Password' />
                    <div className="auth-Login-image-input2" onClick={togglePasswordVisibilityfirst} >
                        {passwordTypeSlashOne}
                    </div>
                </div>

                <button className='auth-Login-btn' onClick={()=> navigate('/Dashboard/Board')}>
                    Login
                </button>

                <h4>Already have account? click Register button</h4>
                
                <button className='auth-RegInLogin-btn' onClick={()=> navigate('/Registration')} >
                    Register
                </button>
            </div>
        </div>
    )
}

export default Registration;













