import React from 'react';
import { useImageContext } from '../context/ImageContext';
import { urlToFile } from '../services/utils'; // Import the utility function
import FetchTask from './subcomponents/FetchTask';
import CancelTask from './subcomponents/CancelTask';
import DownloadImage from './subcomponents/DownloadImage';
import { formatDate } from '../services/utils';

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
    <div className="results">
      {/* Section above the horizontal scroll box with the tasks */}
      <div>Number of current tasks: {tasks.length}</div>
      
      <div className="tasks-container">
        {tasks.map((task, index) => (
          <div className='taskBox' key={index}>
            <FetchTask taskId={task.taskId} />
            {task.status === 'Completed' && task.alteredImageUrl ? (
              <div className="task-completed">
                <img
                  src={task.alteredImageUrl}
                  alt={`Result for ${task.taskId}`}
                  onClick={() => handleImageClick(task.alteredImageUrl!, task.filename || "")}
                />
                <CancelTask taskId={task.taskId} />
                <div className='photoInfo'>
                  <p>{ formatDate(task.timeEnded)}</p>
                  <DownloadImage taskId={task.taskId} />
                </div>
              </div>
            ) : (
              <>
                <div>{task.status} %</div>
                <div>{task.progress}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
