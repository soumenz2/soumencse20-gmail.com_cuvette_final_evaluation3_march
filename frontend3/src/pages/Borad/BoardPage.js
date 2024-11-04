import React, { useState, useEffect } from 'react'
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
import { ToastContainer, toast } from "react-toastify";
import { getuser } from '../../api/apiClient';
function getDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString( 'default', { month: 'short' } );
  const year = today.getFullYear();

  const getDaySuffix = ( day ) => {
    if ( day > 3 && day < 21 ) return 'th';
    switch ( day % 10 ) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${ day }${ getDaySuffix( day ) } ${ month }, ${ year }`;
}



const BoardPage = () => {
  const [currentDate, setCurrentDate] = useState( getDate() );
  const [isTaskModalOpen, setIsTaskModalOpen] = useState( false )
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState( false )
  const [tasks, setTasks] = useState( { todo: [], backlog: [], inProgress: [], done: [] } );
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState( null );
  const [filterValue, setFilterValue] = useState( "WEEK" );
  const [username,setUserName]=useState('')
  const [inProgressCollapseTrigger1, setInProgressCollapseTrigger1] = useState(false);
  const [inProgressCollapseTrigger2, setInProgressCollapseTrigger2] = useState(false);
  const [inProgressCollapseTrigger3, setInProgressCollapseTrigger3]= useState(false);
  const [inProgressCollapseTrigger4, setInProgressCollapseTrigger4] = useState(false);
  const [completedCollapseTrigger, setCompletedCollapseTrigger] = useState(false);


  const toggleInProgressCollapse1 = () => {
    setInProgressCollapseTrigger1((prev) => !prev);
  };
  const toggleInProgressCollapse2 = () => {
    setInProgressCollapseTrigger2((prev) => !prev);
  };
  const toggleInProgressCollapse3 = () => {
    setInProgressCollapseTrigger3((prev) => !prev);
  };
  const toggleInProgressCollapse4 = () => {
    setInProgressCollapseTrigger4((prev) => !prev);
  };

  // Toggles collapse state for the Completed section
  const toggleCompletedCollapse = () => {
    setCompletedCollapseTrigger((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getuser();
      setUserName(data.name);
    };

    fetchUserData();
  }, []);
  const fetchTasks = async ( filter ) => {
    setLoading( true );
    try {
      const response = await getTasks( filter ); // Pass the filter to your API call
      if ( response?.message === "Data Fetched Successfully" ) {
        const fetchedTasks = response.task;
        console.log( fetchedTasks )
        const categorizedTasks = {
          todo: fetchedTasks.todo || [],
          backlog: fetchedTasks.backLog || [],
          inProgress: fetchedTasks.inProgress || [],
          completed: fetchedTasks.done || []
        };
        setTasks( categorizedTasks );
        console.log( categorizedTasks )
      } else {
        setError( response );
      }
    } catch ( err ) {
      setError( err );
    } finally {
      setLoading( false );
    }
  };


  useEffect( () => {
    fetchTasks( filterValue );
  }, [filterValue] );


  const isOpen = () => {
    setIsTaskModalOpen( true )
  }
  const onClose = () => {
    setIsTaskModalOpen( false )
  }
  const isAddPeopleOpen = () => {
    setIsAddPeopleModalOpen( true )
  }
  const onAddPeopleClose = () => {
    setIsAddPeopleModalOpen( false )
  }
  const handleFilterChange = ( e ) => {
    setFilterValue( e.target.value );
  };

  if ( loading ) {
    return (<div className="loading-overlay">
      <div className="loading-container">
        <p>Loading tasks...</p>
        <div className="loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
      </div>
    </div>
    );
  }

  if ( error ) {
    return <p>Error loading tasks: {error.message || 'Something went wrong'}</p>;
  }


  return (
    <div>
      <ToastContainer />
      <div className="section1">
        <div className="">
          <h3>Welcome! {username}</h3>
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
              
              {filterValue==="WEEK"?"This week":filterValue}
            </div>

            <input type="checkbox" className="dd-input" id="test" />

            <ul className="dd-menu">
              <li onClick={() => handleFilterChange( { target: { value: "TODAY" } } )}>Today</li>
              <li onClick={() => handleFilterChange( { target: { value: "WEEK" } } )}>This Week</li>
              <li onClick={() => handleFilterChange( { target: { value: "MONTH" } } )}>This Month</li>


            </ul>

          </label>
        </div>
      </div>

      <div className="section3">
        <div className="section-box">
          <div className="hedaer-box">
            <div className=""><h4 className="">Backlog</h4></div>
            <button type="" className="button-header" onClick={toggleInProgressCollapse1}><TfiLayers /></button>
          </div>
          {tasks?.backlog?.map( ( task, index ) => (
            <TaskBox key={task.id} task={task} filterValue={filterValue} fetchTasks={fetchTasks} collapseTrigger={inProgressCollapseTrigger1} />
          ) )}


        </div>
        <div className="section-box">
          <div className="hedaer-box">
            <div className=""><h4 className="">To Do</h4></div>
            <div className="">
              <button type="" className="button-header" onClick={isOpen}><FaPlus /></button>
              <button type="" className="button-header" onClick={toggleInProgressCollapse2}><TfiLayers /></button>

            </div>
          </div>
          {tasks.todo.map( ( task ) => (
            <TaskBox key={task.id} task={task} filterValue={filterValue} fetchTasks={fetchTasks} collapseTrigger={inProgressCollapseTrigger2} />
          ) )}
        </div>
        <div className="section-box">
          <div className="hedaer-box">
            <div className=""><h4 className="">In Progrss</h4></div>
            <button type="" className="button-header" onClick={toggleInProgressCollapse3}><TfiLayers /></button>
          </div>
          {tasks.inProgress.map( ( task ) => (
            <TaskBox key={task.id} task={task} filterValue={filterValue} fetchTasks={fetchTasks} collapseTrigger={inProgressCollapseTrigger3} />
          ) )}
        </div>
        <div className="section-box">
          <div className="hedaer-box">
            <div className=""><h4 className="">Completed</h4></div>
            <div className="">
              <button type="" className="button-header" onClick={toggleInProgressCollapse4}><TfiLayers /></button>
            </div>
          </div>
          {tasks.completed.map( ( task ) => (
            <TaskBox key={task.id} task={task} filterValue={filterValue} fetchTasks={fetchTasks} collapseTrigger={inProgressCollapseTrigger4} />
          ) )}
        </div>
      </div>
      {
        isTaskModalOpen && <TaskModal onClose={onClose} filterValue={filterValue} fetchTasks={fetchTasks} />
      }
      {
        isAddPeopleModalOpen && <AddPeopleModal onAddPeopleClose={onAddPeopleClose} />
      }
    </div>
  )
}

export default BoardPage