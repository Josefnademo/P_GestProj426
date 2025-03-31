import express from "express";
import config from "../config.mjs";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const profileRouter = express.Router();

//This code is literally the same as the one in login but it returns information

profileRouter.get("/:id", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, config.private_key);
    const username = decoded.username;
    const connection = await mysql.createConnection(config.dbConfig);
    const [results] = await connection.execute(
      "SELECT * FROM t_compte WHERE username = ?",
      [username]
    );
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const user = results[0];
      return res.status(200).json({
        id: user.id,
        username: user.username,
        hashedPassword: user.hashedPassword,
      });
    }
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { profileRouter };
