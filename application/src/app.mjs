import { sequelize, Compte } from "./db/sequelize.mjs";
import express from "express";
const port = 3000;
const app = express();

app.get("/", function (req, res) {
  //Connection à la DB
  sequelize
    .authenticate()
    .then((_) =>
      console.log("La connexion à la base de données a bien été établie")
    )
    .catch((error) => console.error("Impossible de se connecter à la DB"));
  res.send(`<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="utf-8">

  <!-- Include the CesiumJS JavaScript and CSS files -->

  <script src="https://cesium.com/downloads/cesiumjs/releases/1.126/Build/Cesium/Cesium.js"></script>

  <link href="https://cesium.com/downloads/cesiumjs/releases/1.126/Build/Cesium/Widgets/widgets.css" rel="stylesheet">

</head>
<style>/* hide cesium elements *//*
.cesium-viewer-animationContainer, .cesium-viewer-timelineContainer, .cesium-viewer-bottom, .cesium-viewer-fullscreenContainer, .cesium-viewer-toolbar {
  display: none !important;*/
}</style>
<body>

  <div id="cesiumContainer"></div>

  <script type="module">
    // Your access token can be found at: https://ion.cesium.com/tokens.
    // Replace 'your_access_token' with your Cesium ion access token.


    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MzE1YjcxNS0yZjA5LTQyMjgtYTgxMy1kNTJkYWEyNDczM2QiLCJpZCI6Mjc5OTg2LCJpYXQiOjE3NDA3NDY0MTF9.e8NfSN05dzDMqasqzxwgNE3JI1cPfrcCiSDnmaKLbug';

    // Initialize the Cesium Viewer in the HTML element with the 'cesiumContainer' ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      terrain: Cesium.Terrain.fromWorldTerrain(),
    });    

    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(7, 45, 1500),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-15.0),
      }
    });

    // Add Cesium OSM Buildings, a global 3D buildings layer.
    const buildingTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset); 
    const circle = new Cesium.CircleGeometry({
  center : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
  radius : 1000000.0
});
const geometry = Cesium.CircleGeometry.createGeometry(circle);
  </script>

 </div>

</body>

</html>
`);
});
app.get("/accueil/", (req, res) => {
  res.render("accueil", { name: "utilisateur" });
});
app.use(({ res }) => {
  const message = "ERREUR 404";
  res.status(404).json(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
