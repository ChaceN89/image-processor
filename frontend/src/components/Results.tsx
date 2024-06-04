import React from 'react';
import { useImageContext } from '../context/ImageContext';
import { urlToFile } from '../services/utils'; // Import the utility function
import FetchTask from './subcomponents/FetchTask';
import CancelTask from './subcomponents/CancelTask';
import DownloadImage from './subcomponents/DownloadImage';
import { formatDate } from '../services/utils';
import Loader from './subcomponents/Loader';

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
    <div className='right-bottom'>
      <h4>Number of Current Tasks: {tasks.length} </h4>
      <div className="scrolling-wrapper">
        {tasks.map((task, index) => (
          <div className="card">
            <FetchTask taskId={task.taskId} />
            {task.status === 'Completed' && task.alteredImageUrl ? (
              <>
                <img
                  className='card-image'
                  title='Click to Edit this Image'
                  src={task.alteredImageUrl}
                  alt={`Result for ${task.taskId}`}
                  onClick={() => handleImageClick(task.alteredImageUrl!, task.filename || "")}
                />
                <div>
                  <p>{ formatDate(task.timeEnded)}</p>
                  <DownloadImage taskId={task.taskId} />
                </div>
                <div>Image {task.operation}</div>
              </>
            ):(
              <>
                <Loader operation={task.operation} message={task.status} progress={task.progress}/>
              </>
            )}
            <CancelTask taskId={task.taskId} />
          </div>
        ))}
      </div>
    </div>
  )
};

export default Results;
