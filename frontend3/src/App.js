import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import LoginSignUp from './pages/loginSignUpPages/LoginSignUp';
import Sidebar from './pages/Sidebar/sidebar';
import BoardPage from './pages/Borad/BoardPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import Settingspage from './pages/Settings/Settingspage';
import { useSelector } from 'react-redux';
import UserRouter from './UserRouter';

function App() {
  
  const userToken=useSelector((state)=>state.user.tokenId)
  if(window.location.pathname.startsWith('/task')){
    return (<UserRouter />)
  }
  
 
  return (
    <Router>
      { userToken != null ? (
         <div className='container'>
               <Sidebar />
             <div className='main-content'>
                
              
               <Routes>
                 <Route path="/" element={<BoardPage  />} />
                 <Route path="/analytics" element={<AnalyticsPage  />} />
                 <Route path="/settings" element={<Settingspage  />} />
              </Routes>
          
          
                </div>
             
          </div> 

      ):(
        <Routes>
            <Route path="/" element={<LoginSignUp  />} />
        </Routes>
      )

      }
    </Router>

   
  );
}

export default App;
