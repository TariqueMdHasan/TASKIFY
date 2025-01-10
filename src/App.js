import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import RegistrationPage from './pages/RegPage';
import LoginPage from './pages/LogPage';
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard';

import Board from './components/Board';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

// import BoardMain from './components/BoardMain';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Registration' element={<RegistrationPage />} />
        <Route path='/Dashboard/*' element={<Dashboard/>} >
          <Route path="Board" element={<Board />} />
          <Route path="Analytics" element={<Analytics />} />
          <Route path="Settings" element={<Settings />} />
          {/* <Route path='Board' element={<BoardMain />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
