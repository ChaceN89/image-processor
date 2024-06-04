import React from 'react';
import { useImageContext } from '../../context/ImageContext';
import { cancelTask } from '../../services/api'; // Import the cancelTask function
import { FaTimes } from 'react-icons/fa'; // Import react-icons

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
    // remove the task from the frontend if backend call fails or succeeds
    setTasks(tasks.filter(task => task.taskId !== taskId));
  };

  return (
    <button onClick={handleCancelTask}>
      <FaTimes />
    </button>
  );
};

export default CancelTask;
