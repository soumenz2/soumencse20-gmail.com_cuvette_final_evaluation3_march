import React,{useState,useEffect} from 'react'
import './BoardPage.css'
import { BsPeople } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import { TfiLayers } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa6";
import TaskBox from './TaskBox';
import TaskModal from '../ModalPage/TaskModal';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaLessThanEqual } from 'react-icons/fa';
import AddPeopleModal from '../ModalPage/AddPeople';
import { getTasks } from '../../api/apiClient';
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
  
}
// const tasks = [
//   {
//     id: 1,
//     priority: "HIGH PRIORITY",
//     title: "Hero section",
//     checklist: [
//       { id: 1, text: "Task to be done", done: true },
//       { id: 2, text: "Task to be done", done: false },
//       { id: 3, text: "Task to be done ede lorem Ipsum is a Dummy text t", done: false },
//     ],
//     date: "Feb 10th",
//     status: ["Progress", "To-Do", "Done"],
//   },
//   {
//     id: 2,
//     priority: "MODERATE PRIORITY",
//     title: "Typography change",
//     checklist: [
//       { id: 1, text: "Task to be done", done: false },
//       { id: 2, text: "Task to be done", done: false },
//     ],
//     date: "Feb 12th",
//     status: ["To-Do"],
//   },
// ];


const BoardPage = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [isTaskModalOpen,setIsTaskModalOpen]=useState(false)
  const [isAddPeopleModalOpen,setIsAddPeopleModalOpen]=useState(false)
  const [tasks, setTasks] = useState({ todo: [], backLog: [], inProgress: [], done: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterValue, setFilterValue] = useState("WEEK"); 


  const fetchTasks = async (filter) => {
    setLoading(true);
    try {
      const response = await getTasks(filter); // Pass the filter to your API call
      if (response?.message === "Data Fetched Successfully") {
        const fetchedTasks = response.task; 
        console.log(fetchedTasks)
        const categorizedTasks = {
          todo: fetchedTasks.todo || [],
          backlog: fetchedTasks.backLog || [],
          inProgress: fetchedTasks.inProgress || [],
          completed: fetchedTasks.done || []
        };
        setTasks(categorizedTasks);
        console.log(categorizedTasks)
      } else {
        setError(response);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filterValue);
  }, [filterValue]); 


  const isOpen=()=>{
    setIsTaskModalOpen(true)
  }
  const onClose=()=>{
    setIsTaskModalOpen(false)
  }
  const isAddPeopleOpen=()=>{
    setIsAddPeopleModalOpen(true)
  }
  const onAddPeopleClose=()=>{
    setIsAddPeopleModalOpen(false)
  }
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading-overlay">
    <div className="loading-container">
      <p>Loading tasks...</p>
      <div className="spinner"></div>
    </div>
  </div>
    );
  }

  if (error) {
    return <p>Error loading tasks: {error.message || 'Something went wrong'}</p>;
  }
  

  return (
    <div>
      <div className="section1">
        <div className="">
          <h3>Welcome! Soumen</h3>
        </div>
        <div className="">
        <p>{currentDate}</p>
        </div>
      </div>
      <div className="section2">
      <div className="sub-section">
        <div className=""><h2 className="">Board</h2></div>
        <div className="">
        <button className="button1" onClick={isAddPeopleOpen}>
        <BsPeople />
          <p className="btn-text">Add People</p>
        </button>
        </div>
       
      </div>
      <div className="sub-section1">
        
       
        <label className="dropdown">

  <div className="dd-button">
  This Week
  </div>

  <input type="checkbox" className="dd-input" id="test" />

  <ul className="dd-menu">
    <li onClick={() => handleFilterChange({ target: { value: "TODAY" } })}>Today</li>
    <li onClick={() => handleFilterChange({ target: { value: "WEEK" } })}>This Week</li>
    <li onClick={() => handleFilterChange({ target: { value: "MONTH" } })}>This Month</li>
    
   
  </ul>
  
</label>
      </div>
      </div>
     
      <div className="section3">
        <div className="section-box">
          <div className="hedaer-box">
            <div className=""><h4 className="">Backlog</h4></div>
            <button type="" className="button-header"><TfiLayers /></button>
          </div>
          {tasks?.backlog?.map((task, index) => (
            <TaskBox key={task.id} task={task} />
          ))}
          

        </div>
        <div className="section-box">
        <div className="hedaer-box">
            <div className=""><h4 className="">To Do</h4></div>
            <div className="">
              <button type="" className="button-header" onClick={isOpen}><FaPlus /></button>
            <button type="" className="button-header"><TfiLayers /></button>
          
          </div>
          </div>
          {tasks.todo.map((task) => (
            <TaskBox key={task.id} task={task} />
          ))}
        </div>
        <div className="section-box">
        <div className="hedaer-box">
            <div className=""><h4 className="">In Progrss</h4></div>
            <button type="" className="button-header"><TfiLayers /></button>
          </div>
        </div>
        <div className="section-box">
        <div className="hedaer-box">
            <div className=""><h4 className="">Completed</h4></div>
            <div className="">
            <button type="" className="button-header"><TfiLayers /></button>
          </div>
          </div>
          {tasks.completed.map((task) => (
            <TaskBox key={task.id} task={task} />
          ))}
        </div>
      </div>
      {
        isTaskModalOpen && <TaskModal onClose={onClose} />
      }
      {
        isAddPeopleModalOpen && <AddPeopleModal onAddPeopleClose={onAddPeopleClose} />
      }
    </div>
  )
}

export default BoardPage