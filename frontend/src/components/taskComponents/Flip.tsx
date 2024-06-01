import React, { useState } from 'react';
import { Task, useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary
import { startTask } from '../../services/api'; // Import the startTask function

const Flip: React.FC = () => {
  const { addTask, selectedFile, updateTaskStatus } = useImageContext();
  const [flipDirection, setFlipDirection] = useState<string>('horizontal');

  const flipOptions = ['horizontal', 'vertical']; // Array for flip directions

  const handleStartTask = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask: Task = {
      taskId,
      operation: 'Flip',
      status: 'Pending',
      progress: 0,
      flipDirection,
    };
    addTask(newTask);

    try {
      const result = await startTask(newTask, selectedFile);
      updateTaskStatus(taskId, 'Completed');
      // Update the task with the result if necessary
    } catch (error) {
      updateTaskStatus(taskId, 'Failed');
    }
  };

  return (
    <div>
      <h1>Flip</h1>
      <label>Flip Direction:</label>
      {flipOptions.map((option) => (
        <div key={option}>
          <input
            type="radio"
            id={option}
            name="flipDirection"
            value={option}
            checked={flipDirection === option}
            onChange={(e) => setFlipDirection(e.target.value)}
          />
          <label htmlFor={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</label>
        </div>
      ))}
      <button onClick={handleStartTask}>Start Flip Task</button>
    </div>
  );
};

export default Flip;
