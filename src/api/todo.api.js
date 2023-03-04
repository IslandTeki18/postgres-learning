import express from "express";
const router = express.Router();

// import services
import {
  getAllTodos,
  createTodo,
  updateTodo,
  getTodoDetails,
  deleteTodo,
} from "../services/todo.service.js";

router.get("/getAllTodos", getAllTodos);
router.get("/:todo_id", getTodoDetails);
router.post("/createTodo", createTodo);
router.put("/updateTodo/:todo_id", updateTodo);
router.delete("/removeTodo/:todo_id", deleteTodo);

export { router };
