import express from "express";
const loginRouter = express.Router();

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

loginRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
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

    const query =
      "INSERT INTO t_users (username, hash, sel, isAdmin) VALUES (?, ?, ?, ?)";
    connection.query(query, [username, hash, salt, isAdmin], (err, results) => {
      if (err) {
        console.error("Error inserting user:", err.stack);
        return res.status(500).send("Error registering user");
      }

      const token = jwt.sign({ username }, process.env.privateKey, {
        expiresIn: "1y",
      });
      console.log("User registered:", username, "Toekn:", token);
      res.cookie("authcookie", token, { httpOnly: true });
      console.log("Cookie set:", req.cookies.authcookie);
      res.redirect("/login");
    });
  });
});

export { loginRouter };
