import React, { useState } from 'react';
import './DeleteModal.css';
import { RxCross2 } from "react-icons/rx";
import { deleteTask } from '../../api/apiClient';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const DeleteModal = ( { onCloseDeleteModal, taskID } ) => {

  // Function to handle the form submission (POST method)
  const handleSubmit = async ( e ) => {
    e.preventDefault();

    try {
      const result = await deleteTask( taskID );

      if ( result.message === 'Task and associated checklist deleted successfully' ) {
        console.log( result.message );
        toast.success( "task deleted Success fully" )
        // fetchTasks( filterValue )
        onCloseDeleteModal()


      } else {
        console.error( 'Error:', result.message );
      }
    } catch ( error ) {
      console.error( 'Error while deleting task:', error );
    }
  };



  return (
    <div className="modal-overlay">
      <ToastContainer />
      <div className="card">
        <div className="card-content">
          <p className="card-heading">Are you sure want to Delete?</p>

        </div>
        <div className="card-button-wrapper">
          <button className="card-button-cancel1 secondary" onClick={onCloseDeleteModal}>Cancel</button>
          <button className="card-button-delete primary" onClick={handleSubmit}>Yes, Delete</button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModal;
