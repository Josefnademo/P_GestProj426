import { sequelize, Compte } from "./db/sequelize.mjs";

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
import express from "express";

const app = express();
const port = 3000;
app.use(express.json());
app.set("view engine", "ejs");
import { avisRouter } from "./routes/avis.mjs";
app.use("/avis/", avisRouter);

import { compteRouter } from "./routes/compte.mjs";
app.use("/compte/", compteRouter);

import { lieuRouter } from "./routes/lieu.mjs";
app.use("/lieu/", lieuRouter);

app.get("/", (req, res) => {
  res.render("accueil", { name: "antoine" });
});
/*
app.get("/", (req, res) => {
  res.redirect(`http://localhost:${port}/accueil/`);
});*/

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
