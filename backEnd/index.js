import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.controllers.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import { createPost } from "./controllers/post.controllers.js";
import verifyWebToken from "./middlewares/auth.middlewares.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { posts, users } from "./Data/Data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure all the packages
const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Storage Configuration
const storageMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storageMulter });

// SetUp MongoDB DataBase
const port = process.env.PORT || 5001;

app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyWebToken, upload.single("picture"), createPost);

// Routes
app.post("/auth", authRoutes);
app.post("/auth", userRoutes);
app.post("/auth", postRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Server is running On : ${port}`);

      // Insert Users & Posts Data
      User.insertMany(users);
      Post.insertMany(posts);
    });
  } catch (error) {
    console.error("ERROR : While DB connection !!", error.message);
  }
};

connectDB();
