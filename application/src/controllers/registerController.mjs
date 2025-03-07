const express = require("express");
const registerRouter = express.Router();
const crypto = require("crypto");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

registerRouter.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Generate a salt
  const salt = crypto.randomBytes(16).toString("hex");

  // Hash the password with the salt
  crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send("Error registering user");
    }

    const hash = derivedKey.toString("hex");

    const query = "INSERT INTO t_users (username, hash, sel) VALUES (?, ?, ?)";
    connection.query(query, [username, hash, salt], (err, results) => {
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

module.exports = registerRouter;
