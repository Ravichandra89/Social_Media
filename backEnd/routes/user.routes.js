import express from "express";
import {
  GetUser,
  GetUserFriends,
  addRemoveUser,
} from "../controllers/user.controllers.js";
import verifyWebToken from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Read Operations
router.get("/:id", verifyWebToken, GetUser);
router.get("/:id/friendId", verifyWebToken, GetUserFriends);

// Update operation
router.patch("/:id/:friendId", verifyWebToken, addRemoveUser);

export default router;
