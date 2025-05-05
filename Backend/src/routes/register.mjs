import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import config from "../config.mjs";
const regex = /^[^@]+@[^@]+\.[^@]+$/;
const registerRouter = express.Router();

//POST to register a new user
registerRouter.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  const isAdmin = false;

  try {
    const salt = crypto.randomBytes(16).toString("hex");                                      //Generate a random 16 bit salt

    const derivedKey = await new Promise((resolve, reject) => {                               //Hash the password with the salt
      crypto.pbkdf2(password, salt, 1000, 64, "sha256", (err, key) => {                       //Crypto function to hash the password
        if (err) reject(err);                                                                 //1000 is the number of iterations, 64 is the length of the key, 
        resolve(key);                                                                         //sha256 is the algorithm
      });
    });

     const hash = derivedKey.toString("hex");
    if (regex.test(email)) {
      console.log("Email valide");
    } else {
      console.log("Email invalide");
      return res.status(500).json({
        message: "Vous devez entrer une email valide contenant un @ et un .",
      });
    }
    const connection = await mysql.createConnection(config.dbConfig);
    const query =                                                                                         //Run the query
      "INSERT INTO t_compte (username, hashedPassword, salt, isAdmin, email) VALUES (?, ?, ?, ?, ?)";     //
    await connection.execute(query, [username, hash, salt, isAdmin, email]);                    

    /*    const query = "INSERT INTO t_compte (username, hashedPassword, salt, email) VALUES (?, ?, ?, ?)";
await connection.execute(query, [username, hash, salt, email]); */
    const token = jwt.sign({ username }, config.private_key, {                                //Make a JWT token with the user in the payload
      expiresIn: "1y",                                                                        //
    });                                                                                       //
    res.json({ token });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user");
  }
});

export { registerRouter };
