import React, {useState} from 'react';
import './registration.css';
import { useNavigate } from 'react-router-dom';
import { IoMdContact } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';


function Registration() {
    const navigate = useNavigate();
    const[loading, setLoading] = useState(false)
    const[passwordType, setPasswordType] = useState('password')
    const[passwordTypeOne, setPasswordTypeOne] = useState('password')
    const[passwordTypeSlashOne, setPasswordTypeSlashOne] = useState(<FaRegEyeSlash />)
    const[passwordTypeSlash, setPasswordTypeSlash] = useState(<FaRegEyeSlash />)
    

    // form states to catch inputs
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    // handling password visibility
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



    // handle form submission
    const handleRegister = async(e) => {
        e.preventDefault();

        if(!userName && !email && !password && !confirmPassword){
            toast.error('Please enter all the fields')
            return
        }else if(!userName ){
            toast.error('Please enter Name')
            return
        }else if(!email ){
            toast.error('Please enter Email')
            return
        }else if(!password ){
            toast.error('Please enter Password')
            return
        }else if(!confirmPassword ){
            toast.error('Please enter Confirm Password')
            return
        }else if(password !== confirmPassword){
            toast.error('Passwords do not match')
            return
        }

        const userData = {
            userName: userName,
            email: email,
            password: password
        }

        try{
            setLoading(true)
            // sending inputs to the backend throw post method
            const response = await axios.post('https://taskmanager-yxx2.onrender.com/api/auth/register', userData)
            
            if(response.status === 201){
                toast.success('Registration successful');
                navigate('/Login')
            }else{
                toast.error('Registration Failed')
            }


        }catch(error){
            console.error('Error registering user', error)
            toast.error('An error occured during registration')
        }finally{
            setLoading(false)
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
                    <input 
                        type="text" 
                        className='auth-input' 
                        placeholder='Name'
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                        required
                    />
                    <div className="auth-image-input2">

                    </div>
                </div>

                <div className='auth-input-container'>
                    <div className="auth-image-input1">
                        <MdOutlineMailOutline />
                    </div>
                    <input 
                        type="Email" 
                        className='auth-input' 
                        placeholder='Email' 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                    />
                    <div className="auth-image-input2">

                    </div>
                </div>

                <div className='auth-input-container'>
                    <div className="auth-image-input1">
                        <MdLockOutline />
                    </div>
                    <input 
                        type={passwordTypeOne} 
                        className='auth-input' 
                        placeholder='Password' 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                    />
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
                    <input 
                        type={passwordType} 
                        className='auth-input' 
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        required
                    />
                    <div className="auth-image-input2" onClick={togglePasswordVisibility} >
                        {passwordTypeSlash}
                    </div>
                </div>

                <button 
                    className='auth-reg-btn' 
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading? 'Please wait...': 'Register'}
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











