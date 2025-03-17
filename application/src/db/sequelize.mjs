import { Sequelize, DataTypes } from "sequelize";
import { CompteModel } from "../models/compte.mjs";
import config from "../config.mjs";

// Configuration de la connexion Sequelize
const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_password,
  {
    host: config.db_host,
    port: config.db_port,
    dialect: config.db_dialect,
    logging: config.sequelize_log,
  }
);

// Initialisation du modèle Product
const Compte = CompteModel(sequelize, DataTypes);

// Exporter les ressources nécessaires
export { sequelize, Compte };
