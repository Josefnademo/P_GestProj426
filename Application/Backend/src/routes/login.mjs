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

    const user = results[0];                                                        //Stores user found
    const salt = user.salt;                                                         //Stores salt of the user
    const storedHash = user.hashedPassword;                                         //Stores hashed password of the user

    crypto.pbkdf2(password, salt, 1000, 64, "sha256", (err, derivedKey) => {        //Crypto function to hash the password with the salt
      if (err) {                                                                    //1000 is the number of iterations, 64 is the length of the key,
        console.error("Error hashing password:", err);                              //sha256 is the algorithm
        return res.status(500).send("Error logging in");
      }

      const derivedHash = derivedKey.toString("hex");

      if (derivedHash === storedHash) {                                             //If hashed password is the same as the one in the database
        const token = jwt.sign({ username }, config.private_key, {                  //Sign JWT token with the user in the payload
          expiresIn: "1h",                                                          //This effectively logs the user in 
        });                                                                         //

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
