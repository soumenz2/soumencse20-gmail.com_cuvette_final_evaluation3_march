import React, { useState } from 'react';
import './DeleteModal.css';
import { RxCross2 } from "react-icons/rx";
const DeleteModal = ({  onCloseDeleteModal }) => {

  // Function to handle the form submission (POST method)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the task data object
  

    try {
      // Example POST request
      
    } catch (error) {
      console.error('Error while creating task:', error);
    }
  };



  return (
    <div className="modal-overlay">
      <div className="card">
        <div className="card-content">
          <p className="card-heading">Are you sure want to Delete?</p>
         
        </div>
        <div className="card-button-wrapper">
          <button className="card-button-cancel1 secondary" onClick={onCloseDeleteModal}>Cancel</button>
          <button className="card-button-delete primary">Yes, Delete</button>
        </div>
      
      </div>
    </div>
  );
};

export default DeleteModal;
