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
    <div className="UploadImg">
        <h2>Upload Image</h2>
        <input type="file" onChange={handleFileChange} />
        <div className="DisplaySelectedFile">
            <DisplaySelectedFile />
        </div>
    </div>
  );

};

export default UploadImg;
