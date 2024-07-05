import "../styles/tailwind.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DocumentUploadForm from "../components/DocumentUploadForm";
import DocumentList from "../components/DocumentList";

const HomePage = ({ initialDocuments }) => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, [currentPage, searchTerm]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        `/api/documents?page=${currentPage}&searchTerm=${searchTerm}&perPage=5`
      );
      setDocuments(response.data.documents);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleUploadSuccess = async (newDocument) => {
    try {
      await axios.post("/api/documents", newDocument);
      setDocuments([...documents, newDocument]);
      fetchDocuments();
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">
        Document Management Dashboard
      </h1>
      <DocumentUploadForm onUploadSuccess={handleUploadSuccess} />
      <DocumentList
        documents={documents}
        totalPages={totalPages}
        currentPage={currentPage}
        onSearch={handleSearch}
        onPageChange={handlePagination}
      />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(`/api/documents?page=1&searchTerm=`);
    const initialDocuments = response.data.documents;
    const totalPages = response.data.totalPages;

    return {
      props: {
        initialDocuments,
      },
    };
  } catch (error) {
    console.error("Error fetching initial documents:", error);
    return {
      props: {
        initialDocuments: [],
      },
    };
  }
}

export default HomePage;
