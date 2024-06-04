import React, { useState } from 'react';
import { useTask } from '../../services/useTask'; // Adjust the path as necessary

const Enhance: React.FC = () => {
  const { handleStartTask } = useTask();
  const [enhanceFactor, setEnhanceFactor] = useState<number>(1.0);

  const startEnhanceTask = async () => {
    try {
      await handleStartTask('Enhance', { enhanceFactor });
      // alert(result.status);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='tool-card'>
      <h2>Enhance</h2>
      <label>
        Enhance Factor: {enhanceFactor}
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={enhanceFactor}
          onChange={(e) => setEnhanceFactor(parseFloat(e.target.value))}
        />
      </label>
      <button onClick={startEnhanceTask}>Start Enhance Task</button>
    </div>
  );
};

export default Enhance;
