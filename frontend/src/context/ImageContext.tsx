import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the interface for a task
export interface Task {
  taskId: string; // the uuid for the task 
  operation: string; // the string representing the operation 
  status: string; // the status of this task
  progress: number; // the immediate progress of the task 

  // file info upon return 
  filename?: string; 

  // components specific to the operation type some can be null
  resizeHeight?: number; // Optional field for the resize endpoint
  resizeWidth?: number;  // Optional field for the resize endpoint
  convertTo?: string;  // Optional field for the conversion endpoint
  enhanceFactor?: number; // Optional field for the enhance endpoint
  rotateDegrees?: number; // Optional field for the rotate endpoint
  flipDirection?: string; // Optional field for the flip endpoint

  // the url to the altered image for display and download
  alteredImageUrl?: string; // URL of the altered image to download and display
  timeEnded?: string; // Time when the task ended
}
  
// Interface for the context's value
interface ImageContextProps {
  selectedFile: File | null; // the main file
  setSelectedFile: (file: File | null) => void; // ability to set the selected file
  tasks: Task[]; // a list of tasks with functions to add and update tasks
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: string, additionalInfo?: Partial<Task>) => void;
  setTasks: (tasks: Task[]) => void; // Add setTasks to the interface
  getTaskById: (taskId: string) => Task | undefined; // Add getTaskById to the interface
}
  
// Create the context
const ImageContext = createContext<ImageContextProps | undefined>(undefined);
  
// Provider component
export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTaskStatus = (taskId: string, status: string, additionalInfo?: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.taskId === taskId ? { ...task, status, ...additionalInfo } : task
      )
    );
  };

  const getTaskById = (taskId: string) => {
    return tasks.find(task => task.taskId === taskId);
  };

  return (
    <ImageContext.Provider value={{ selectedFile, setSelectedFile, tasks, addTask, updateTaskStatus, setTasks, getTaskById }}>
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook to use the ImageContext
export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};
  