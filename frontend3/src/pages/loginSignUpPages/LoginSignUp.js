import React, { useState } from 'react';
import './loginSignup.css';
import img from '../../image/art.png';
import { VscEye } from "react-icons/vsc";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CiUser } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/userReducer';
import { signup, login } from '../../api/apiClient';

const LoginSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid Email id").required("Enter Email Id"),
    password: Yup.string()
      .required("Enter Your Password")
      .min(6, "Password must be at least 6 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  });

  const loginformik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true); // Set loading to true
      try {
        const result = await login(values);
        setLoading(false); // Set loading to false
        if (result.success) {
          dispatch(setToken(result.token));
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        setLoading(false); // Ensure loading is false on error
        toast.error(error.message);
        console.error('Error during login:', error);
      }
    }
  });

  const registerSchema = Yup.object({
    username: Yup.string().required("Enter Username "),
    email: Yup.string().required("Enter Your Email"),
    password: Yup.string()
      .required("Enter Your Password")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const registerformik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true); 
      try {
        const result = await signup(values);
        setLoading(false); 
        if (result.success) {
          toast.success(result.message);
          resetForm();
          setIsLogin(true);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        setLoading(false); 
        toast.error(error.message);
        console.error('Error during signup:', error);
      }
    }
  });

  return (
    <div className="main-content">
      <ToastContainer autoClose={3000} />
      <div className="content-left">
        <div className="box-content">
          <img src={img} alt="Hero-image" />
          <h1>Welcome aboard my friend</h1>
          <p>Just a couple of clicks and we start</p>
        </div>
      </div>

      <div className="content-right">
        {
          isLogin ? (
            <form className="form_container" onSubmit={loginformik.handleSubmit} method="POST">
              <div className="title_container">
                <p className="title">Login to your Account</p>
              </div>
              <br />
              <div className="input_container">
                <span className="icon"><MdOutlineEmail /></span>
                <input
                  placeholder="Email"
                  name="email"
                  type="text"
                  className="input_field"
                  id="email_field"
                  value={loginformik.values.email}
                  onChange={loginformik.handleChange}
                  onBlur={loginformik.handleBlur}
                />
              </div>
              {loginformik.touched.email && loginformik.errors.email ? (
                <div className="error_message">{loginformik.errors.email}</div>
              ) : null}

              <div className="input_container">
                <span className="icon"><RiLockPasswordLine /></span>
                <input
                  placeholder="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input_field"
                  id="password_field"
                  value={loginformik.values.password}
                  onChange={loginformik.handleChange}
                  onBlur={loginformik.handleBlur}
                />
                <span
                  className="icon-eye"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {loginformik.touched.password && loginformik.errors.password ? (
                <div className="error_message">{loginformik.errors.password}</div>
              ) : null}

              <button 
                title={isLogin ? "Sign In" : "Register"} 
                type="submit" 
                className="sign-in_btn"
                disabled={loading} // Disable button when loading
              >
                <span>{loading ? "Please wait..." : "Sign In"}</span> {/* Change button text based on loading state */}
              </button>

              <div className="separator">
                <span>{isLogin ? "Have no account yet?" : "Already have an account?"}</span>
              </div>

              <button 
                type="button" 
                onClick={toggleForm} 
                className="sign-in_ggl"
              >
                <span>{isLogin ? "Register" : "Login"}</span>
              </button>
            </form>
          ) : (
            <form className="form_container" onSubmit={registerformik.handleSubmit} method="POST">
              <div className="title_container">
                <p className="title">Register a new Account</p>
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
              {registerformik.touched.username && registerformik.errors.username ? (
                <div className="error_message">{registerformik.errors.username}</div>
              ) : null}
              <div className="input_container">
                <span className="icon"><MdOutlineEmail /></span>
                <input
                  placeholder="Email"
                  name="email"
                  type="text"
                  className="input_field"
                  id="email_field"
                  value={registerformik.values.email}
                  onChange={registerformik.handleChange}
                  onBlur={registerformik.handleBlur}
                />
              </div>
              {registerformik.touched.email && registerformik.errors.email ? (
                <div className="error_message">{registerformik.errors.email}</div>
              ) : null}
              <div className="input_container">
                <span className="icon"><RiLockPasswordLine /></span>
                <input
                  placeholder="Password"
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
              {registerformik.touched.password && registerformik.errors.password ? (
                <div className="error_message">{registerformik.errors.password}</div>
              ) : null}
              <div className="input_container">
                <span className="icon"><RiLockPasswordLine /></span>
                <input
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="input_field"
                  id="confirm_password_field"
                  value={registerformik.values.confirmPassword}
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
              {registerformik.touched.confirmPassword && registerformik.errors.confirmPassword ? (
                <div className="error_message">{registerformik.errors.confirmPassword}</div>
              ) : null}
              
              <button 
                title={isLogin ? "Sign In" : "Register"} 
                type="submit" 
                className="sign-in_btn"
                disabled={loading} // Disable button when loading
              >
                <span>{loading ? "Please wait..." : "Register"}</span> {/* Change button text based on loading state */}
              </button>

              <div className="separator">
                <span>{isLogin ? "Have no account yet?" : "Already have an account?"}</span>
              </div>

              <button 
                type="button" 
                onClick={toggleForm} 
                className="sign-in_ggl"
              >
                <span>{isLogin ? "Register" : "Login"}</span>
              </button>
            </form>
          )
        }
      </div>
    </div>
  );
};

export default LoginSignUp;
