import React, {useState} from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify';


function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const[passwordTypeOne, setPasswordTypeOne] = useState('password')
    const[passwordTypeSlashOne, setPasswordTypeSlashOne] = useState(<FaRegEyeSlash />)

    
    // states for taking input data
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // visibility of password
    const togglePasswordVisibilityfirst = () => {
        if(passwordTypeOne === 'password'){
            setPasswordTypeOne('text');
            setPasswordTypeSlashOne(<FaRegEye />)
        }else{
            setPasswordTypeOne('password');
            setPasswordTypeSlashOne(<FaRegEyeSlash />)
        }
    }

    // handling login
    const handleLogin = async(e) => {
        e.preventDefault();

        if(!email && !password){
            toast.error('Please enter all the fields')
            return
        }else if(!email){
            toast.error('Please enter Email')
            return
        }else if(!password){
            toast.error('Please enter Password')
            return
        }

        const userData = {
            email: email,
            password: password 
        }

        try{
            setLoading(true)
            const response = await axios.post('https://taskmanager-yxx2.onrender.com/api/auth/login', userData)

            if(response.status === 200){
                toast.success('login successful');

                localStorage.setItem('authToken', response.data.token)
                navigate('/Dashboard/Board')
            }else{
                toast.error('Login Failed')
            }


        }catch(error){
            console.error('Error Login', error)
            toast.error('Login failed, please check you credentials again')
        }finally{
            setLoading(false)
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
                    <input 
                        type="text" 
                        className='auth-Login-input' 
                        placeholder='Email' 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                    />
                    <div className="auth-Login-image-input2">

                    </div>
                </div>

                <div className='auth-Login-input-container'>
                    <div className="auth-Login-image-input1">
                        <MdLockOutline />
                    </div>
                    <input 
                        type={passwordTypeOne} 
                        className='auth-Login-input' 
                        placeholder='Password' 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                    />
                    <div className="auth-Login-image-input2" onClick={togglePasswordVisibilityfirst} >
                        {passwordTypeSlashOne}
                    </div>
                </div>

                <button 
                    className='auth-Login-btn' 
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading? 'Please wait...': 'Login'}
                </button>

                <h4>Already have account? click Register button</h4>
                
                <button className='auth-RegInLogin-btn' onClick={()=> navigate('/Registration')} >
                    Register
                </button>
            </div>
        </div>
    )
}

export default Login;













