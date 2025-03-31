import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "../config.mjs";
//models
import AvisModel from "../models/avis.mjs";
import CompteModel from "../models/compte.mjs";
import LieuModel from "../models/lieu.mjs";
import PaysModel from "../models/pays.mjs";
import RegionModel from "../models/region.mjs";
import ResideModel from "../models/resider.mjs";
import EtreSitueDansModel from "../models/situeDans.mjs";
import VisiterModel from "../models/visit.mjs";
import AimeraitVisiterModel from "../models/wantToVisit.mjs";

// Configuration de la connexion Sequelize
const sequelize = new Sequelize(
  dbConfig.db_name,
  dbConfig.db_user,
  dbConfig.db_password,
  {
    host: dbConfig.db_host,
    port: dbConfig.db_port,
    dialect: dbConfig.db_dialect,
    logging: dbConfig.sequelize_log,
  }
);
const Avis = AvisModel(sequelize, DataTypes);

const Compte = CompteModel(sequelize, DataTypes);

const Lieu = LieuModel(sequelize, DataTypes);

const Pays = PaysModel(sequelize, DataTypes);

const Region = RegionModel(sequelize, DataTypes);

const Resider = ResideModel(sequelize, DataTypes);

const EtreSitueDans = EtreSitueDansModel(sequelize, DataTypes);

const Visiter = VisiterModel(sequelize, DataTypes);

const AimeraitVisiter = AimeraitVisiterModel(sequelize, DataTypes);

export {
  sequelize,
  Avis,
  Compte,
  Lieu,
  Pays,
  Region,
  Resider,
  EtreSitueDans,
  Visiter,
  AimeraitVisiter,
};
