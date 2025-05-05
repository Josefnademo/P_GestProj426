import express from "express";
import config from "./config.mjs";
const app = express();

//middleWare pour cors policy
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.use("/images", express.static("images"));


import { lieuRouter } from "./routes/lieu.mjs";
app.use("/lieu/", lieuRouter);

import { loginRouter } from "./routes/login.mjs";
app.use("/login/", loginRouter);

import { registerRouter } from "./routes/register.mjs";
app.use("/register/", registerRouter);

import { adminRouter } from "./routes/admin.mjs";
app.use("/admin/", adminRouter);

import { profileRouter } from "./routes/profile.mjs";
app.use("/profile/", profileRouter);

import { visitRouter } from "./routes/visit.mjs";
app.use("/visit/", visitRouter);

app.get("/", (req, res) => {
  //res.render("accueil");
});

app.use(({ res }) => {
  const message = "ERREUR 404";
  res.status(404).json(message);
});

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});
