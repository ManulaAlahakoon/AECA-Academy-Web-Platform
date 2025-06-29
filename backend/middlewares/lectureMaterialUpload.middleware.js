import multer from "multer";
import path from "path";
import fs from "fs";

// ES Module workaround to get __dirname
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Absolute path to /uploads/LectureMaterials inside the backend directory
const baseUploadPath = path.join(__dirname, "..", "uploads", "lecturematerials");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const course = req.body.course;
    const uploadPath = path.join(baseUploadPath, course);

    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("✅ Storing file to:", uploadPath);
    cb(null, uploadPath); // Store in backend/uploads/LectureMaterials/<course>
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

export const uploadLectureMaterial = multer({ storage, fileFilter }).single("file");
