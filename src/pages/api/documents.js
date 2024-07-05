let documents = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    const { page = 1, searchTerm = "", perPage = 5 } = req.query;

    const pageNumber = parseInt(page, 10);
    const perPageNumber = parseInt(perPage, 10);

    const startIndex = (pageNumber - 1) * perPageNumber;

    const filteredDocuments = documents.filter((doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedDocuments = filteredDocuments.slice(
      startIndex,
      startIndex + perPageNumber
    );

    const totalPages = Math.ceil(filteredDocuments.length / perPageNumber);

    res.status(200).json({ documents: paginatedDocuments, totalPages });
  } else if (req.method === "POST") {
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
