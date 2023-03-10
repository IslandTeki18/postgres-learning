import { pool } from "../database.js";
import { Helper } from "../utils/Helper.js";

// DESC:    Create User
// METHOD:  POST
// ROUTE:   /
// AUTH:    Public
const createUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!email || !username) {
      return res.status(400).json({ message: "Some values are missing." });
    }
    if (!Helper.isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Enter in a vaild email address" });
    }
    const hashPassword = Helper.hashPassword(password);
    const { rows } = await pool.query(
      "INSERT INTO users(username, password, email, created_on, last_login) VALUES($1, $2, $3, $4, $5) RETURNING *;",
      [
        username,
        hashPassword,
        email,
        new Date().toDateString(),
        new Date().toDateString(),
      ]
    );
    const token = Helper.generateToken(rows[0].user_id);
    return res.status(201).send({ token });
  } catch (error) {
    if (error.constraint === "users_email_key") {
      return res
        .status(400)
        .json({ message: "User with that EMAIL already exists." });
    }
    if (error.constraint === "users_username_key") {
      return res
        .status(400)
        .json({ message: "User with that USERNAME already exists." });
    }
    return res.status(400).json({ message: error.message });
  }
};

// DESC:    Login User
// METHOD:  POST
// ROUTE:   /login
// AUTH:    Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "Some values are missing" });
    }
    if (!Helper.isValidEmail(email)) {
      return res
        .status(400)
        .send({ message: "Please enter a valid email address" });
    }
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);
    if (!rows[0]) {
      return res
        .status(400)
        .send({ message: "The credentials you provided are incorrect" });
    }
    if (!Helper.comparePassword(rows[0].password, password)) {
      return res
        .status(400)
        .send({ message: "The credentials you provided are incorrect" });
    }
    const token = Helper.generateToken(rows[0].user_id);
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

// DESC:    Get User Information
// METHOD:  GET
// ROUTE:   /user/:id
// AUTH:    Private
const getUser = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [req.params.id]
    );
    if (!rows[0]) {
      return res.status(404).send({ message: "No user found." });
    }
    return res.status(200).send(rows[0]);
  } catch (error) {
    return res.status(400).send({error: error.message})
  }
};

// DESC:    Update User Information
// METHOD:  PUT
// ROUTE:   /user/:id
// AUTH:    Private

// DESC:    Delete User
// METHOD:  DELETE
// ROUTE:   /user/:id/remove
// AUTH:    Private
const removeUser = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *;",
      [req.params.id]
    );
    if (!rows[0]) {
      return res.status(404).send({ message: "User not found." });
    }
    return res.status(204).send({ message: "User deleted." });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export { createUser, loginUser, removeUser, getUser };
