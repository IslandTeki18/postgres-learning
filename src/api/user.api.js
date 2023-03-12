import express from "express";
const router = express.Router();

import {
  createUser,
  loginUser,
  removeUser,
  getUser,
} from "../services/user.service.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

router.post("/", createUser);
router.post("/login", loginUser);
router.delete("/remove/:id", authMiddleware, removeUser);
router.get("/:id", authMiddleware, getUser);

export { router };
