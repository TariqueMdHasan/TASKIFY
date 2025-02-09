import React from 'react';
import './Dashboard.css';
import Sidebar from '../components/sidebar';
import { Outlet } from 'react-router-dom'; 

function Dashboard() {
  return (
    <div className='dashboard'>
      <Sidebar />
      <Outlet /> 
    </div>
  );
}

export default Dashboard;
