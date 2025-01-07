import React, {useState} from 'react'
import './sidebar.css'
import { useNavigate } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsDatabase } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

function Sidebar() {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('Board');

    const handleClick = (componentName) => {
        setActiveNav(componentName);
    };

  return (
    <div className='sidebar'>
        <div className="sidebar-div1">
            <h3>Hi! Tarique</h3>
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
                <h3 onClick={()=> navigate('/')}>Logout</h3>
            </div>
        </div>
    </div>
  )
}

export default Sidebar