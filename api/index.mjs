import express from "express";
import authRoutes from "./routes/auth.mjs"
import userRoutes from "./routes/users.mjs"
import postRoutes from "./routes/posts.mjs"
import cors from 'cors'
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { getFileStream } from "./S3.mjs";
import fs from "fs"
import util from "util"


import multerS3 from "multer-s3"
import { S3Client } from '@aws-sdk/client-s3';

const PORT = process.env.PORT || 8000;

// .ENV CONFIGURATION
import * as dotenv from 'dotenv'
dotenv.config()

// COOKIES
import cookieParser from "cookie-parser";

// APP CONFIGURATION
const app = express();
app.set('trust proxy', 1)
app.use(cors({ credentials: true, origin: "https://blog-app-body661.vercel.app" }));

app.get("/api/uploads/:key", async (req, res) => {
    const key = req.params.key
    if (!key) {
        return
    }

    const readStream = getFileStream(key)
    readStream.pipe(res)
});

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const upload = multer({
    storage: multerS3({
        s3,
        bucket: "wezo-blog",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, uuidv4() + file.originalname);
        }
    })
})

app.post('/api/upload', upload.single('file'), function (req, res, next) {
    const file = req.file;
    res.status(200).json(file.key);
})


app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/posts', postRoutes)

app.listen(PORT, () => {
    console.log(`Listen on port`);
});