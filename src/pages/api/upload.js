import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Configure multer
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads", // Define your upload directory
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuidv4()}${ext}`);
    },
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};
function formatDate(timestamp) {
  // Ensure timestamp is parsed as a number (if it's not already)
  const parsedTimestamp = parseInt(timestamp, 10);

  // Check if parsedTimestamp is a valid number
  if (!isNaN(parsedTimestamp)) {
    const date = new Date(parsedTimestamp);
    const year = date.getUTCFullYear();
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // Months are zero-indexed
    const day = ("0" + date.getUTCDate()).slice(-2);

    return `${year}-${month}-${day}`;
  } else {
    return "Invalid Date";
  }
}
function bytesToSize(bytes) {
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

// POST /api/upload
export default async function handler(req, res) {
  try {
    // Run multer middleware to handle file upload
    const uploadMiddleware = upload.single("file");
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Extract additional file information from FormData
    const { name, size, lastModified } = req.body;

    // Log file information (optional)
    console.log("Uploaded File Info:");
    console.log("Name:", name);
    console.log("Size:", size);
    console.log("Last Modified:", lastModified);

    // If multer middleware completed without errors, respond with success
    res.status(200).json({
      message: "File uploaded successfully.",
      name,
      size: bytesToSize(size),
      uploadDate: formatDate(lastModified),
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    res
      .status(500)
      .json({ message: "Error uploading document. Please try again." });
  }
}
