import React, { useState,useEffect } from 'react';
import './TaskModal.css';
import { createTask } from '../../api/apiClient';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineDeleteForever } from "react-icons/md";
import { getEmail } from '../../api/apiClient';

const TaskModal = ({  onClose }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [status,setStatus]=useState('');
  const [tasks, setTasks] = useState([{ name: '', checked: false }]);
  const [totalChecklist,sertTotalCheckList]=useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [emails,setEmails] = useState([]);
  const [assignee, setAssignee] = useState('');
 
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

const toggleDropdown = () => setIsOpen(!isOpen);

const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
};

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


  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };
  
  const handleAssigneeSelect = (email) => {
    setAssignee(email);
    setIsOpen(false); // Close dropdown after selecting
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFilled=checklist.every(task => task.title.trim() !== '');
    if(!allFilled){
      toast.error('Please fill in all checklist items before submitting.');
      return
    }

    const taskData = {
      priority,
      title,
      checklist,
      date: dueDate || '',
      status: 'To-Do', 
      assignee
    };

    try {
      console.log(taskData)
      const response = await createTask(taskData);
      
        if (response.message === 'Task Created') {
          setTimeout(() => {
            toast.success('Task added successfully')
           },3000);
          
          setTitle('');
          setPriority('');
          setChecklist([]);
          setDueDate(null);
          setAssignee('')
          onClose()

          console.log('Email added successfully');
        } else {
          console.error('Error:', response.message);
        }
    } catch (error) {
      console.error('Error while creating task:', error);
    }
  };



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

          
          <div className="priority-options" >
          <label>Select Priority *</label>
            <button
              type="button"
              className={`priority-btn ${priority === 'high' ? 'active' : ''}`}
              onClick={() => setPriority('high')}
            >
              <span
                  className="dot"
                  
                ></span>
              HIGH PRIORITY
            </button>
            <button
              type="button"
              className={`priority-btn ${priority === 'moderate' ? 'active' : ''}`}
              onClick={() => setPriority('moderate')}
            >
              <span
                  className="dot"
                  
                ></span>
              MODERATE PRIORITY
            </button>
            <button
              type="button"
              className={`priority-btn ${priority === 'low' ? 'active' : ''}`}
              onClick={() => setPriority('low')}
            >
              <span
                  className="dot"
                  
                ></span>
              LOW PRIORITY
            </button>
          </div>
          {
            checklist.length>0 ? (
              <div className="dropdown" >
            <label htmlFor="assign-to">Assign to</label>
            <input
                type="text"
                id="assign-to"
                placeholder="Select or search..."
                value={assignee}
                onClick={toggleDropdown}
                onChange={handleSearchChange}
            />
            {isOpen && (
                <div className="dropdown-content" >
                    {emails.map((emailData, index) => (
                        <div className="dropdown-item" key={index}>
                            <div className="user-info">
                                <span className="user-avatar">
                                    {emailData?.email?.slice(0, 2).toUpperCase()}
                                </span>
                                <span className="user-email">{emailData?.email}</span>
                            </div>
                            <button className="assign-btn" onClick={() => handleAssigneeSelect(emailData.email)}>Assign</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
            ):null
          }

          <label>Checklist (0/{checklist.length}) *</label>
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
            <div className="">
            <label>Select Due Date *</label>
          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
           
          />

            </div>
            <div className="">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            </div>
            <div className="">
                   <button
              
              className="save-btn"
              onClick={handleSubmit}
            >
              Save
            </button>
            </div>
      
         
          </div>
   
      </div>
    </div>
  );
};

export default TaskModal;
