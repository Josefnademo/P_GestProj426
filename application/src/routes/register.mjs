/*import express from "express";
import crypto from "crypto";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import config from "../config.mjs";
const registerRouter = express.Router();

registerRouter.post("/", (req, res) => {
  const { username, password, email } = req.body;

  const isAdmin = false;
  // Generate a salt
  const salt = crypto.randomBytes(16).toString("hex");

  // Hash the password with the salt
  crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send("Error registering user");
    }

    const hash = derivedKey.toString("hex");
    const connection = mysql.createConnection(config.dbConfig);
    connection.execute(
      "INSERT INTO t_compte (compte_id, username, email, salt, hashedPassword, isAdmin) VALUES (?, ?, ?, ?, ?, ?)",
      [null, username, email, salt, hash, isAdmin]
      [siteId, compteId, dateVisite]
    ); {
      if (err) {
        console.error("Error inserting user:", err.stack);
        return res.status(500).send("Error registering user");
      }
      console.log("User registered:", username);

      const token = jwt.sign({ username }, process.env.privateKey, {
        expiresIn: "1y",
      });
      res.cookie("authcookie", token, { httpOnly: true });

      res.redirect("/login");
    });
  });
});

export { registerRouter };*/
