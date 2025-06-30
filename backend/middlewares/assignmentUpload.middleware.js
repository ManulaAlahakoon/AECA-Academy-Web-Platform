import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base path for assignments
const baseUploadPath = path.join(__dirname, "..", "uploads", "assignments");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const course = req.body.course;
    const uploadPath = path.join(baseUploadPath, course);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeFileName = baseName.replace(/\s+/g, "_");
    cb(null, `${safeFileName}_${timestamp}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "text/plain",
  ];
  cb(null, allowed.includes(file.mimetype));
};

export const uploadAssignment = multer({ storage, fileFilter }).single("file");