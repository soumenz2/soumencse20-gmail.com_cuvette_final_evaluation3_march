import React, { useState, useEffect } from 'react';
import './Analyticspage.css';
import { getTaskCounts } from '../../api/apiClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const box1 = [
  { label: "Backlog Task", key: "backlog" },
  { label: "To-do Task", key: "todo" },
  { label: "In-Progress Task", key: "inProgress" },
  { label: "Completed Task", key: "done" }
];

const box2 = [
  { label: "Low Priority", key: "lowPriority" },
  { label: "Moderate Priority", key: "mediumPriority" },
  { label: "High Priority", key: "highPriority" }
];

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [taskdata, setTaskData] = useState({
    backlog: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await getTaskCounts();
        if (response && response.counts) {
          const { backlog, todo, inProgress, done, highPriority, mediumPriority, lowPriority } = response.counts;
          setTaskData({
            backlog,
            todo,
            inProgress,
            done,
            highPriority,
            mediumPriority,
            lowPriority
          });
          
        }
      } catch (error) {
        toast.error("Failed to load task data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h3>Analytics</h3>
      {loading ? (<div className="loading-overlay">
      <div className="loading-container">
        <p>Loading Profile...</p>
        <div class="loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
      </div>
    </div>
    ) : (
        <div className="full-content">
          <div className="box">
            {box1.map((item) => (
              <div className="taskRow" key={item.key}>
                <span className="dot"></span>
                <span>{item.label}</span>
                <span className="taskCount">{taskdata[item.key]}</span>
              </div>
            ))}
          </div>
          <div className="box">
            {box2.map((item) => (
              <div className="taskRow" key={item.key}>
                <span className="dot"></span>
                <span>{item.label}</span>
                <span className="taskCount">{taskdata[item.key]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
