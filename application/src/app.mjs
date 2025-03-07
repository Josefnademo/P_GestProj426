import { sequelize, Compte } from "./db/sequelize.mjs";
import express from "express";
import port from "./config.mjs";
import path from "path";
const app = express();
app.set("view engine", "ejs");

/*app.get("/", (req, res) => {
  //res.render("accueil", { foo: "FOO" });
});*/

//Connection à la DB
/*sequelize
  .authenticate()
  .then((_) =>
    console.log("La connexion à la base de données a bien été établie")
  )
  .catch((error) => console.error("Impossible de se connecter à la DB"));


});
*/
app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.set("view engine", "ejs");

import { avisRouter } from "./routes/avis.mjs";
app.use("/avis/", avisRouter);

import { compteRouter } from "./routes/compte.mjs";
app.use("/compte/", compteRouter);

import { lieuRouter } from "./routes/lieu.mjs";
app.use("/lieu/", lieuRouter);

import { loginRouter } from "./routes/login.mjs";
app.use("/login/", loginRouter);

import { registerRouter } from "./routes/register.mjs";
app.use("/register/", registerRouter);

import { adminRouter } from "./routes/admin.mjs";
app.use("/admin/", adminRouter);

app.get("/", (req, res) => {
  //res.render("accueil");
});
/*
app.get("/", (req, res) => {
  res.redirect(`http://localhost:${port}/accueil/`);
});*/
app.use(({ res }) => {
  const message = "ERREUR 404";
  res.status(404).json(message);
});
