import React, { useState } from 'react';
import { Task, useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary
import { startTask } from '../../services/api'; // Import the startTask function

const Convert: React.FC = () => {
  const { addTask, selectedFile, updateTaskStatus } = useImageContext();
  const [selectedFormat, setSelectedFormat] = useState<string>('');

  const conversionList = ['png', 'jpg', 'bmp', 'gif']; // Example conversion types

  const handleStartTask = async () => {
    if (!selectedFormat) {
      alert('Please select a conversion type.');
      return;
    }
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask: Task = {
      taskId,
      operation: 'Convert',
      status: 'Pending',
      progress: 0,
      convertTo: selectedFormat,
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
      <h1>Convert</h1>
      <label>
        Select conversion type:
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
        >
          <option value="">Select...</option>
          {conversionList.map((conversion) => (
            <option key={conversion} value={conversion}>
              {conversion.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleStartTask}>Start Conversion Task</button>
    </div>
  );
};

export default Convert;
