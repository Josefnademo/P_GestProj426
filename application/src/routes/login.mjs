import express from "express";
const loginRouter = express();
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
