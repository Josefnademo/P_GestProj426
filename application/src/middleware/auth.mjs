//les imports
import jwt from "jsonwebtoken";
import { privateKey } from "./private_key.js";
import { sequelize } from "../db/sequelize.mjs";

//déclaration de la fonction auth qui va permettre de vérifier le token donné par l'utilisateur avant de laisser une requête s'executer avec la fonction next();
const verifyToken = async (req, res, next) => {
  const receivedToken = req.cookies?.auth_token ?? null;
  if (receivedToken) {
    try {
      const decoded = jwt.verify(receivedToken, privateKey);
    } catch (error) {
      console.log({ message: "token invalide ou expiré" + error });
      return res.redirect("/login");
    }
  } else {
    return res.redirect("/login");
  }
  next();
};
const verifyAdmin = async (req, res, next) => {
  const username = req.body.username;
  if (username) {
    const isAdmin = sequelize.query(
      "SELECT isAdmin FROM Comptes WHERE username = ?",
      [username]
    );
    if (isAdmin) {
      next();
    }
  }
  return res
    .status(401)
    .json("Seuls les Administrateurs peuvent accéder à cette ressource");
};
export { verifyToken, verifyAdmin };
