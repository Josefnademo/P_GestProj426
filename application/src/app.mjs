import { sequelize, Compte } from "./db/sequelize.mjs";
import express from "express";
const port = 3000;
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
app.get("/accueil/", (req, res) => {
  res.render("accueil", { name: "utilisateur" });
});
app.use(({ res }) => {
  const message = "ERREUR 404";
  res.status(404).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
