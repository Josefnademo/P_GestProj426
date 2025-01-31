import { sequelize, Compte } from "./db/sequelize.mjs";
import express from "express";

dotenv.config();
console.log(process.env);

const app = express();

app.get("/", function (req, res) {
  //Connection à la DB
  sequelize
    .authenticate()
    .then((_) =>
      console.log("La connexion à la base de données a bien été établie")
    )
    .catch((error) => console.error("Impossible de se connecter à la DB"));
  res.send(`Hello ${process.env.DBNAME}`);
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
