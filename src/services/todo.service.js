import { pool } from "../database.js";

// DESC:    Get All Todos
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

// DESC:    Get single Todo
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

// DESC:    Create Todo
// METHOD:  POST
// ROUTE:   /createTodo
// AUTH:    Public
export const createTodo = async (req, res, next) => {
  try {
    const {
      description,
      due_date,
      assigned_to,
      is_complete,
      is_important,
      title,
      tag_id,
    } = req.body;

    const newTodo = await pool.query(
      "INSERT INTO todo(description, due_date, assigned_to, is_complete, is_important, title, tag_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [
        description,
        due_date,
        assigned_to,
        is_complete,
        is_important,
        title,
        tag_id,
      ]
    );
    res.status(200).send(newTodo.rows[0]);
  } catch (error) {
    res.status(500);
    next(error);
    throw new Error(error.stack);
  }
};

// DESC:    Update Todo
// METHOD:  PUT
// ROUTE:   /updateTodo/:todo_id
// AUTH:    Public
export const updateTodo = async (req, res, next) => {
  try {
    const todoId = req.params.todo_id;
    const {
      description,
      due_date,
      assigned_to,
      is_complete,
      is_important,
      title,
      tag_id,
    } = req.body;

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      todoId,
    ]);
    if (todo.rowCount === 0) {
      return res.status(404).json("Todo not found");
    }

    await pool.query(
      "UPDATE todo SET description = $2, due_date = $3, assigned_to = $4, is_complete = $5, is_important = $6, title = $7, tag_id = $8 WHERE todo_id = $1",
      [
        todoId,
        description ? description : todo.rows[0].description,
        due_date ? due_date : todo.rows[0].due_date,
        assigned_to ? assigned_to : todo.rows[0].assigned_to,
        is_complete ? is_complete : todo.rows[0].is_complete,
        is_important ? is_important : todo.rows[0].is_important,
        title ? title : todo.rows[0].title,
        tag_id ? tag_id : todo.rows[0].tag_id,
      ]
    );
    res.status(200).json("Todo was updated!");
  } catch (error) {
    res.status(500);
    next(error.stack);
  }
};

// DESC:    Delete Todo
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
