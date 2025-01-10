import React, {useState, useEffect} from 'react'
import './sidebar.css'
import { useNavigate } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsDatabase } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

function Sidebar() {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Board');
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')

    const handleClick = (componentName) => {
        setActiveNav(componentName);
    };

    const handleLogout = () =>{
        try{
            setLoading(true)
            localStorage.removeItem('authToken')
            navigate('/')
            console.log('logged out succesfully')
            toast.success('logged out sucessfully')
        }catch(error){
            console.error('error in log out', error)
            toast.error('logout failed')
        }finally{
            setLoading(false)
        }
        // if (window.confirm('Are you sure you want to log out?')) {
        //     localStorage.removeItem('authToken');
        //     navigate('/');
        //     alert('Logged out successfully');
        // }
    }

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('https://taskmanager-yxx2.onrender.com/api/auth/me', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUserName(response.data.user.userName)
          } catch (error) {
            console.error('Error fetching tasks:', error);
            
          }
        };
        fetchTasks();
    }, []);
    

    // useEffect(() => {
    //     const fetchTasks = async () => {
    //         const token = localStorage.getItem('authToken');
    //         if (!token) {
    //             console.error('No auth token found');
    //             navigate('/');
    //             return;
    //         }
    
    //         try {
    //             const response = await axios.get('https://taskmanager-yxx2.onrender.com/api/auth', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });
    
    //             // Log the full response for debugging purposes
    //             console.log('Full API Response:', response.data);
    
    //             // Ensure user exists in the response and extract userName
    //             if (response.data && response.data.user) {
    //                 console.log('User Object:', response.data.user);
    //                 if (response.data.user.userName) {
    //                     setUserName(response.data.user.userName);
    //                 } else {
    //                     console.error('userName not found in response');
    //                     setUserName('User');
    //                 }
    //             } else {
    //                 console.error('User object is missing in response');
    //                 setUserName('User');
    //             }
    
    //         } catch (error) {
    //             console.error('Error fetching tasks:', error.response?.data || error.message);
    //             if (error.response?.status === 401) {
    //                 console.error('Unauthorized. Redirecting to login.');
    //                 navigate('/');
    //             }
    //         }
    //     };
    
    //     fetchTasks();
    // }, [navigate]);
    

  return (
    <div className='sidebar'>
        <div className="sidebar-div1">
            <h3>Hi! {userName || 'User'}</h3>
        </div>
        <div className="sidebar-div2">
            <div className='sibar-upper-div'>
                <div 
                    className={`sidebar-board sideup ${activeNav === 'Board' ? 'changed' : ''}`}
                    onClick={() =>  {
                        handleClick('Board')
                        navigate('/Dashboard/Board')
                    }}
                >
                    <MdOutlineSpaceDashboard />
                    <h3>Board</h3>
                </div>
                <div 
                    className={`sidebar-analytics sideup ${activeNav === 'Analytics' ? 'changed' : ''}`}
                    onClick={() =>  {
                        handleClick('Analytics')
                        navigate('/Dashboard/Analytics')
                    }}
                >
                    <BsDatabase />
                    <h3>Analytics</h3>
                </div>
                <div 
                    className={`sidebar-settings sideup ${activeNav === 'Settings' ? 'changed' : ''}`}
                    onClick={() =>  {
                        handleClick('Settings')
                        navigate('/Dashboard/Settings')
                    }}
                >
                    <IoSettingsOutline />
                    <h3>Settings</h3>
                </div>
            </div>
            <div className='sidebar-lower-div'>
                <IoLogOutOutline />
                <h3 onClick={handleLogout} disabled={loading}>
                    {loading? 'logging out...': 'logout'}
                </h3>
            </div>
        </div>
    </div>
  )
}

export default Sidebar