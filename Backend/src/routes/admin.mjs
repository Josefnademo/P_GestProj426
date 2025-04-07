import express from "express";
// c'est une erreur touchez pas ca marche
import { isAdmin } from "../middleware/adminCheck.mjs";
import { dbMiddleware } from "../middleware/dbConnection.mjs";
const adminRouter = express();

// POST /country - Ajouter un pays (admin seulement)
adminRouter.post("/country", async (/*, isAdmin*/ req, res) => {
  const countryName = req.body;                                                           //Get countryname from body
  const connection = await mysql.createConnection(config.dbConfig);
  try {                                                                                   //Run query to insert country
    await connection.execute("INSERT INTO t_pays (nom) VALUES (?, ?)", [                  //
      countryName,                                                                        //
    ]);
    res.json({
      message: `Country ${countryName} added!`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding the country.",
      error,
    });
  }
});

// PATCH /country - Mettre a jour un pays (admin seulement)
adminRouter.patch("/country/:id", async (/*, isAdmin*/ req, res) => {
  const countryId = req.params.id;                                                        //Get country id from body
  const { countryName } = req.body;
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    await connection.execute("UPDATE t_pays SET nom = ? WHERE id = ?", [                   //Run query to update country
      countryName,                                                                         //
      countryId,                                                                           //
    ]);
    res.json({
      message: `Country with ID ${countryId} MAJ !`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating the country.",
      error,
    });
  }
});

// DELETE /country - Supprimer un pays (admin seulement)
adminRouter.delete(
  "/country/:id",
  /*, isAdmin*/ async (req, res) => {
    const countryId = req.params.id;                                                            //Get country id from body
    const connection = await mysql.createConnection(config.dbConfig);
    try {
      await connection.execute("DELETE FROM t_pays WHERE id = ?", [countryId]);                 //Run query to delete country
      res.json({ 
        message: `Country with ID ${countryId} deleted!`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting the country.",
        error,
      });
    }
  }
);

// POST /country - Ajouter un pays (admin seulement)
adminRouter.post("/region", async (/*, isAdmin*/ req, res) => {
  const regionName = req.body;                                                                      //Get regionname from body
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    await connection.execute("INSERT INTO t_region (nom) VALUES (?, ?)", [                          //Run query to insert region
      regionName,                                                                                   //
    ]);                                                                                             //
    res.json({
      message: `Region ${regionName} added!`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding the region.",
      error,
    });
  }
});

// PATCH /country - Mettre a jour un pays (admin seulement)
adminRouter.patch("/region/:id", async (/*, isAdmin*/ req, res) => {
  const regionId = req.params.id;                                                                       //Get region id from body
  const { regionName } = req.body;
  const connection = await mysql.createConnection(config.dbConfig);
  try {
    await connection.execute("UPDATE t_region SET nom = ? WHERE id = ?", [                                //Run query to update region
      regionName,                                                                                         //
      regionId,                                                                                           //
    ]);                                                                                                   //
    res.json({
      message: `Region with ID ${regionId} MAJ !`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating the region.",
      error,
    });
  }
});

// DELETE /country - Supprimer un pays (admin seulement)
adminRouter.delete(
  "/region/:id",
  /*, isAdmin*/ async (req, res) => {
    const regionId = req.params.id;                                                                          //Get region id from body
    const connection = await mysql.createConnection(config.dbConfig);
    try {
      await connection.execute("DELETE FROM t_region WHERE id = ?", [                                        //Delete region
        countryId,
      ]);
      res.json({
        message: `Region with ID ${regionId} deleted!`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting the region.",
        error,
      });
    }
  }
);

export { adminRouter };
