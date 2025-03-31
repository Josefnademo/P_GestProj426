import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import config from "../config.mjs";

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const isAdmin = false;

  try {
    // Generate a salt
    const salt = crypto.randomBytes(16).toString("hex");

    // Hash the password with the salt
    const derivedKey = await new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 1000, 64, "sha256", (err, key) => {
        if (err) reject(err);
        resolve(key);
      });
    });

    const hash = derivedKey.toString("hex");

    const connection = await mysql.createConnection(config.dbConfig);
    const query =
      "INSERT INTO t_compte (username, hashedPassword, salt, isAdmin) VALUES (?, ?, ?, ?)";
    await connection.execute(query, [username, hash, salt, isAdmin]);

    const token = jwt.sign({ username }, config.private_key, {
      expiresIn: "1y",
    });
    res.json({ token });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user");
  }
});

export { registerRouter };
