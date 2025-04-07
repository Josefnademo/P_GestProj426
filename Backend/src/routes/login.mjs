import express from "express";
import crypto from "crypto";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import config from "../config.mjs";

const loginRouter = express.Router();

//POST to login a user
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;                                          //Get the arguments from the request body

  try {
    const connection = await mysql.createConnection(config.dbConfig);

    const [results] = await connection.execute(                                     //Search for user entered
      "SELECT * FROM t_compte WHERE username = ?",                                  //
      [username]                                                                    //
    );                                                                              //

    if (results.length === 0) {                                                     //If nothing is found
      return res.status(400).send("Invalid username or password");                  //
    }                                                                               //

    const user = results[0];
    const salt = user.salt;
    const storedHash = user.hashedPassword;

    crypto.pbkdf2(password, salt, 1000, 64, "sha256", (err, derivedKey) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Error logging in");
      }

      const derivedHash = derivedKey.toString("hex");

      if (derivedHash === storedHash) {
        const token = jwt.sign({ username }, config.private_key, {
          expiresIn: "1h",
        });

        res.json({ token });
      } else {
        res.status(400).send("Invalid username or password");
      }
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Error logging in");
  }
});

export { loginRouter };
