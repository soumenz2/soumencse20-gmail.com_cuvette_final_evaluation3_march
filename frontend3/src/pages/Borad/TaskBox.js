import React, { useState ,useEffect} from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { HiDotsHorizontal } from "react-icons/hi";
import "./TaskBox.css";
import DeleteModal from "../ModalPage/DeleteModal";
import UpdateTaskModal from "../ModalPage/UpdateTaskModal";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { updateTaskStatus } from "../../api/apiClient";
import { updateTaskChecklist } from "../../api/apiClient";
import { ToastContainer, toast } from "react-toastify";

const TaskBox = ({ task, filterValue, fetchTasks , collapseTrigger }) => {
  const [checklistVisible, setChecklistVisible] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = useSelector((state) => state.user.tokenId);
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;

  useEffect(() => {
    setChecklistVisible(false);
  }, [collapseTrigger]);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => {
    fetchTasks(filterValue);
    setDeleteModalOpen(false);
  };

  const openUpdateModal = () => setUpdateModalOpen(true);
  const closeUpdateModal = () => {
    fetchTasks(filterValue);
    setUpdateModalOpen(false);
  };
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleChecklist = () => setChecklistVisible(!checklistVisible);
  const handleCheckChange = async (checkListID, newStatus) => {
    console.log("checkListID:", checkListID);
    console.log("currentTask before update:", currentTask);

    if (!checkListID || !setCurrentTask) {
      console.error("Undefined checkListID or setCurrentTask");
      return;
    }

    setCurrentTask((prevTask) => ({
      ...prevTask,
      checkList: prevTask.checkList.map((item) =>
        item.checkListID === checkListID ? { ...item, isDone: newStatus } : item
      ),
    }));

    try {
      const payload = { checkListID, newStatus };
      const result = await updateTaskChecklist(payload);
      if (result.message) {
        toast.success("Task status updated");
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating checklist item:", error);
    }
  };

  const completedTasksCount = currentTask.checkList.filter(
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

  const isDueDatePassed = task.dueDate
    ? new Date(task.dueDate) < new Date()
    : false;

  const updateStatus = async (status) => {
    try {
      const result = await updateTaskStatus({ taskID: task.taskID, status });
      if (result.message) {
        fetchTasks(filterValue);
        toast.success("Task status updated");
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error while updating task:", error);
      toast.error("Error updating task");
    }
  };

  const handleShare = async () => {
    const shareURL = `${window.location.origin}/task/${task.taskID}`;
    try {
      await navigator.clipboard.writeText(shareURL);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy URL:", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="task-box-container1">
      <ToastContainer />
      <div className="priority-header1">
        <div className="prioritybox">
          <span
            className={`priority-label1 ${task.priority
              .replace(" ", "-")
              .toLowerCase()}`}
          />
          <span className="priority-text1">{task.priority}</span>
        </div>

        <label className="dropdown">
          <div className="dd-button">{/* <HiDotsHorizontal /> */}</div>

          <input type="checkbox" className="dd-input" id="test" />

          <ul className="dd-menu">
            <li onClick={openUpdateModal}>Edit</li>
            <li onClick={handleShare}>Share</li>
            {userId === task.createdBy && (
              <li className="delete-option1" onClick={openDeleteModal}>
                Delete
              </li>
            )}
          </ul>
        </label>
      </div>

      <h4 className="task-title1">
        {task.taskName}
        {task.taskName.length > 48 && (
          <span className="tooltip">{task.taskName}</span>
        )}
      </h4>

      <div className="task-box-header1">
        <p className="checklist-info1">
          Checklist ({completedTasksCount}/{task.checkList.length})
        </p>
        <button className="toggle-btn" onClick={toggleChecklist}>
          {checklistVisible ? <SlArrowUp /> : <SlArrowDown />}
        </button>
      </div>

      {checklistVisible && (
        <div className="task-checklist1">
          {currentTask.checkList.map((item) => (
            <div className="checklist-item1" key={item.checkListID}>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={(e) =>
                  handleCheckChange(item.checkListID, e.target.checked)
                }
              />
              <label>{item.title}</label>
            </div>
          ))}
        </div>
      )}

      <div className="task-footer1">
        <span className={`task-date1 ${isDueDatePassed ? "past-due" : ""}`}>
          {task.dueDate && formatDate(task.dueDate)}
        </span>
        <div className="task-status-container1">
          {task.statusOptions.map((status, index) => (
            <span
              className="task-status1"
              key={index}
              onClick={() => updateStatus(status)}
            >
              {status}
            </span>
          ))}
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          onCloseDeleteModal={closeDeleteModal}
          taskID={task.taskID}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateTaskModal onClose={closeUpdateModal} taskData={task} />
      )}
    </div>
  );
};

export default TaskBox;
