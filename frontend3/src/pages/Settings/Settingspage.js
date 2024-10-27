import React,{useState} from 'react'
import { VscEye } from "react-icons/vsc";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CiUser } from "react-icons/ci";
import './SettingsPage.css'
import { updateUser } from '../../api/apiClient';
import { useDispatch } from 'react-redux';
import { clearToken } from '../../redux/userReducer';

const Settingspage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch=useDispatch()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const registerSchema = Yup.object({
    username: Yup.string().required("Enter Username "),
    email:Yup.string().required("Enter Your Email"),
    password: Yup.string()
      .required("Enter Your Password")
      .min(6, "Password must be at least 6 characters long"),
    newPassword: Yup.string()
      .required("Enter Your Password")
      .min(6, "Password must be at least 6 characters long")

  });

  const registerformik = useFormik({
    initialValues: {
      username: "",
      email:"",
      password: "",
      newPassword:""
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const userData = {
          username: values.username,
          email: values.email,
          oldPassword: values.password, 
          newPassword: values.confirmPassword 
        };
  
        const response = await updateUser(userData); 
  
        if (response.msg) {
          toast.success(response.msg);
          console.log('User updated successfully:', response);
          dispatch(clearToken())
        } else {
          toast.error('Update failed');
        }
      } catch (err) {
        if (err.response) {
          const errorMessage = err.response.data.msg;
          toast.error(errorMessage);
          console.log(errorMessage);
        } else {
          toast.error("Update failed");
        }
      }
    }
  });
  return (
    <div className=''>
      <ToastContainer />
      <form className="form_container2" onSubmit={registerformik.handleSubmit} method="PUT">
            <div className="title_container">
              <p className="title">Settings</p>
            </div>
            <br />
            <div className="input_container">
              <span className="icon"><CiUser /></span>
              <input
                placeholder="Name"
                name="username"
                type="text"
                className="input_field"
                id="user_field"
                value={registerformik.values.username}
                onChange={registerformik.handleChange}
                onBlur={registerformik.handleBlur}
               
              />
            </div>
            <div className="input_container">
              <span className="icon"><MdOutlineEmail /></span>
              <input
                placeholder=" Update Email"
                name="email"
                type="text"
                className="input_field"
                id="email_field"
                value={registerformik.values.email}
                onChange={registerformik.handleChange}
                onBlur={registerformik.handleBlur}
              />
            </div>
  
            <div className="input_container">
              <span className="icon"><RiLockPasswordLine /></span>
              <input
                placeholder="Old Password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="input_field"
                id="password_field"
                value={registerformik.values.password}
                onChange={registerformik.handleChange}
                onBlur={registerformik.handleBlur}
              />
              <span 
                className="icon-eye" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
  
            
              <div className="input_container">
                <span className="icon"><RiLockPasswordLine /></span>
                <input
                  placeholder="New Password"
                  name="newPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="input_field"
                  id="confirm_password_field"
                  value={registerformik.values.newPassword}
                  onChange={registerformik.handleChange}
                  onBlur={registerformik.handleBlur}
                />
                <span 
                className="icon-eye" 
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              </div>
            
  
           
  
            <button title="Update"  type="submit" className="sign-in_btn">
              <span>Update</span>
            </button>
  
          </form>
    </div>
  )
}

export default Settingspage