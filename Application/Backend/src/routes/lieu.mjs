import express from "express";

const lieuRouter = express.Router();
import config from "../config.mjs";
import mysql from "mysql2/promise";
import { isAdmin } from "../middleware/adminCheck.mjs";
import { dbMiddleware } from "../middleware/dbConnection.mjs";

// GET - Get all sites
lieuRouter.get("/", async (req, res) => {
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    const [rows] = await connection.execute(                                    //Run query
      "SELECT lieu_id, nom, latitude, longitude, particularite, categorie FROM t_lieu"              //
    );                                                                          //
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des sites.",
      error,
    });
  } finally {
    await connection.end();
  }
});

// GET /:id - Get a site by ID
lieuRouter.get("/:id", async (req, res) => {
  const siteId = req.params.id;                                                   //Get the site id from the request
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    const [rows] = await connection.execute(                                      //Runs query
      "SELECT * FROM t_lieu WHERE lieu_id = ?",                                   //
      [siteId]                                                                    //
    );                                                                            //
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

// POST /:id/visiter - Add a site to the "to visit" list
lieuRouter.post("/:id/visiter", async (req, res) => {
  const siteId = req.params.id;                                                     //Get the site id from the request
  const compteId = req.body.compte_id;                                              //Get the compte id from the request body
  const connection = await mysql.createConnection(config.dbConfig);
  try {
  await connection.execute(                                                         //Run query to insert the ids into the table
    "INSERT INTO t_aimeraitVisiter (lieu_id_fk, compte_id_fk) VALUES (?, ?)",       //
    [siteId, compteId]                                                              //
  );                                                                                //
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

// POST /:id/visite - Add a site to the "visited" list
lieuRouter.post("/:id/visite", async (req, res) => {
  const siteId = req.params.id;                                                       //Get the site id from the request
  const compteId = req.body.compte_id;                                                //Get the compte id from the request body
  const dateVisite = req.body.date_visite;                                            //Get the date from the request
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    await connection.execute(                                                           //Run query to insert the ids and date into the table
      "INSERT INTO t_visiter (lieu_id_fk, compte_id_fk, date_visite) VALUES (?, ?, ?)", //
      [siteId, compteId, dateVisite]                                                    //
    );                                                                                  //
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

// DELETE /:id/visite - Remove a site from the "visited" list
lieuRouter.delete("/:id/visite", async (req, res) => {
  const siteId = req.params.id;                                                           //Get the site id from the request
  const compteId = req.body.compte_id;                                                    //Get the compte id from the request body
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    await connection.execute(                                                             //Run query to delete the ids from the table
      "DELETE FROM t_visiter WHERE lieu_id_fk = ? AND compte_id_fk = ?",                  //
      [siteId, compteId]                                                                  //
    );                                                                                    //
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

// DELETE /:id/a-visiter - Remove a site from the "to visit" list
lieuRouter.delete("/:id/visiter", async (req, res) => {
  const siteId = req.params.id;                                                           //Get the site id from the request
  const compteId = req.body.compte_id;                                                    //Get the compte id from the request body
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    await connection.execute(                                                             //Run the query
      "DELETE FROM t_aimeraitVisiter WHERE lieu_id_fk = ? AND compte_id_fk = ?",          //
      [siteId, compteId]                                                                  //
    );                                                                                    //
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

// POST / - Add a new site (admin only)
lieuRouter.post("/", async (req, res) => {
  const { nom, longitude, latitude, particularite } = req.body;                           //Get site parameters from the request body
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    const [result] = await connection.execute(                                            //Insert the site into the database
      "INSERT INTO t_lieu (nom, longitude, latitude, particularite) VALUES (?, ?, ?, ?)", //
      [nom, longitude, latitude, particularite]                                           //
    );                                                                                    //
    res
      .status(201)
      .json({ message: `Site ajouté avec l'ID ${result.insertId}` });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du site.", error });
  } finally {
    await connection.end();
  }
});

// PATCH /:id - Modify a site (admin only)
lieuRouter.patch("/:id", async (req, res) => {
  const lieuId = req.params.id;                                                                       //Get the site id from the request
  const { nom, longitude, latitude, particularite } = req.body;                                       //Get the site parameters from the request body
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    await connection.execute(                                                                         //Run query to update the site
      "UPDATE t_lieu SET nom = ?, longitude = ?, latitude = ?, particularite = ? WHERE lieu_id = ?",  //
      [nom, longitude, latitude, particularite, lieuId]                                               //
    );                                                                                                //
    res.json({
      message: `Informations du site avec l'ID ${lieuId} modifiées`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la modification des informations.",
      error,
    });
  } finally {
    await connection.end();
  }
});

// DELETE /:id - Delete a site (admin only)
lieuRouter.delete("/:id", async (req, res) => {
  const lieuId = req.params.id;                                                         //Get the site id from the request
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    await connection.execute("DELETE FROM t_lieu WHERE lieu_id = ?", [lieuId]);         //Delete the site
    res.json({ message: `Site avec l'ID ${lieuId} supprimé` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du site.", error });
  } finally {
    await connection.end();
  }
});

// POST /:id/comment - Post a comment under a site
lieuRouter.post("/:id/comment", async (req, res) => {
  const lieuId = req.params.id;                                                                   //Get the site id from the request
  const { compte_id, commentaire, rating } = req.body;                                            //Get the compte id, comment and rating from the request body
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    await connection.execute(                                                                     //Run query to insert the comment into the database
      "INSERT INTO t_avis (commentaire, rating, lieu_id_fk, compte_id_fk) VALUES (?, ?, ?, ?)",   //
      [commentaire, rating, lieuId, compte_id]                                                    //
    );                                                                                            //
    res.json({ message: `Commentaire ajouté au site avec l'ID ${lieuId}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout du commentaire.", error });
  }
});

// PATCH /:id/comment/:commentId - Modify a comment (admin only)
lieuRouter.patch(
  "/:id/comment/:avisId",
  /*isAdmin,
  dbMiddleware,*/
  async (req, res) => {
    const lieu_id = req.params.id;                                                              //Get the site id from the request  
    const avisId = req.params.avisId;                                                           //Get the comment id from the request
    const { commentaire, rating } = req.body;                                                   //Get the comment and rating from the request body
    const connection = await mysql.createConnection(config.dbConfig);
    try {
      await connection.execute(
        "UPDATE t_avis SET commentaire = ?, rating = ? WHERE avis_id = ? AND lieu_id_fk = ?",   //Run patch
        [commentaire, rating, avisId, lieu_id]
      );
      res.json({
        message: `Commentaire avec l'ID ${avisId} modifié pour le site avec l'ID ${lieu_id}`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la modification du commentaire.",
        error,
      });
    }
  }
);

// DELETE /:id/comment/:commentId - Delete a comment (admin only)
lieuRouter.delete(
  "/:id/comment/:commentId",
  /*isAdmin,
  dbMiddleware,*/
  async (req, res) => {
    const siteId = req.params.id;                                                           //Get the site id from the request
    const commentId = req.params.commentId;                                                 //Get the comment id from the request
    const connection = await mysql.createConnection(config.dbConfig);
    try {
    await connection.execute(
      "DELETE FROM t_avis WHERE avis_id = ? AND lieu_id_fk = ?",                             //Run query to delete the comment
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
    }
  }
);

export { lieuRouter };
