import React, { useState } from 'react';
import { useTask } from '../../services/useTask'; // Adjust the path as necessary

const Enhance: React.FC = () => {
  const { handleStartTask } = useTask();
  const [enhanceFactor, setEnhanceFactor] = useState<number>(1.0);

  const startEnhanceTask = async () => {
    try {
      const result = await handleStartTask('Enhance', { enhanceFactor });
      alert(result.status);
    } catch (error) {
      alert(error);
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
      <button onClick={startEnhanceTask}>Start Enhance Task</button>
    </div>
  );
};

export default Enhance;
