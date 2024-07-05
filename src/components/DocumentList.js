import React, { useState } from "react";

const DocumentList = ({
  documents,
  totalPages,
  currentPage,
  onSearch,
  onPageChange,
}) => {
  const [previewDocument, setPreviewDocument] = useState(null);

  const handlePreview = (document) => {
    setPreviewDocument(document);
  };

  const handleClosePreview = () => {
    setPreviewDocument(null);
  };
  return (
    <div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {documents?.map((document) => (
        <div
          key={document.id}
          className="border rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          <p className="font-semibold">Name: {document.name}</p>
          <p>Size: {document.size}</p>
          <p>Upload Date: {document.uploadDate}</p>
          <button
            onClick={() => handlePreview(document)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Preview
          </button>
        </div>
      ))}

      <div
        style={{ marginTop: "20px" }}
        className="flex justify-between items-center mt-4"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-600"
          } text-white rounded`}
        >
          Previous Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-600"
          } text-white rounded`}
        >
          Next Page
        </button>
      </div>
      {previewDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{previewDocument.name}</h3>
              <button
                onClick={handleClosePreview}
                className="text-gray-500 hover:text-gray-800 text-2xl p-2"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <h2 className="text-lg">{previewDocument.size}</h2>
              <h2 className="text-lg">{previewDocument.uploadDate}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
