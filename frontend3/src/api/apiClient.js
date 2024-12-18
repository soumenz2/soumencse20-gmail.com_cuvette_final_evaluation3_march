
import axios from 'axios';

import { setToken,clearToken } from '../redux/userReducer';
import {store} from '../redux/store'
import { useDispatch ,useSelector} from 'react-redux';


const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Signup request
export const signup = async (userData) => {
  try {

    console.log("data2",process.env.REACT_APP_API_BASE_URL)
    const response = await apiClient.post('/signup', userData);
    return response.data; 
  } catch (error) {
    console.error('Signup Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      return error.response?.data || { msg: 'An error occurred during signup' };
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearToken());
      return Promise.reject({ message: 'Session expired. Please log in again.' });
    }
    return Promise.reject(error);
  }
);


export const login = async (credentials) => {
    
  try {
    const response = await apiClient.post('/login', credentials);
    store.dispatch(setToken(response.data.token));
    return response.data; 
   
  } catch (error) {
    return { success: false, msg: error.response?.data?.msg || 'An error occurred during login' };
  }
};

export const addEmail = async ({email}) => {
  try {
 
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }

    const response = await apiClient.post(
      '/addEmail',
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
   // console.error('Add Email Error:', error.message);
    return error.response?.data || { message: 'An error occurred while adding email' };
  }
};
export const createTask = async (formData) => {
  try {
 
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }

    const response = await apiClient.post(
      '/createTask',
       formData ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Add Task Error:', error.message);
    return error.response?.data || { message: 'An error occurred while adding task' };
  }
};

export const getEmail = async () => {
  try {
 
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }

    const response = await apiClient.get(
      '/getEmail',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Add Email Error:', error.message);
    return error.response?.data || { message: 'An error occurred while fetching  email' };
  }
};

export const getTasks = async (filter) => {
  try {
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }

    const response = await apiClient.post(
      '/getTask', 
      { filter },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Fetch Tasks Error:', error.message);
    return error.response?.data || { message: 'An error occurred while fetching tasks' };
  }
};

export const updateTask = async (taskData) => {
  try {
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }

    const response = await apiClient.put(
      '/updateTask',
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Update Task Error:', error.message);
    return error.response?.data || { message: 'An error occurred while updating the task' };
  }
};

export const updateUser = async (userData) => {
  try {
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }

    const response = await apiClient.put(
      '/updateUser',
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Update User Error:', error.message);
    return error.response?.data || { message: 'An error occurred while updating user information' };
  }
};

export const deleteTask = async (taskID) => {
  try {
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }
    const response = await apiClient.delete('/deleteTask', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { taskID },
    });
    return response.data; 
  } catch (error) {

    return error.response?.data || { message: 'An error occurred while deleting the task' };
  }
};
export const updateTaskStatus = async (taskData) => {
  try {
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }

    const response = await apiClient.put(
      '/updateTaskStatus',
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Update Task Error:', error.message);
    return error.response?.data || { message: 'An error occurred while updating the task' };
  }
};

export const getuser = async () => {
  try {
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }

    const response = await apiClient.get(
      '/getuser', 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Fetch Tasks Error:', error.message);
    return error.response?.data || { message: 'An error occurred while fetching tasks' };
  }
};
export const getTaskCounts = async () => {
  try {
    const token = store.getState().user.tokenId;

    if (!token) {
      return { message: 'No token provided' };
    }

    const response = await apiClient.get(
      '/getTaskCounts', 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Fetch Tasks Error:', error.message);
    return error.response?.data || { message: 'An error occurred while fetching analytics data' };
  }
};
export const getTaskByID = async (taskID) => {
  try {

    if (!taskID) {
      return { message: 'taskID is required' };
    }

    const response = await apiClient.get('/getTaskByID', {
      params: {
        taskID, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Fetch Task by ID Error:', error.message);
    return error.response?.data || { message: 'An error occurred while fetching task details' };
  }
};

export const updateTaskChecklist = async (payload) => {
  try {
    const token = store.getState().user.tokenId;
    console.log(payload)
 

    if (!token) {
      return { message: 'No token provided' };
    }
    const response = await apiClient.put(
      '/updateTaskChecklist',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Fetch Task by ID Error:', error.message);
    return error.response?.data || { message: 'An error occurred while updating checklist' };
  }
};