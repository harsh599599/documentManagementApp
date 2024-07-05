import React, { useState } from "react";
import axios from "axios";
const allowedFileTypes = ["application/pdf", "image/png", "image/jpeg"];
const DocumentUploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }
    if (!allowedFileTypes.includes(file.type)) {
      setError(
        "Unsupported file type. Please upload a PDF, PNG, or JPEG file."
      );
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("size", file.size);
    formData.append("lastModified", file.lastModified);

    try {
      setUploading(true);
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUploadSuccess(response.data);
      setFile(null);
      setError(null);
    } catch (error) {
      console.error("Error uploading document:", error);
      setError("Error uploading document. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Choose File:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default DocumentUploadForm;
