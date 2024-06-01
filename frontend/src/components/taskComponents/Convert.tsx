import React, { useState } from 'react';
import { useTask } from '../../services/useTask'; // Adjust the path as necessary

const Convert: React.FC = () => {
  const { handleStartTask } = useTask();
  const [selectedFormat, setSelectedFormat] = useState<string>('');

  const conversionList = ['png', 'jpg', 'bmp', 'gif']; // Example conversion types

  const startConvertTask = async () => {
    if (!selectedFormat) {
      alert('Please select a conversion type.');
      return;
    }

    try {
      const result = await handleStartTask('Convert', { convertTo: selectedFormat });
      // alert(result.status);
    } catch (error) {
      alert(error);
    }
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
      <button onClick={startConvertTask}>Start Conversion Task</button>
    </div>
  );
};

export default Convert;
