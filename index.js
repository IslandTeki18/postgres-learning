import express from "express";
import cors from "cors";
import { router as TodoRoutes } from "./src/api/todo.api.js";
import { router as UserRoutes } from "./src/api/user.api.js";
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Todo CRUD
app.use("/api/todo", TodoRoutes);

// User CRUD
app.use("/api/user", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
