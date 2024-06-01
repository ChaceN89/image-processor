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
    <div>
        <h2>Upload Image</h2>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        <DisplaySelectedFile/>

    </div>
  );

};

export default UploadImg;
