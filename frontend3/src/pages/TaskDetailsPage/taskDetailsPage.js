
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
  const completedTasksCount = taskDetails?.Checklist?.filter(
    (item) => item.isDone
  ).length;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const getOrdinalSuffix = (day) =>
      day > 3 && day < 21
        ? "th"
        : ["th", "st", "nd", "rd"][Math.min(day % 10, 3)];
    return `${day}${getOrdinalSuffix(day)} ${month}`;
  };


  const isDueDatePassed = taskDetails?.dueDate
  ? new Date(taskDetails?.dueDate) < new Date()
  : false;
  return (
 
    // <div className="hero-section">
    //   <div className="task-box-container2">
    //     <div className="priority-header2">
    //       <div className="">
    //         <span className="priority-label high-priority"></span>
    //         <span className="priority-text">{taskDetails?.priority}</span>
    //       </div>
    //     </div>
    //     <h4 className="task-title2">{taskDetails?.taskName}</h4>
    //     <div className="task-checklist2">
    //       <p>Checklist (1/3)</p>

    //       {taskDetails?.Checklist?.map((task,index) => {
    //         return (
    //             <div className="checklist-item2">
    //             <input type="checkbox" readonly="" checked="" key={index}/>
    //             <label>{task.title}</label>
    //           </div>
    //         );
           
    //       })}

          
    //     </div>
    //     <div className="task-footer">
    //       <div className="task-status-container">
    //         <span className="task-status">Due Date</span>
    //         <span className="task-date">Feb 10th</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div class="header3">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          version="1.1"
          viewBox="0 0 32 32"
          height="2em"
          width="2em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M26.941 10.161l-10.934-6.753-10.966 6.764v12.228l2.924 1.743v-12.287l8.041-4.992 8.027 4.992v12.317l2.924-1.772v-12.228zM17.595 15.458v10.073l-1.588 1.004-1.602-1.004v-14.325l-3.574 2.215v12.524l5.176 3.22 5.162-3.22v-12.524l-3.574-2.215z"></path>
        </svg>
        <h2>Pro manage</h2>
      </div>

      <div className="hero-section3">
        <div class="task-box-container3">
          <div class="priority-header3">
            <div class="">
            <span
            className={`priority-label1 ${taskDetails?.priority
              .replace(" ", "-")
              .toLowerCase()}`}
          />
              <span class="priority-text3">{taskDetails?.priority}</span>
            </div>
          </div>
          <h4 className="task-title3">{taskDetails?.taskName}</h4>
          <div className="task-checklist3">
            <p>Checklist ({completedTasksCount}/{taskDetails?.Checklist?.length})</p>

            {taskDetails?.Checklist?.map((task, index) => {
              return (
                <div className="checklist-item3">
                  <input type="checkbox" readonly="" checked={task?.isDone} key={index} />
                  <label>{task.title}</label>
                </div>
              );
            })}
          </div>
          <div class="task-footer3">
            <div class="task-status1-container3">
              <span class="task-status3">Due Date</span>
              <span className={`task-date2 ${isDueDatePassed ? "past-due" : ""}`}>{taskDetails?.dueDate && formatDate(taskDetails?.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  
  );
};

export default TaskDetailsPage;
