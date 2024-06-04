import React from 'react';
import { useImageContext } from '../../context/ImageContext';

const DisplaySelectedFile: React.FC = () => {
  const { selectedFile } = useImageContext();

  if (!selectedFile) {
    return <p>No image selected</p>;
  }

  const imageUrl = URL.createObjectURL(selectedFile);

  return (
    <div className="left-image-box">
      <img src={imageUrl} alt="Selected File" className="DisplaySelectedFile" />
    </div>
  )
};

export default DisplaySelectedFile;
