import express from "express";
const router = express.Router();

import { createUser, loginUser, removeUser } from "../services/user.service.js";

router.post("/", createUser);
router.post("/login", loginUser);
router.delete("/remove/:id", removeUser);

export { router };
