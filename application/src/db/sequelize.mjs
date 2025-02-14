import { Sequelize, DataTypes } from "sequelize";
import { CompteModel } from "../models/compte.mjs";
import {
  db_name,
  db_user,
  db_password,
  db_host,
  db_port,
  db_dialect,
  sequelize_log,
} from "../config.mjs";

// Configuration de la connexion Sequelize
const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  port: db_port,
  dialect: db_dialect,
  logging: sequelize_log,
});

// Initialisation du modèle Product
const Compte = CompteModel(sequelize, DataTypes);

// Exporter les ressources nécessaires
export { sequelize, Compte };
