import { sequelize, Compte } from "./db/sequelize.mjs";
import express from "express";
dotenv.config();
console.log(process.env);

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
