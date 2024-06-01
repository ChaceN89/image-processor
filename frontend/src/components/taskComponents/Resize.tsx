import React, { useState } from 'react';
import { useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary

const Resize: React.FC = () => {
  const { addTask, selectedFile } = useImageContext();
  const [resizeHeight, setResizeHeight] = useState<number>(0);
  const [resizeWidth, setResizeWidth] = useState<number>(0);

  const handleStartTask = () => {
    if (resizeHeight <= 0 || resizeWidth <= 0) {
      alert('Please enter valid height and width.');
      return;
    }
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask = {
      taskId,
      operation: 'Resize',
      status: 'Pending',
      resizeHeight,
      resizeWidth,
      image: selectedFile,
    };
    addTask(newTask);
    alert(`Resize task started with ID: ${taskId}`);
  };

  return (
    <div>
      <h1>Resize</h1>
      <label>
        Height:
        <input
          type="number"
          value={resizeHeight}
          onChange={(e) => setResizeHeight(parseInt(e.target.value))}
          min="1"
        />
      </label>
      <br />
      <label>
        Width:
        <input
          type="number"
          value={resizeWidth}
          onChange={(e) => setResizeWidth(parseInt(e.target.value))}
          min="1"
        />
      </label>
      <br />
      <button onClick={handleStartTask}>Start Resize Task</button>
    </div>
  );
};

export default Resize;
