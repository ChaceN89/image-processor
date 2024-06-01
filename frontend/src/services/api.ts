// src/services/api.ts
import axios from 'axios';
import { Task } from '../context/ImageContext';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust the base URL as needed
});

// Function to start a task
export const startTask = async (task: Task, selectedFile: File) => {
  try {
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Add task details to formData if necessary
    formData.append('taskId', task.taskId);
    formData.append('operation', task.operation);
    if (task.resizeHeight !== undefined) formData.append('resizeHeight', task.resizeHeight.toString());
    if (task.resizeWidth !== undefined) formData.append('resizeWidth', task.resizeWidth.toString());
    if (task.convertTo !== undefined) formData.append('convertTo', task.convertTo);
    if (task.enhanceFactor !== undefined) formData.append('enhanceFactor', task.enhanceFactor.toString());
    if (task.rotateDegrees !== undefined) formData.append('rotateDegrees', task.rotateDegrees.toString());
    if (task.flipDirection !== undefined) formData.append('flipDirection', task.flipDirection);

    // Send the task to the backend
    const response = await api.post(`/img/alter-img/${task.taskId}`, formData, { 
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
