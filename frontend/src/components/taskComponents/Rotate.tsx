import React, { useState } from 'react';
import { Task, useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary
import { startTask } from '../../services/api'; // Import the startTask function

const Rotate: React.FC = () => {
  const { addTask, selectedFile, updateTaskStatus } = useImageContext();
  const [rotateDegrees, setRotateDegrees] = useState<number>(0);

  const handleStartTask = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask: Task = {
      taskId,
      operation: 'Rotate',
      status: 'Pending',
      progress: 0,
      rotateDegrees,
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
      <h1>Rotate</h1>
      <label>
        Rotate Degrees:
        <input
          type="number"
          value={rotateDegrees}
          onChange={(e) => setRotateDegrees(parseInt(e.target.value))}
          step="1"
          min="0"
          max="360"
        />
      </label>
      <br />
      <button onClick={handleStartTask}>Start Rotate Task</button>
    </div>
  );
};

export default Rotate;
