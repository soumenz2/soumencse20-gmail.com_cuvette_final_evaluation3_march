import React, { useState } from 'react';
import './Addpeople.css';
import { RxCross2 } from "react-icons/rx";
import { addEmail } from '../../api/apiClient';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AddPeopleModal = ({  onAddPeopleClose }) => {
    const [email,setEmail]=useState('')
    const [isValid, setIsValid] = useState(true);
    const [openSecondModal,setOpenSecondaryModal]=useState(false)


    const validateEmail = (input) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(input);
      };
      const handleChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        
        
        if (validateEmail(inputValue)) {
          setIsValid(true); 
        } else {
          setIsValid(false); 
          setEmail('')
        }
      };
      const handleAddEmail = async () => {
        if (!isValid) {
          toast.error('Please enter a valid email.');
          return;
      }
        const response = await addEmail({ email });
      
        if (response.message === 'Email added') {
          toast.success('Email added successfully')
          setOpenSecondaryModal(true); 
           

          console.log('Email added successfully');
        } else {
          console.error('Error:', response.message);
        }
      };



  return (
    <div className="modal-overlay">
      <ToastContainer />
        {
           openSecondModal?(
           <div className="card1">
            <div className="card-content1">
              <p className="card-heading2"><p className="mail-text">{email} </p> is added to board </p>
              
            </div>
            <div className="card-button-wrapper1">
              
              <button className="card-button-Add primary" onClick={onAddPeopleClose}>Okey, got it</button>
            </div>
          
          </div>):(
              <div className="card1">
              <div className="card-content1">
                <p className="card-heading1">Add People to the board</p>
                <input type="text" name="email" id="" value={email} className="input-feild" placeholder='Enter the Email' onChange={handleChange}></input>
                {!isValid && <p style={{ color: 'red' }}>Please enter a valid email.</p>} 
              </div>
              <div className="card-button-wrapper1">
                <button className="card-button-cancel secondary" onClick={onAddPeopleClose}>Cancel</button>
                <button className="card-button-Add primary" onClick={handleAddEmail}>Add Email</button>
              </div>
            
            </div>
          ) 
        }
      
    </div>
  );
};

export default AddPeopleModal;
