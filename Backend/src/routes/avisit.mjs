import express from "express";
import mysql from "mysql2/promise";
import config from "../config.mjs";
const avisitRouter = express.Router();
const app = express();


avisitRouter.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(config.dbConfig);

    const [results] = await connection.execute(
      "SELECT * FROM t_aimeraitVisiter WHERE compte_id_fk = ? AND lieu_id_fk = ?",
      [req.body.compte_id_fk, req.body.lieu_id_fk]
    );

    if (results.length > 0) {
      return res.status(200).json(1); 
    } else {
      return res.status(200).json(0);   
    }
  } catch (err) {
    console.error("Error fetching visit data:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});


export { avisitRouter };
