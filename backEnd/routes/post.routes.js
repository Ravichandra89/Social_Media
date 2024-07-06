import express from "express";
import verifyWebToken from "../middlewares/auth.middlewares.js";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

// READ
router.get("/", verifyWebToken, getFeedPosts);
router.get("/:userId/posts", verifyWebToken, getUserPosts);

// Update Post
router.patch("/:id/likes", verifyWebToken, likePost);
