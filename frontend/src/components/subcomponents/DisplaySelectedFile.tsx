import React from 'react';
import { useImageContext } from '../../context/ImageContext';

const DisplaySelectedFile: React.FC = () => {
  const { selectedFile } = useImageContext();

  if (!selectedFile) {
    return <p>No image selected</p>;
  }

  const imageUrl = URL.createObjectURL(selectedFile);

  return <img src={imageUrl} alt="Selected File" className="DisplaySelectedFile" />;

};

export default DisplaySelectedFile;
