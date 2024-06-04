import React, { useState } from 'react';
import { useTask } from '../../services/useTask'; // Adjust the path as necessary

const Resize: React.FC = () => {
  const { handleStartTask } = useTask();
  const [resizeHeight, setResizeHeight] = useState<number>(0);
  const [resizeWidth, setResizeWidth] = useState<number>(0);

  const startResizeTask = async () => {
    if (resizeHeight <= 0 || resizeWidth <= 0) {
      alert('Please enter valid height and width.');
      return;
    }

    try {
      await handleStartTask('Resize', { resizeHeight, resizeWidth });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='tool-card'>
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
      <button onClick={startResizeTask}>Start Resize Task</button>
    </div>
  );
};

export default Resize;
