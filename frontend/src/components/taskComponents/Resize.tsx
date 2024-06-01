import React, { useState } from 'react';
import { Task, useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary
import { startTask } from '../../services/api'; // Import the startTask function

const Resize: React.FC = () => {
  const { addTask, selectedFile, updateTaskStatus } = useImageContext();
  const [resizeHeight, setResizeHeight] = useState<number>(0);
  const [resizeWidth, setResizeWidth] = useState<number>(0);

  const handleStartTask = async () => {
    if (resizeHeight <= 0 || resizeWidth <= 0) {
      alert('Please enter valid height and width.');
      return;
    }
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask: Task = {
      taskId,
      operation: 'Resize',
      status: 'Pending',
      progress: 0,
      resizeHeight,
      resizeWidth,
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
