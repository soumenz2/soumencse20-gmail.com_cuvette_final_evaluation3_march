import React, { useState, useEffect } from 'react';
import './TaskModal.css';
import { updateTask ,getEmail} from '../../api/apiClient'; // Adjust the import according to your API client
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineDeleteForever } from "react-icons/md";

const UpdateTaskModal = ({ taskData, onClose }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [emails, setEmails] = useState([]);
  const [assignee, setAssignee] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch emails for assignee selection
  useEffect(() => {
    const fetchEmails = async () => {
      const response = await getEmail();
      if (response.message === 'Data Fetched Successfully') {
        setEmails(response.email);
      } else {
        console.error(response.message);
      }
    };
    fetchEmails();
  }, []);

  // Populate the modal with task data when it opens
  useEffect(() => {
    console.log("taskData",taskData)
    if (taskData) {
      setTitle(taskData.taskName);
      setPriority(taskData.priority);
      setChecklist(taskData.checkList);
      setDueDate(taskData.dueDate);
      setAssignee(taskData.assignee || '');
    }
  }, [taskData]);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const handleSearchChange = (e) => setSearchTerm(e.target.value);
  
  const handleAddTask = () => {
    setChecklist([...checklist, { title: '', isDone: false }]);
  };

  const handleTaskChange = (index, value) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].title = value;
    setChecklist(updatedChecklist);
  };

  const handleCheckboxChange = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].isDone = !updatedChecklist[index].isDone;
    setChecklist(updatedChecklist);
  };

  const handleDeleteTask = (index) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);
  };

  const handleDueDateChange = (e) => setDueDate(e.target.value);
  
  const handleAssigneeSelect = (email) => {
    setAssignee(email);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allFilled = checklist.every(task => task.title.trim() !== '');
    if (!allFilled) {
      toast.error('Please fill in all checklist items before submitting.');
      return;
    }

    const taskUpdateData = {
    taskID: taskData.taskID, 
      priority,
      title,
      checklist,

    };

    try {
        const result = await updateTask(taskUpdateData);
        if (result.message) {
          // Handle success or error message
          console.log(result.message);
        } else {
          // Handle the updated task data
          console.log('Task updated successfully:', result.task);
        }
    } catch (error) {
      console.error('Error while updating task:', error);
    }
  };

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

  return (
    <div className="modal-overlay">
      <ToastContainer />
      <div className="modal-content">
        <label>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Task Title"
          required
        />

        <div className="priority-options">
          <label>Select Priority *</label>
          <button
            type="button"
            className={`priority-btn ${priority === 'high' ? 'active' : ''}`}
            onClick={() => setPriority('high')}
          >
            HIGH PRIORITY
          </button>
          <button
            type="button"
            className={`priority-btn ${priority === 'moderate' ? 'active' : ''}`}
            onClick={() => setPriority('moderate')}
          >
            MODERATE PRIORITY
          </button>
          <button
            type="button"
            className={`priority-btn ${priority === 'low' ? 'active' : ''}`}
            onClick={() => setPriority('low')}
          >
            LOW PRIORITY
          </button>
        </div>



        <label>Checklist ({checklist.length}) *</label>
        {checklist.map((task, index) => (
          <div key={index} className="checklist-item">
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => handleCheckboxChange(index)}
            />
            <input
              type="text"
              value={task.title}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              placeholder="Add a task"
            />
            <button
              type="button"
              className="delete-task"
              onClick={() => handleDeleteTask(index)}
            >
              <MdOutlineDeleteForever />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-task-btn"
          onClick={handleAddTask}
        >
          + Add New
        </button>

        <div className="modal-footer">
          <div>
            <label>Select Due Date *</label>
            <div>{formatDate(dueDate)}</div>
          </div>
          <div>
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              className="save-btn"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
