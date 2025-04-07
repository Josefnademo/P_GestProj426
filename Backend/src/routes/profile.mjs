import express from "express";
import config from "../config.mjs";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const profileRouter = express.Router();

//Get the profile of the user with the id in the url 
profileRouter.get("/:id", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];          //Get JWT token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, config.private_key);            //Check token and find user of the token
    const username = decoded.username;                                //
    const connection = await mysql.createConnection(config.dbConfig); //
    const [results] = await connection.execute(                       //
      "SELECT * FROM t_compte WHERE username = ?",                    //
      [username]                                                      //
    );                                                                
    if (results.length === 0) {                                       //If user not found or token doesnt correspond 
      return res.status(400).json({ message: "User not found" });     //
    } else {
      const user = results[0];
      return res.status(200).json({                                   //If token is fine and user exists, return information 
        id: user.id,                                                  //
        username: user.username,                                      //
        hashedPassword: user.hashedPassword,                          //
        email: user.email,
      });
    }
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//PATCH the user with arguments in the request
//This request can be executed with a new username, a new password, or both
profileRouter.patch("/:id", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];          //Get token from header
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, config.private_key);            //Check token and find user of the token        
    const username = decoded.username;                                //
    const { newUsername, newPassword } = req.body;                    //
    const connection = await mysql.createConnection(config.dbConfig); //
    const [results] = await connection.execute(                       //
      "SELECT * FROM t_compte WHERE username = ?",                    //
      [username]                                                      //
    );
    if (results.length === 0) {                                       //If user not found or token doesnt correspond 
      return res.status(404).json({ message: "User not found" });     //
    } else {
      const user = results[0];                                        //Put user in variable
      const salt = user.salt;                                         //Put salt in variable

      let updates = [];                                               //Empty array for the updates
      let values = [];                                                //Empty array for the values

      if (newUsername && typeof newUsername === "string") {           //If user is an argument in the request
        updates.push("username = ?");                                 //Add the argument of the username to the command that will be run
        values.push(newUsername);                                     //Add the value of the username to the command that will be run
      }

      if (newPassword && typeof newPassword === "string") {           //If password is an argument in the request
        const newHash = await new Promise((resolve, reject) => {
          crypto.pbkdf2(newPassword, salt, 1000, 64, "sha256", (err, key) => {
            if (err) reject(err);
            resolve(key.toString("hex"));
          });
        });
        if (newHash) {
          updates.push("hashedPassword = ?");                           //Add the argument of the password to the command that will be run
          values.push(newHash);                                         //Add the value of the password to the command that will be run

          updates.push("salt = ?");                                     //Add the argument of the salt to the command that will be run
          values.push(salt);                                            //Add the value of the salt to the command that will be run
        }
      }
      if (updates.length === 0) {
        console.log("No fields to update");
        return res.status(400).json({ message: "No fields to update" });
      }
      values.push(user.compte_id);                                      //Add the id of the user to the command that will be run

      if (values.some((value) => value === undefined || value === null)) {
        console.error(
          "Unexpected undefined or null value in query parameters:",
          values
        );
        return res.status(500).json({
          message: "Unexpected undefined or null value in query parameters",
        });
      }

      const query = `UPDATE t_compte SET ${updates.join(                //Joins the command with the arguments and values previously defined
        ", "                                                            //
      )} WHERE compte_id = ?`;                                          //

      const [updateResult] = await connection.execute(query, values);   //Runs the command

      let newToken = token;                                             //Default to the old token, becuase user is not nessesaraly changing  

      if (newUsername) {                                                //If user is changing, make new JWT
        newToken = jwt.sign({ username: newUsername },                  //
          config.private_key, {                                         //
          expiresIn: "1h",                                              //
        });                                                             //
      }                                                                 //

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

//DELETE a user
profileRouter.delete("/:id", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];            //Get token from header
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {                                                 
    const decoded = jwt.verify(token, config.private_key);              //Verify token and find user of the token
    const username = decoded.username;                                  //
    const { id } = req.params;                                          //
    const connection = await mysql.createConnection(config.dbConfig);   //
    const [results] = await connection.execute(                         //
      "SELECT * FROM t_compte WHERE username = ?",                      //
      [username]                                                        //
    );                                                                  //

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const user = results[0];

      if (parseInt(id, 10) !== user.compte_id) {                        
        return res.status(403).json({
          message: "Forbidden: ID mismatch"                       
        });
      }

      await connection.execute(                                           //Run the command to delete user
        "DELETE FROM t_compte WHERE compte_id = ?", [                     //
        user.compte_id,                                                   //
      ]);                                                                 //

      return res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting user profile:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { profileRouter };
