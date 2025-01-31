import { Sequelize, DataTypes } from "sequelize";
import { CompteModel } from "../models/compte.mjs";

console.log("Dialect " + process.env.DBDIALECT);
console.log("Name " + process.env.DBNAME);
console.log("User " + process.env.DBUSER);
console.log("PWD " + process.env.DBPASSWORD);
console.log("Host " + process.env.DBHOST);
console.log("Port " + process.env.DBPORT);
console.log("Logs " + process.env.SEQUELIZELOG);

// Configuration de la connexion Sequelize
const sequelize = new Sequelize(
  process.env.DBNAME, // Nom de la DB
  process.env.DBUSER, // Nom d'utilisateur
  process.env.DBPASSWORD, // Mot de passe
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: process.env.DBDIALECT,
    logging: process.env.SEQUELIZELOG, // Désactiver les logs Sequelize pour une console plus propre
  }
);

// Initialisation du modèle Product
const Compte = CompteModel(sequelize, DataTypes);

// Exporter les ressources nécessaires
export { sequelize, Compte };
