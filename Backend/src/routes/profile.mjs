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

profileRouter.patch("/:id", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, config.private_key);
    const username = decoded.username;
    const { newUsername, newPassword } = req.body;

    const connection = await mysql.createConnection(config.dbConfig);
    const [results] = await connection.execute(
      "SELECT * FROM t_compte WHERE username = ?",
      [username]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const user = results[0];
      const salt = user.salt;

      let updates = [];
      let values = [];

      // Puts in the parameters the new values if they are not undefined or null
      // Does this for everything
      if (newUsername && typeof newUsername === "string") {
        updates.push("username = ?");
        values.push(newUsername);
      }

      if (newPassword && typeof newPassword === "string") {
        const newHash = await new Promise((resolve, reject) => {
          crypto.pbkdf2(newPassword, salt, 1000, 64, "sha256", (err, key) => {
            if (err) reject(err);
            resolve(key.toString("hex"));
          });
        });
        if (newHash) {
          updates.push("hashedPassword = ?");
          values.push(newHash);

          updates.push("salt = ?");
          values.push(salt);
        }
      }

      if (updates.length === 0) {
        console.log("No fields to update");
        return res.status(400).json({ message: "No fields to update" });
      }

      values.push(user.compte_id);

      console.log(
        "Query:",
        `UPDATE t_compte SET ${updates.join(", ")} WHERE compte_id = ?`
      );
      console.log("Values:", values);

      if (values.some((value) => value === undefined || value === null)) {
        console.error(
          "Unexpected undefined or null value in query parameters:",
          values
        );
        return res.status(500).json({
          message: "Unexpected undefined or null value in query parameters",
        });
      }

      const query = `UPDATE t_compte SET ${updates.join(
        ", "
      )} WHERE compte_id = ?`;

      const [updateResult] = await connection.execute(query, values);

      let newToken = token; // Default token c'est le vieux
      if (newUsername) {
        newToken = jwt.sign({ username: newUsername }, config.private_key, {
          expiresIn: "1h",
        });
      }

      return res.status(200).json({
        message: "Profile updated successfully",
        token: newToken,
      });
    }
  } catch (err) {
    console.error("Error updating user profile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//WIP not done yet
profileRouter.delete("/:id", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, config.private_key);
    const username = decoded.username;
    const { id } = req.params;

    const connection = await mysql.createConnection(config.dbConfig);
    const [results] = await connection.execute(
      "SELECT * FROM t_compte WHERE username = ?",
      [username]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const user = results[0];

      if (parseInt(id, 10) !== user.compte_id) {
        return res.status(403).json({ message: "Forbidden: ID mismatch" });
      }

      await connection.execute("DELETE FROM t_compte WHERE compte_id = ?", [
        user.compte_id,
      ]);

      return res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting user profile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { profileRouter };
