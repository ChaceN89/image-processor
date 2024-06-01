import React, { useState } from 'react';
import { useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary

const Convert: React.FC = () => {

  // get the fucntion 
  const { addTask, selectedFile } = useImageContext();
  const [selectedFormat, setSelectedFormat] = useState<string>('');

  // lsit of possible conversions 
  const conversionList = ['png', 'jpg', 'bmp', 'gif']; // Example conversion types

  const handleStartTask = () => {
    if (!selectedFormat) {
      alert('Please select a conversion type.');
      return;
    }
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask = {
      taskId,
      operation: 'Convert',
      status: 'Pending',
      convertTo: selectedFormat,
      image:selectedFile,
    };
    addTask(newTask);
    // alert(`Task started with ID: ${taskId}`);
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
