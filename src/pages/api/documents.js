let documents = [
  { id: 1, name: "Document 1", size: "1 MB", uploadDate: "2024-07-05" },
  { id: 2, name: "Document 2", size: "2 MB", uploadDate: "2024-07-05" },
  { id: 3, name: "Document 3", size: "3 MB", uploadDate: "2024-07-05" },
  // Add more documents as needed
];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Handle GET request to fetch paginated and filtered documents
    const { page = 1, searchTerm = "", perPage = 5 } = req.query;

    // Convert page and perPage to integers
    const pageNumber = parseInt(page, 10);
    const perPageNumber = parseInt(perPage, 10);

    // Calculate startIndex based on pagination
    const startIndex = (pageNumber - 1) * perPageNumber;

    // Filter documents by searchTerm (case-insensitive)
    const filteredDocuments = documents.filter((doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Slice documents based on startIndex and perPage
    const paginatedDocuments = filteredDocuments.slice(
      startIndex,
      startIndex + perPageNumber
    );

    // Calculate totalPages
    const totalPages = Math.ceil(filteredDocuments.length / perPageNumber);

    res.status(200).json({ documents: paginatedDocuments, totalPages });
  } else if (req.method === "POST") {
    // Handle POST request to add a new document
    const { name, size, uploadDate } = req.body;
    const newDocument = {
      id: documents.length + 1,
      name,
      size,
      uploadDate,
    };

    documents.push(newDocument);

    res
      .status(201)
      .json({ message: "Document added successfully", newDocument });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
