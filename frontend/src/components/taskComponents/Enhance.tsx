import React, { useState } from 'react';
import { Task, useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary
import { startTask } from '../../services/api'; // Import the startTask function

const Enhance: React.FC = () => {
  const { addTask, selectedFile, updateTaskStatus } = useImageContext();
  const [enhanceFactor, setEnhanceFactor] = useState<number>(1.0);

  const handleStartTask = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask: Task = {
      taskId,
      operation: 'Enhance',
      status: 'Pending',
      progress: 0,
      enhanceFactor,
    };
    addTask(newTask);

    try {
      const result = await startTask(newTask, selectedFile);
      // Update the task with the result if necessary
      alert(result)
    } catch (error) {
      alert(error)
    }
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
