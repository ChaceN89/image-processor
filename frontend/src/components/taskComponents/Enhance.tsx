import React, { useState } from 'react';
import { useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary

const Enhance: React.FC = () => {
  const { addTask, selectedFile } = useImageContext();
  const [enhanceFactor, setEnhanceFactor] = useState<number>(1.0);

  const handleStartTask = () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask = {
      taskId,
      operation: 'Enhance',
      status: 'Pending',
      enhanceFactor,
      image: selectedFile,
    };
    addTask(newTask);
    alert(`Enhance task started with ID: ${taskId}`);
  };

  return (
    <div>
      <h1>Enhance</h1>
      <label>
        Enhance Factor:
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={enhanceFactor}
          onChange={(e) => setEnhanceFactor(parseFloat(e.target.value))}
        />
        <span>{enhanceFactor}</span>
      </label>
      <button onClick={handleStartTask}>Start Enhance Task</button>
    </div>
  );
};

export default Enhance;
