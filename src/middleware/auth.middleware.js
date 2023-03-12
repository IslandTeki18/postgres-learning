import jwt from "jsonwebtoken"
import { pool } from "../database.js"

const authMiddleware = async(req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).send({message:"Token is not provided"})
    }
    try {
        const decoded = await jwt.verify(token, "tokenSecret");
        const {rows} = await pool.query("SELECT * FROM users WHERE user_id = $1", [decoded.user_id])
        if (!rows[0]) {
            return res.status(400).send({message:"Token provided is invalid."})
        }
        req.user = {user_id: decoded.user_id}
        next()
    } catch (error) {
        return res.status(400).send({error: error.message})
    }
}

export {authMiddleware}