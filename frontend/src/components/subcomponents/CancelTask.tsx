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
      const result = await cancelTask(taskId);
    //   alert(result.status);
      setTasks(tasks.filter(task => task.taskId !== taskId));
    } catch (error) {
      console.error('Error canceling task:', error);
    }
  };

  return (
    <button onClick={handleCancelTask}>
      Cancel Task
    </button>
  );
};

export default CancelTask;
