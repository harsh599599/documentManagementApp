import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { formatDate, bytesToSize } from "@/utils/utils";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
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

export default async function handler(req, res) {
  try {
    const uploadMiddleware = upload.single("file");
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const { name, size, lastModified } = req.body;
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
