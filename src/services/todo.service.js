import { pool } from "../database.js";

// TITLE:   Get All Todos
// METHOD:  GET
// ROUTE:   /getAllTodos
// AUTH:    Public
export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await pool.query("SELECT * FROM todo;");
    if (todos.rows.length === 0) {
      return res.status(404).json({
        message: "Todos not found.",
      });
    }
    res.status(200).send(todos.rows);
  } catch (error) {
    res.status(500);
    next(error);
    throw new Error(error.stack);
  }
};

// TITLE:   Get single Todo
// METHOD:  GET
// ROUTE:   /:todo_id
// AUTH:    Public
export const getTodoDetails = async (req, res, next) => {
  try {
    const todoId = req.params.todo_id;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1;", [
      todoId,
    ]);
    if (todo.rows.length === 0) {
      return res.status(404).json("Todo Not Found!");
    }
    res.status(200).json(todo.rows[0]);
  } catch (error) {
    res.status(500);
    next(error);
    throw new Error(error.stack);
  }
};

// TITLE:   Create Todo
// METHOD:  POST
// ROUTE:   /createTodo
// AUTH:    Public
export const createTodo = async (req, res, next) => {
  try {
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *;",
      [req.body.description]
    );
    console.log(newTodo);
    res.status(200).send(newTodo.rows[0]);
  } catch (error) {
    res.status(500);
    next(error);
    throw new Error(error.stack);
  }
};

// TITLE:   Update Todo
// METHOD:  PUT
// ROUTE:   /updateTodo/:todo_id
// AUTH:    Public
export const updateTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todo_id;
    await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
      req.body.description,
      todoId,
    ]);
    res.status(200).json("Todo was updated!");
  } catch (error) {
    res.status(500);
    next(error.stack);
  }
};

// TITLE:   Delete Todo
// METHOD:  DELETE
// ROUTE:   /removeTodo/:todo_id
// AUTH:    Public
export const deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todo_id;
    const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      todoId,
    ]);
    if (todo.rowCount === 0) {
      return res.status(404).json("Item not found");
    }
    res.status(200).json("Item was removed.");
  } catch (error) {
    res.status(500);
    next(error.stack);
    throw new Error(error.stack);
  }
};
