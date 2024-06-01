import React, { useEffect } from 'react';
import { getTaskStatus } from '../../services/api'; // Import the getTaskStatus function
import { useImageContext } from '../../context/ImageContext';

interface FetchTaskProps {
  taskId: string;
}

const FetchTask: React.FC<FetchTaskProps> = ({ taskId }) => {
  const { updateTaskStatus, getTaskById } = useImageContext();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const currStatus = getTaskById(taskId);

        // Check if the current status is already completed or failed
        if (currStatus?.status === 'Completed' || currStatus?.status === 'Failed') {
          clearInterval(interval); // Stop polling if the task is already completed or failed
          return;
        }

        const status = await getTaskStatus(taskId);
        updateTaskStatus(taskId, status.status);

        if (status.status === 'Completed' || status.status === 'Failed') {
          clearInterval(interval); // Stop polling when the task is completed or failed
          
          // If the status is completed, update the task with additional information
          if (status.status === 'Completed') {
            updateTaskStatus(taskId, 'Completed', {
              progress: 100,
              alteredImageUrl: status.result.file_url,
              timeEnded: status.time_ended,
              filename: "altered_" + status.task_name + "_" + status.original_filename
            });
          }
        } else {
          // Update progress and other intermediate details
          updateTaskStatus(taskId, status.status, {
            progress: status.progress
          });
        }
      } catch (error) {
        console.error('Error fetching task status:', error);
        clearInterval(interval); // Stop polling on error
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [taskId, updateTaskStatus, getTaskById]);

  return null;
};

export default FetchTask;
