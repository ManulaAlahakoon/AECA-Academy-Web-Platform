import multer from "multer";
import path from "path";
import fs from "fs";

// Set fallback if course is not yet available
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Wait for the body to be available
    setTimeout(() => {
      const course = req.body?.course;
      if (!course) {
        return cb(new Error("Course not specified"), null);
      }

      const folder = path.join("backend", "uploads", "submissions", course);
      fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    }, 0); // Defer to allow body to be parsed
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${name}_${timestamp}${ext}`);
  }
});

export const uploadSubmission = multer({ storage }).single("file");
