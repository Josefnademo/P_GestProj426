import { Sequelize, DataTypes } from "sequelize";
import { CompteModel } from "../models/compte.mjs";

// Configuration de la connexion Sequelize
const sequelize = new Sequelize({
  host: "localhost",
  port: 6033,
  dialect: "mysql",
  logging: true, // Désactiver les logs Sequelize pour une console plus propre
});

// Initialisation du modèle Product
const Compte = CompteModel(sequelize, DataTypes);

// Exporter les ressources nécessaires
export { sequelize, Compte };
