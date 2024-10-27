import React from "react";
import "./taskDetails.css";
import { useState } from "react";
const TaskDetailsPage = () => {
  const [showMore, setShowMore] = useState(false);

  const tasks = [
    "Done Task",
    "Task to be done",
    "Task to be done",
    "Task to be done",
    "Task to be done",
    "Task to be done",
    "Task to be done",
    "Task to be done",
    "Task to be done",
    "Task to be done",
    "Task to be done",
    "Task to be done dkjbfcjkdbcf dfndfjk dfjbdjf dfj",
  ];

  return (
 
    <div className="hero-section">
      <div className="task-box-container">
        <div className="priority-header">
          <div className="">
            <span className="priority-label high-priority"></span>
            <span className="priority-text">HIGH PRIORITY</span>
          </div>
        </div>
        <h4 className="task-title">Hero section</h4>
        <div className="task-checklist">
          <p>Checklist (1/3)</p>

          {tasks.map((task,index) => {
            return (
                <div className="checklist-item">
                <input type="checkbox" readonly="" checked="" key={index}/>
                <label>{task}</label>
              </div>
            );
           
          })}

          
        </div>
        <div className="task-footer">
          <div className="task-status-container">
            <span className="task-status">Due Date</span>
            <span className="task-date">Feb 10th</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
