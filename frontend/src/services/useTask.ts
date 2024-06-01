// src/hooks/useTask.ts
import { useImageContext, Task } from '../context/ImageContext';
import { generateUUID } from '../services/utils';
import { startTask } from '../services/api';

export const useTask = () => {
  const { addTask, selectedFile, updateTaskStatus } = useImageContext();

  const handleStartTask = async (operation: string, params: Partial<Task>) => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask: Task = {
      taskId,
      operation,
      status: 'Pending',
      progress: 0,
      ...params,
    };
    addTask(newTask);

    try {
      const result = await startTask(newTask, selectedFile);
      updateTaskStatus(taskId, 'In Progress');
      return result;
    } catch (error) {
      updateTaskStatus(taskId, 'Failed');
      throw error;
    }
  };

  return { handleStartTask };
};
