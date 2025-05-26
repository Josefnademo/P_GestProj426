<template>
  <div id="cesiumContainer"></div>
</template>
<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";
import service from "../services/ShowDetails.js";
// import { places } from "../../point.js";
const url = "http://localhost:3000/lieu";

const placesJson = await fetch(url, {
  method: "GET",
});

const places = await placesJson.json();

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMzk2OThmNS04YzFiLTRjNGUtOTk0NS0wZTgyY2EwZTQ0M2QiLCJpZCI6Mjc5OTg2LCJpYXQiOjE3NDgyNTc4OTh9.NnPRBqTBguGrFRTM8G07ySuqlsiNxd_kHi2vU-eF61I";

onMounted(async () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    animation: false,
    timeline: false,
  });

  //Zooms on the user
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);

      //Quand on clique sur le bouton home, on arrive sur la position de l'utilisateur
      viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        function (e) {
          e.cancel = true;
          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
              longitude,
              latitude,
              6378137 * 0.05
            ),
          });
        }
      );

      //Zoomer sur la position de l'utilisateur
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0),
      });
    });
  }

  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 6378137 * 0.05;

  //Creates OSM buildings
  const buildingTileset = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileset);
  const point = {
    pixelSize: 10,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,
    color: Cesium.Color.RED,
  };
  for (let place of places) {
    const position = Cesium.Cartesian3.fromDegrees(
      Number(place.longitude),
      Number(place.latitude)
    );

    //Returns latitude and longitude
    Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, [
      Cesium.Cartographic.fromDegrees(
        Number(place.longitude),
        Number(place.latitude)
      ),
    ]).then((updatedPositions) => {
      const height = updatedPositions[0].height || 0; //Height
      const adjustedHeight = height + 2000; //Add 2km to the height to acount for odd cases

      const adjustedPosition = Cesium.Cartesian3.fromDegrees(
        Number(place.longitude),
        Number(place.latitude),
        adjustedHeight
      );
      console.log(place.categorie);
      const entity = viewer.entities.add({
        name: place.nom,
        description: "Redirection en cours...",
        position: adjustedPosition,
        point: {
          pixelSize: 10,
          color: (() => {
            const cat = String(place.categorie).trim().toLowerCase();
            if (cat === "cultural") return Cesium.Color.YELLOW;
            if (cat === "natural") return Cesium.Color.LIME;
            if (cat === "agile") return Cesium.Color.PINK;
            if (cat === "mixed" || cat === "mixt") return Cesium.Color.ORANGE;
            return Cesium.Color.GRAY; // Pour null, undefined, ou autre
          })(),
          heightReference: Cesium.HeightReference.NONE,
        },
        label: {
          text: place.nom,
          font: "14pt monospace",
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          heightReference: Cesium.HeightReference.NONE,
          show: false, //This is masked by default
        },
      });

      // Store the lieu_id in the entity for later use
      entity.lieu_id = place.lieu_id;

      entity._distanceLabelUpdate = function (mousePosition) {
        if (!mousePosition) return;
        const distance = Cesium.Cartesian3.distance(
          mousePosition,
          adjustedPosition
        );
        entity.label.show = distance < 55000; //Shows if distance is less than 10km
      };
    });
  }
  //Update the label when the mouse moves
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
    if (movement.endPosition) {
      const ray = viewer.camera.getPickRay(movement.endPosition);
      if (ray) {
        const cartesian = viewer.scene.globe.pickWorldCoordinates(
          ray,
          viewer.scene
        );
        if (cartesian) {
          viewer.entities.values.forEach((entity) => {
            if (entity._distanceLabelUpdate) {
              entity._distanceLabelUpdate(cartesian);
            }
          });
        }
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  // Add click handler for entities
  handler.setInputAction(function (click) {
    const pickedObject = viewer.scene.pick(click.position);
    if (Cesium.defined(pickedObject) && pickedObject.id) {
      const entity = pickedObject.id;
      if (entity && entity.lieu_id) {
        window.location.href = GoToDetails(entity.lieu_id);
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});

function GoToDetails(lieu_id) {
  return `/details/lieu/${lieu_id}`;
}
</script>
<style>
/* Applique un fond stylé à la page */
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Conteneur de la carte : fenêtre avec style */
#cesiumContainer {
  width: 90vw;
  height: 75vh;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-color: #1e1e1e;
  position: relative;
}

/* Rendre tout le canvas de la carte responsive */
.cesium-viewer,
.cesium-viewer-cesiumWidgetContainer,
.cesium-widget canvas {
  width: 100% !important;
  height: 100% !important;
  max-width: 100%;
  max-height: 100%;
  display: block;
}

/* Optionnel : cacher les crédits en bas */
.cesium-viewer-bottom {
  display: none !important;
}

.cesium-viewer {
  padding-top: -2em !important;
  margin-top: -2em !important;
}

.cesium-viewer-toolbar {
  position: absolute !important;
  top: 10px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 1000;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 8px;
  padding: 4px 12px;
  display: inline-flex !important;
  justify-content: center;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  width: fit-content !important;
  max-width: 90vw !important;
}

/* Responsive design pour petits écrans */
@media (max-width: 768px) {
  #cesiumContainer {
    width: 95vw;
    height: 65vh;
  }
}
</style>
