import express from "express";
const router = express.Router();

import { createUser, loginUser } from "../services/user.service.js";

router.post("/", createUser);
router.post("/login", loginUser)

export { router };
