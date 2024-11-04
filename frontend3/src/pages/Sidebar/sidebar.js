import React from 'react'
import './sidebar.css'
import { Link, NavLink,useNavigate} from 'react-router-dom';
import { DiMagento } from "react-icons/di";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuDatabase } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { clearToken } from '../../redux/userReducer';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const logout=()=>{
   
    dispatch(clearToken())
    navigate('/')
    setTimeout(() => {
      toast.success("Logout Sucessfully.....")
     },3000);
 
  }
  return (
    <div className="sidenav">
      <ToastContainer />
        <div className="header">
         <DiMagento />
        <h3>Pro manage</h3>
        </div>
  <div className="list-item">
  <ul>
        <li>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              <MdOutlineSpaceDashboard />
              <span>Board</span>
            </NavLink>
            
        </li>
        <li>
        <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'active' : '')}>
              <LuDatabase />
              <span>Analytics</span>
            </NavLink>         
        </li>
        <li>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoSettingsOutline />
              <span>Settings</span>
            </NavLink>
          </li>
           
      
    </ul>

  </div>
 
    
    <div className="logout-button" onClick={logout}>
    <IoMdLogOut />
       <h3>LOGOUT</h3> 
        </div>
  
    
</div>
  )
}

export default Sidebar