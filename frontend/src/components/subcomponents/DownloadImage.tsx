import React from 'react';
import { FaDownload } from 'react-icons/fa'; // Import react-icons

interface DownloadImageProps {
  taskId: string;
}

const DownloadImage: React.FC<DownloadImageProps> = ({ taskId }) => {
  const handleDownload = () => {
    // Placeholder for download logic
    console.log(`Download image for task: ${taskId}`);
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      <FaDownload />
    </button>
  );
};

export default DownloadImage;
