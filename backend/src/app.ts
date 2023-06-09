import express, { Request } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import blog_route from './routes/blog_route';
import user_route from './routes/user_route';
import error from './middlewares/error';
import cors from 'cors';
import multer, { FileFilterCallback } from 'multer';
import { v4 } from 'uuid';
import path from "path";
import { rootDir } from "./utils";
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');

dotenv.config();

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "apiuploads");
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
  },
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(multer({ storage: fileStorage, fileFilter }).single("profile"));
app.use("/apiuploads", express.static(path.join(rootDir, "apiuploads")));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({ country: 'USA' });
})

mongoose
  .connect(process.env.DATABSE || "")
  .then(() => {
    // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.listen(PORT, () => console.log("Server running on port "+ PORT));

    app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    app.use('/api/users', user_route);
    app.use('/api/blogs', blog_route);
    app.use(error);
  })


