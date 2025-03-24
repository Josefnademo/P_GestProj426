import mysql from "mysql2/promise";
import config from "../config.mjs";

const pool = mysql.createPool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  port: config.db_port,
  database: config.db_name,
});

const dbMiddleware = async (req, res, next) => {
  try {
    req.db = await pool.getConnection();
    await req.db.query("SELECT 1"); // Test connection
    next();
  } catch (err) {
    console.error("Database connection failed:", err);
    res.status(500).send("Database connection failed");
  } finally {
    if (req.db) req.db.release();
  }
};

export { dbMiddleware };
