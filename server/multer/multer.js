import multer from 'multer';
import express from 'express';


const app = express();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'multer/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage });

export default upload;