
import "./taskDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTaskByID } from "../../api/apiClient";
const TaskDetailsPage = () => {
  const { taskID } = useParams();
  const [showMore, setShowMore] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const data = await getTaskByID(taskID); 
        setTaskDetails(data.task); 
        console.log(data)
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchTaskDetails();
  }, [taskID]); 

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
            <span className="priority-text">{taskDetails?.priority}</span>
          </div>
        </div>
        <h4 className="task-title">{taskDetails?.taskName}</h4>
        <div className="task-checklist">
          <p>Checklist (1/3)</p>

          {taskDetails?.Checklist?.map((task,index) => {
            return (
                <div className="checklist-item">
                <input type="checkbox" readonly="" checked="" key={index}/>
                <label>{task.title}</label>
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
