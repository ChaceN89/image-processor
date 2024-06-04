
import React from 'react';

interface LoaderProps {
  progress?: number;
  message?: string;
  operation?: string;
}

const Loader: React.FC<LoaderProps> = ({ operation ="", progress = 0, message = 'In Progress...' }) => {
  // Validate percentage (optional, for better UX)
  if (progress !== undefined && (progress < 0 || progress > 100)) {
    console.warn('Loader percentage must be between 0 and 100.');
    progress = Math.max(0, Math.min(100, progress)); // Clamp to valid range
  }

 
  return(
    <div className='loading-box'>
      <h4>{operation} Image</h4>
      <h5>{message}</h5>
      <div className="progress-container">
        <div className="progress-value">{progress} %</div>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
};

export default Loader;