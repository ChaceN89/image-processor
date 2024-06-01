import React, { useState } from 'react';
import { useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary

const Flip: React.FC = () => {
  const { addTask, selectedFile } = useImageContext();
  const [flipDirection, setFlipDirection] = useState<string>('horizontal');

  const flipOptions = ['horizontal', 'vertical']; // Array for flip directions

  const handleStartTask = () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask = {
      taskId,
      operation: 'Flip',
      status: 'Pending',
      flipDirection,
      image: selectedFile,
    };
    addTask(newTask);
    alert(`Flip task started with ID: ${taskId}`);
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
