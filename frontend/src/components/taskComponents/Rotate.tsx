import React, { useState } from 'react';
import { useImageContext } from '../../context/ImageContext';
import { generateUUID } from '../../services/utils'; // Adjust the path as necessary

const Rotate: React.FC = () => {
  const { addTask, selectedFile } = useImageContext();
  const [rotateDegrees, setRotateDegrees] = useState<number>(0);

  const handleStartTask = () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const taskId = generateUUID();
    const newTask = {
      taskId,
      operation: 'Rotate',
      status: 'Pending',
      rotateDegrees,
      image: selectedFile,
    };
    addTask(newTask);
    alert(`Rotate task started with ID: ${taskId}`);
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
