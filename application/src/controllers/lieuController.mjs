import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

// Configuration de la connexion à la base de données
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_unesco",
};

// Middleware pour vérifier si l'utilisateur est admin
/*const isAdmin = (req, res, next) => {
  const admin = req.user && req.user.isAdmin;
  if (admin) {
    return next();
  }
  return res.status(403).json({ message: "Accès refusé, administrateur requis." });
};*/

// GET /site/:id - Récupérer les informations d'un site
router.get("/site/:id", async (req, res) => {
  const siteId = req.params.id;
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM t_lieu WHERE lieu_id = ?",
      [siteId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Site non trouvé." });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des informations.",
      error,
    });
  } finally {
    await connection.end();
  }
});

// POST /site/:id - Ajouter un site à la liste "à visiter"
router.post("/site/:id/visiter", async (req, res) => {
  const siteId = req.params.id;
  const compteId = req.body.compte_id; // A check si c'est compteID
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      "INSERT INTO t_visiter (lieu_id_fk, compte_id_fk) VALUES (?, ?)",
      [siteId, compteId]
    );
    res.json({
      message: `Site avec l'ID ${siteId} ajouté à la liste "à visiter"`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout à la liste.", error });
  } finally {
    await connection.end();
  }
});

// POST /site/:id/visite - Ajouter un site à la liste "visité"
router.post("/site/:id/visite", async (req, res) => {
  const siteId = req.params.id;
  const compteId = req.body.compte_id; // A check si c'est compteID
  const dateVisite = req.body.date_visite; // A check ceci aussi
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      "INSERT INTO t_visiter (lieu_id_fk, compte_id_fk, date_visite) VALUES (?, ?, ?)",
      [siteId, compteId, dateVisite]
    );
    res.json({
      message: `Site avec l'ID ${siteId} ajouté à la liste "visité"`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout à la liste.", error });
  } finally {
    await connection.end();
  }
});

// DELETE /site/:id/visite - Enlever un site de la liste "visité"
router.delete("/site/:id/visite", async (req, res) => {
  const siteId = req.params.id;
  const compteId = req.body.compte_id; // A check si c'est compteID
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      "DELETE FROM t_visiter WHERE lieu_id_fk = ? AND compte_id_fk = ?",
      [siteId, compteId]
    );
    res.json({
      message: `Site avec l'ID ${siteId} enlevé de la liste "visité"`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la liste.", error });
  } finally {
    await connection.end();
  }
});

// DELETE /site/:id/a-visiter - Enlever un site de la liste "à visiter"
router.delete("/site/:id/a-visiter", async (req, res) => {
  const siteId = req.params.id;
  const compteId = req.body.compte_id; // A check si c'est compteID
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      "DELETE FROM t_aimeraitVisiter WHERE lieu_id_fk = ? AND compte_id_fk = ?",
      [siteId, compteId]
    );
    res.json({
      message: `Site avec l'ID ${siteId} enlevé de la liste "à visiter"`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la liste.", error });
  } finally {
    await connection.end();
  }
});

// POST /site/:id - Ajouter un site (admin seulement)
router.post("/site", isAdmin, async (req, res) => {
  const { nom, longitude, latitude, particularite } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [result] = await connection.execute(
      "INSERT INTO t_lieu (nom, longitude, latitude, particularite) VALUES (?, ?, ?, ?)",
      [nom, longitude, latitude, particularite]
    );
    res
      .status(201)
      .json({ message: `Site ajouté avec l'ID ${result.insertId}` });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du site.", error });
  } finally {
    await connection.end();
  }
});

// PATCH /site/:id - Modifier des informations d'un site (admin seulement)
router.patch("/site/:id", isAdmin, async (req, res) => {
  const siteId = req.params.id;
  const { nom, longitude, latitude, particularite } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      "UPDATE t_lieu SET nom = ?, longitude = ?, latitude = ?, particularite = ? WHERE lieu_id = ?",
      [nom, longitude, latitude, particularite, siteId]
    );
    res.json({ message: `Informations du site avec l'ID ${siteId} modifiées` });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la modification des informations.",
      error,
    });
  } finally {
    await connection.end();
  }
});

// DELETE /site/:id - Supprimer un site (admin seulement)
router.delete("/site/:id", isAdmin, async (req, res) => {
  const siteId = req.params.id;
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute("DELETE FROM t_lieu WHERE lieu_id = ?", [siteId]);
    res.json({ message: `Site avec l'ID ${siteId} supprimé` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du site.", error });
  } finally {
    await connection.end();
  }
});

// POST /site/:id/comment - Poster un commentaire sous un site
router.post("/site/:id/comment", async (req, res) => {
  const siteId = req.params.id;
  const { compte_id, commentaire, rating } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      "INSERT INTO t_avis (commentaire, rating, lieu_id_fk, compte_id_fk) VALUES (?, ?, ?, ?)",
      [commentaire, rating, siteId, compte_id]
    );
    res.json({ message: `Commentaire ajouté au site avec l'ID ${siteId}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout du commentaire.", error });
  } finally {
    await connection.end();
  }
});

// PATCH /site/:id/comment/:commentId - Modifier un commentaire (admin seulement)
router.patch("/site/:id/comment/:commentId", isAdmin, async (req, res) => {
  const siteId = req.params.id;
  const commentId = req.params.commentId;
  const { commentaire, rating } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      "UPDATE t_avis SET commentaire = ?, rating = ? WHERE avis_id = ? AND lieu_id_fk = ?",
      [commentaire, rating, commentId, siteId]
    );
    res.json({
      message: `Commentaire avec l'ID ${commentId} modifié pour le site avec l'ID ${siteId}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la modification du commentaire.",
      error,
    });
  } finally {
    await connection.end();
  }
});

// DELETE /site/:id/comment/:commentId - Supprimer un commentaire (admin seulement)
router.delete("/site/:id/comment/:commentId", isAdmin, async (req, res) => {
  const siteId = req.params.id;
  const commentId = req.params.commentId;
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.execute(
      "DELETE FROM t_avis WHERE avis_id = ? AND lieu_id_fk = ?",
      [commentId, siteId]
    );
    res.json({
      message: `Commentaire avec l'ID ${commentId} supprimé pour le site avec l'ID ${siteId}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du commentaire.",
      error,
    });
  } finally {
    await connection.end();
  }
});
