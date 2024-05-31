import React, { useState } from "react";
import { LuFileUp } from "react-icons/lu";
import { useSelector } from "react-redux";
import "./FileUploader.css";

const CustomFileUploader = () => {
  const BackgroundColor = useSelector((state) => state.theme.BackgroundColor);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 3 * 1024 * 1024; // 3 MB in bytes
      const allowedExtensions = ['svg', 'png', 'jpg', 'gif'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (file.size > maxSize) {
        alert("File size is too large. Please select a file under 3 MB.");
      } else if (!allowedExtensions.includes(fileExtension)) {
        alert("Invalid file format. Please select a file with extension: SVG, PNG, JPG, or GIF.");
      } else {
        setSelectedFile(file);
        console.log("File selected:", file);
      }
    }
  };

  return (
    <div className="parent-File-uploader">
      <span className="icon">
        <LuFileUp
          stroke={BackgroundColor}
          style={{ cursor: "pointer" }}
        />
      </span>
      <div className="uploader-parent-text">
        <label
          className="uploader-click-text"
          style={{ color: BackgroundColor }}
        >
          Click to upload the icon
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".svg, .png, .jpg, .gif" 
          />
        </label>
        <div className="uploader-drag"> or drag and drop </div>
      </div>
      {selectedFile && (
        <div className="uploaded-file-info">
        <div className="uploaded-file-name">
          File uploaded: {selectedFile.name} 
          </div>

          <span className="uploaded-file-size">
          (Size: {formatBytes(selectedFile.size)})
          </span>
        </div>
      )}

      <span className="uploader-SVG"> SVG, PNG, JPG, or GIF (max. 3MB) </span>
    </div>
  );
};

// Helper function to format bytes into human-readable size
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));
  return Math.round((bytes / Math.pow(k, i))) + ' ' + sizes[i];
}

export default CustomFileUploader;
