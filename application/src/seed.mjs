import { Sequelize } from "sequelize";
import { readFileSync } from "fs";
import path from "path";
import { sequelize } from "./db/sequelize.mjs";
import { LieuModel } from "./models/lieu.mjs";
import { PaysModel } from "./models/pays.mjs";
import { RegionModel } from "./models/region.mjs";
import { EtreSitueDansModel } from "./models/situéDans.mjs";
import { CompteModel } from "./models/compte.mjs";
import { AvisModel } from "./models/avis.mjs";
import { VisiterModel } from "./models/visit.mjs";
import { AimeraitVisiterModel } from "./models/wantToVisit.mjs";
import { ResideModel } from "./models/résider.mjs";

const Lieu = LieuModel(sequelize, Sequelize.DataTypes);
const Pays = PaysModel(sequelize, Sequelize.DataTypes);
const Region = RegionModel(sequelize, Sequelize.DataTypes);
const SituéDans = EtreSitueDansModel(sequelize, Sequelize.DataTypes);
const Compte = CompteModel(sequelize, Sequelize.DataTypes);
const Avis = AvisModel(sequelize, Sequelize.DataTypes);
const Visit = VisiterModel(sequelize, Sequelize.DataTypes);
const WantToVisit = AimeraitVisiterModel(sequelize, Sequelize.DataTypes);
const Résider = ResideModel(sequelize, Sequelize.DataTypes);

const seedDatabase = async () => {
  try {
    // Sync tables in the correct order
    await Pays.sync({ alter: true });
    await Region.sync({ alter: true });
    await Lieu.sync({ alter: true });
    await SituéDans.sync({ alter: true });
    await Compte.sync({ alter: true });
    await Avis.sync({ alter: true });
    await Visit.sync({ alter: true });
    await WantToVisit.sync({ alter: true });
    await Résider.sync({ alter: true });

    const filePath = path.resolve("src/P_DEV-UNESCO_world-heritage-list.json");
    const rawData = readFileSync(filePath, "utf-8");
    const mockData = JSON.parse(rawData);

    console.log("🌍 Début de l'importation des données UNESCO...");

    for (const item of mockData) {
      // Vérifier si le pays existe déjà
      const [pays] = await Pays.findOrCreate({
        where: { nom: item.states.join(", ") },
      });

      // Vérifier si la région existe déjà
      const [region] = await Region.findOrCreate({
        where: { nom: item.region },
      });

      // Vérifier si les coordonnées sont présentes
      if (!item.coordinates?.lat || !item.coordinates?.lon) {
        console.warn(`⚠️ Coordonnées manquantes pour le site: ${item.site}`);
        continue; // Skip this item if coordinates are missing
      }

      // Créer un lieu et l'associer au pays et à la région
      const lieu = await Lieu.create({
        nom: item.site,
        particularite: item.short_description,
        histoire: item.long_description || item.short_description,
        latitude: item.coordinates.lat,
        longitude: item.coordinates.lon,
        pays_id_fk: pays.pays_id,
      });

      // Associer le lieu à la région
      await SituéDans.create({
        lieu_id_fk: lieu.lieu_id,
        pays_id_fk: pays.pays_id,
      });
    }

    console.log("✅ Données UNESCO insérées avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors de l'insertion des données :", error);
    process.exit(1);
  }
};

// Exécuter la fonction
seedDatabase();
