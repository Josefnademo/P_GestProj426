const express = require("express");
const loginRouter = express.Router();

const connection = mysql.createConnection({
  host: "db_container",
  user: "root",
  password: "root",
  port: 3306,
  database: "p_app",
});

loginRouter.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM t_users WHERE username = ?";
  connection.query(query, [username], (err, results) => {
    if (!results) {
      return res.status(400).send("Invalid username or password");
    }

    const user = results[0];
    const salt = user.sel;
    const storedHash = user.hash;

    // Re hash
    crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Error logging in");
      }
      const hash = derivedKey.toString("hex");
      if (hash === storedHash) {
        console.log("User logged in:", username, "Toekn:", token);
        res.redirect("..");
      } else {
        res.status(400).send("Invalid username or password");
      }
    });
  });
});

module.exports = loginRouter;
