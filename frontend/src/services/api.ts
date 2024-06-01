// src/services/api.ts
import axios from 'axios';
import { Task } from '../context/ImageContext';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: apiUrl, // Adjust the base URL as needed
});


// Function to start a task
export const startTask = async (task: Task, selectedFile: File) => {
  try {
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Construct the query parameters
    const params = new URLSearchParams();
    params.append('operation', task.operation);
    if (task.resizeHeight !== undefined) params.append('resizeHeight', task.resizeHeight.toString());
    if (task.resizeWidth !== undefined) params.append('resizeWidth', task.resizeWidth.toString());
    if (task.convertTo !== undefined) params.append('convertTo', task.convertTo);
    if (task.enhanceFactor !== undefined) params.append('enhanceFactor', task.enhanceFactor.toString());
    if (task.rotateDegrees !== undefined) params.append('rotateDegrees', task.rotateDegrees.toString());
    if (task.flipDirection !== undefined) params.append('flipDirection', task.flipDirection);

    // Send the task to the backend
    const response = await api.post(`/img/alter-img/${task.taskId}?${params.toString()}`, formData, { 
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle the response
    return response.data;
  } catch (error) {
    console.error('Error starting task:', error);
    throw error;
  }
};


// Function to get the status of a task
export const getTaskStatus = async (taskId: string) => {
  try {
    const response = await api.get(`/img/task-status/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting task status:', error);
    throw error;
  }
};


// Function to cancel a task
export const cancelTask = async (taskId: string) => {
  try {
    const response = await api.delete(`/img/cancel-task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling task:', error);
    throw error;
  }
};
