import React from 'react';
import { useImageContext } from '../../context/ImageContext';

const DisplaySelectedFile: React.FC = () => {
  const { selectedFile } = useImageContext();

  if (!selectedFile) {
    return <p>No image selected</p>;
  }

  const imageUrl = URL.createObjectURL(selectedFile);

  return (
    <div>
      <h3>Selected Image</h3>
      <img src={imageUrl} alt="Selected" style={{ maxWidth: '30%', height: '40%' }} />
    </div>
  );
};

export default DisplaySelectedFile;
