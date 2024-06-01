import React from 'react';
import DisplayTasks from './subcomponents/DisplayTasks';
import { useImageContext } from '../context/ImageContext';
import { urlToFile } from '../services/utils'; // Import the utility function
import FetchTask from './subcomponents/FetchTask';
import CancelTask from './subcomponents/CancelTask';


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
      <div>Number of current tasks: { tasks.length}</div>
      <hr />
      {tasks.map((task, index) => (
        <div key={index}>
          <FetchTask taskId={task.taskId} />
          <CancelTask taskId={task.taskId} />
          <div>{task.progress}</div>
          <div>{task.status}</div>
          {task.status === 'Completed' && task.alteredImageUrl && (
            <div>
              <h4>Task Completed: {task.taskId}</h4>
              <img
                src={task.alteredImageUrl}
                alt={`Result for ${task.taskId}`}
                style={{ maxWidth: '30%', height: '40%', cursor: 'pointer' }}
                onClick={() => handleImageClick(task.alteredImageUrl!, task.filename || "")}
              />
              <p>Time Ended: {task.timeEnded}</p>
            </div>
          )}
          <hr />
        </div>
      ))}
      <DisplayTasks />
    </div>
  );
};

export default Results;
