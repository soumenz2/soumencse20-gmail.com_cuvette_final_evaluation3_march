import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import TaskDetailsPage from './pages/TaskDetailsPage/taskDetailsPage';



function UserRouter() {
 


  return (
    <Router>
     
        <Routes>
          <Route path="/task/:taskID" element={<TaskDetailsPage  />} />
        </Routes>
    
    </Router>
  );
}

export default UserRouter;