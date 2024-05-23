import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary'
import './config.js'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:  process.env.CLOUDINARY_API_SECRET
});

// Configure Multer storage to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png' ? 'png' : null; // Set the format to png
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const cloudinaryMulter = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('File type is not supported'), false);
    }
    cb(null, true);
  },
});

export default cloudinaryMulter;