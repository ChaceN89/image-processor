import React from 'react';
import DisplayTasks from './subcomponents/DisplayTasks';
import { useImageContext } from '../context/ImageContext';
import FetchTask from './subcomponents/FetchTask';
import { urlToFile } from '../services/utils'; // Import the utility function


const Results: React.FC = () => {
  const { tasks, setSelectedFile } = useImageContext();

  const handleImageClick = async (url: string, filename: string) => {
    try {
      const file = await urlToFile(url, filename);
      setSelectedFile(file);
    } catch (error) {
      console.error('Error converting image URL to file:', error);
    }
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          <FetchTask taskId={task.taskId} />
          {task.status === 'Completed' && (
            <div>
              <h2>Task Completed: {task.taskId}</h2>
              <img
                src={task.alteredImageUrl}
                alt={`Result for ${task.taskId}`}
                style={{ maxWidth: '30%', height: '40%', cursor: 'pointer' }}
                onClick={() => handleImageClick(task.alteredImageUrl!, "filename")}
              />
              <p>Time Ended: {task.timeEnded}</p>
            </div>
          )}
        </div>
      ))}
      <DisplayTasks />
    </div>
  );
};

export default Results;
