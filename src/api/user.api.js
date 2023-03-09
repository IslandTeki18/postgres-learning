import express from "express";
const router = express.Router();

import { createUser } from "../services/user.service.js";

router.post("/", createUser);

export { router };
