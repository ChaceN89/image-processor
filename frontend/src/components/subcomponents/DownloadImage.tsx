import React from 'react';
import { useImageContext } from '../../context/ImageContext';
import { FaDownload } from 'react-icons/fa'; // Import react-icons

interface DownloadImageProps {
  taskId: string;
}

const DownloadImage: React.FC<DownloadImageProps> = ({ taskId }) => {
  const { getTaskById } = useImageContext();

  const handleDownload = async () => {
    const task = getTaskById(taskId);
    const url = task?.alteredImageUrl;

    if (url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = task.filename || 'downloaded_image'; // Default filename if not specified
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href); // Clean up the URL object
      } catch (error) {
        console.error(`Error downloading image: ${error}`);
      }
    } else {
      console.error(`No URL found for task: ${taskId}`);
    }
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      <FaDownload />
    </button>
  );
};

export default DownloadImage;
