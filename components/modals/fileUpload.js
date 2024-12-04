import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const CustomFileInput = () => {
  const [fileNames, setFileNames] = useState([]);
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    const imagePreviews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file), // Create a preview URL
    }));
    setImages(imagePreviews);
  };
  const clearImages = () => {
    setImages([]);
  };

  return (
    <div className="custom_file_input">
      {/* Hidden file input */}
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Custom label acting as the upload button */}
      <label
        htmlFor="fileInput"
        className="inputFile_custom"
      >
        <FiUploadCloud/>
      </label>
      {images.map((image, index) => (
          <div className="imageholder" key={index} style={{ textAlign: "left" }}>
            <img
              src={image.url}
              alt={image.name}
              style={{
                width: "70px",
                height: "40px",
                objectFit: "cover",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
            <p
              style={{
                marginTop: "5px",
                fontSize: "12px",
                wordBreak: "break-word",
                padding: "0px",
                margin:"0px"
              }}
            >
              {image.name}
            </p>
            <div onClick={()=>clearImages()} className="close">X</div>
          </div>
        ))}
    </div>
  );
};

export default CustomFileInput;
