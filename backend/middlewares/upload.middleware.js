import fs from 'fs';
import multer from 'multer';
import path from 'path';

 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/receipts/';
    // Check if folder exists, else create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPG, PNG, and PDF files are allowed.'));
    }
    cb(null, true);
  }
});

 const storageProfilPics = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/profile_pictures/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create if it doesn’t exist
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadProfilePicture = multer({
  storage: storageProfilPics,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and GIF files are allowed.'), false);
    }
    cb(null, true);
  },
});


//export default upload;
