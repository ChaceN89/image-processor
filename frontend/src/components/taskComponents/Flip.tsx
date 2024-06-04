import React, { useState } from 'react';
import { useTask } from '../../services/useTask'; // Adjust the path as necessary

const Flip: React.FC = () => {
  const { handleStartTask } = useTask();
  const [flipDirection, setFlipDirection] = useState<string>('horizontal');

  const flipOptions = ['horizontal', 'vertical']; // Array for flip directions

  const startFlipTask = async () => {
    try {
      await handleStartTask('Flip', { flipDirection });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='tool-card'>
      <h2>Flip</h2>
      <label>Flip Direction:</label>
      {flipOptions.map((option) => (
        <div key={option}>
          <input
            type="radio"
            id={option}
            name="flipDirection"
            value={option}
            checked={flipDirection === option}
            onChange={(e) => setFlipDirection(e.target.value)}
          />
          <label htmlFor={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</label>
        </div>
      ))}
      <button onClick={startFlipTask}>Flip Image</button>
    </div>
  );
};

export default Flip;
