import React, { useState } from 'react';
import { useTask } from '../../services/useTask'; // Adjust the path as necessary

const Rotate: React.FC = () => {
  const { handleStartTask } = useTask();
  const [rotateDegrees, setRotateDegrees] = useState<number>(0);

  const startRotateTask = async () => {
    try {
      await handleStartTask('Rotate', { rotateDegrees });
      // const result = await handleStartTask('Rotate', { rotateDegrees });
      // alert(result.status);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='tool-card'>
      <h2>Rotate</h2>
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
      <button onClick={startRotateTask}>Rotate Image</button>
    </div>
  );
};

export default Rotate;
