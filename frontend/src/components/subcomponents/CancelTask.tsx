// src/components/subcomponents/CancelTask.tsx
import React from 'react';
import { useImageContext } from '../../context/ImageContext';
import { cancelTask } from '../../services/api'; // Import the cancelTask function

interface CancelTaskProps {
  taskId: string;
}

const CancelTask: React.FC<CancelTaskProps> = ({ taskId }) => {
  const { tasks, setTasks } = useImageContext();

  const handleCancelTask = async () => {
    try {
      await cancelTask(taskId);
    } catch (error) {
        console.error('Error canceling task:', error);
    }
    // remove the task rom the frontend if baclend call fails or succeds
    setTasks(tasks.filter(task => task.taskId !== taskId));
  };

  return (
    <button onClick={handleCancelTask}>
      Cancel Task
    </button>
  );
};

export default CancelTask;
