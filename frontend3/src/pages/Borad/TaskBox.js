import React, { useState } from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { TfiLayers } from "react-icons/tfi";
import { HiDotsHorizontal } from "react-icons/hi";
import './TaskBox.css'; 
import DeleteModal from '../ModalPage/DeleteModal';
import UpdateTaskModal from '../ModalPage/UpdateTaskModal';

const TaskBox = ({ task }) => {
  const [checklistVisible, setChecklistVisible] = useState(false);
  const [isDeleteModalOpen,setDeleteModalOpen]=useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const OpenDeleteModal=()=>{
    setDeleteModalOpen(true)
  }
  const onCloseDeleteModal=()=>{
    setDeleteModalOpen(false)
  }
  const openUpdateModal = () => {
    setUpdateModalOpen(true); // Open the UpdateTaskModal
  };

  const onCloseUpdateModal = () => {
    setUpdateModalOpen(false); // Close the UpdateTaskModal
  };


  // Toggle checklist visibility
  const toggleChecklist = () => {
    setChecklistVisible(!checklistVisible);
  };
  const completedTasksCount = task.checkList.filter(item => item.isDone).length;
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return "th"; // catch all teens (11th-13th)
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${day}${getOrdinalSuffix(day)} ${month}`;
}
const isDueDatePassed = new Date(task.dueDate) < new Date();
  return (
    <div className="task-box-container1">
        <div className="priority-header1">
            <div className="">
            <span
                  className={`priority-label1 ${task.priority === 'HIGH PRIORITY' 
                    ? 'high-priority1' 
                    : task.priority === 'MODERATE PRIORITY' 
                    ? 'medium-priority1' 
                    : 'low-priority1'}`}
                  
                ></span>
          <span className='priority-text1'>{task.priority}</span>
            </div>
            <div className="">
                
                <label className="dropdown">

<div className="dd-button">
<HiDotsHorizontal />
</div>

<input type="checkbox" className="dd-input" id="test" />

<ul className="dd-menu">
  <li onClick={openUpdateModal}>Edit</li>
  <li>Share</li>
  <li className='delete-option1' onClick={OpenDeleteModal}> Delete</li>
  
 
</ul>

</label>
                 
            </div>
        </div>
 
          <h4 className="task-title1">{task.taskName}</h4>
       
      <div className="task-box-header1">
       
        <p className="checklist-info1">Checklist ({completedTasksCount}/{task.checkList.length})</p>
        <div className="task-box-icons1">
          <button className="toggle-btn" onClick={toggleChecklist}>
            {checklistVisible ? <SlArrowUp /> : <SlArrowDown />}
          </button>
        </div>
      </div>

      {checklistVisible && (
        <div className="task-checklist1">
          {task.checkList.map((item) => (
            <div className="checklist-item1" key={item.id}>
              <input type="checkbox" checked={item.isDone} readOnly />
              <label>{item.title}</label>
            </div>
          ))}
        </div>
      )}

      <div className="task-footer1">
      <span className={`task-date1 ${isDueDatePassed ? 'overdue-date' : ''}`}>
  {formatDate(task.dueDate)}
</span>
        <div className="task-status-container1">
          {task.statusOptions.map((status, index) => (
            <span className="task-status1" key={index}>{status}</span>
          ))}
        </div>
      </div>
      {
        isDeleteModalOpen && <DeleteModal onCloseDeleteModal={onCloseDeleteModal} />
      }
       {isUpdateModalOpen && <UpdateTaskModal onClose={onCloseUpdateModal} taskData={task} />}
    </div>
  );
};

export default TaskBox;
