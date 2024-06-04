import React from 'react';
import { useImageContext } from '../context/ImageContext';
import DisplaySelectedFile from './subcomponents/DisplaySelectedFile';

const UploadImg: React.FC = () => {
  const { selectedFile, setSelectedFile } = useImageContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="left-side">
      <label className="custom-file-upload">
        <input type="file" onChange={handleFileChange} />
        Choose File
      </label>   
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      <DisplaySelectedFile />
    </div>
  );
};

export default UploadImg;
