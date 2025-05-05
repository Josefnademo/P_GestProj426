<template>
  <div id="cesiumContainer"></div>
</template>
<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";
// import { places } from "../../point.js";
const url = "http://localhost:3000/lieu";

const placesJson = await fetch(url, {
  method: "GET",
});

const places = await placesJson.json();

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYzdjMDI0Yy1lNmRjLTRlNGQtODhlNC03MDk2YTFiOTkwZjIiLCJpZCI6Mjg1MDU5LCJpYXQiOjE3NDIyMTU0NTl9.O5SAKSAFH-6ir1VBpZPCduvvTJGKbNWiR6ivpwMBL-o"; // Remplace par ta clé

onMounted(async () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    animation: false,
    timeline: false,
  });

  //Zoom sur l'utilisateur
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0),
      });
    });
  }

  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 6378137 * 0.05;

  var imagery = Cesium.createDefaultImageryProviderViewModels();

  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileset);
  const point = {
    pixelSize: 10,
    color: Cesium.Color.RED,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,
  };
  for (let place of places) {
    const position = Cesium.Cartesian3.fromDegrees(
      Number(place.longitude),
      Number(place.latitude)
    );

    // Interroge l'altitude du terrain à cet endroit
    Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, [
      Cesium.Cartographic.fromDegrees(
        Number(place.longitude),
        Number(place.latitude)
      ),
    ]).then((updatedPositions) => {
      const height = updatedPositions[0].height || 0; // Hauteur du terrain
      const adjustedHeight = height + 2000; // On ajoute 2000m pour éviter tout enfouissement

      const adjustedPosition = Cesium.Cartesian3.fromDegrees(
        Number(place.longitude),
        Number(place.latitude),
        adjustedHeight
      );

      const entity = viewer.entities.add({
        name: place.nom,
        description: place.particularite,
        position: adjustedPosition,
        point: {
          pixelSize: 10,
          color: Cesium.Color.RED,
          heightReference: Cesium.HeightReference.NONE, // Désactiver le clamp pour qu'il respecte l'altitude fixée
        },
        label: {
          text: place.nom,
          font: "14pt monospace",
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          heightReference: Cesium.HeightReference.NONE,
          show: false, // Masqué par défaut
        },
      });

      entity._distanceLabelUpdate = function (mousePosition) {
        if (!mousePosition) return;
        const distance = Cesium.Cartesian3.distance(
          mousePosition,
          adjustedPosition
        );
        entity.label.show = distance < 55000; // Affiche si la distance est < 10 km 99998
      };
    });
  }

  // Suivi de la souris et mise à jour des labels
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
    const ray = viewer.camera.getPickRay(movement.endPosition);
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (cartesian) {
      viewer.entities.values.forEach((entity) => {
        if (entity._distanceLabelUpdate) {
          entity._distanceLabelUpdate(cartesian);
        }
      });
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
});
</script>
<style>
#cesiumContainer {
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;

  font-family: sans-serif;
}
.cesium-viewer-cesiumWidgetContainer {
  width: 1908px;
  height: 745px;
}
.cesium-viewer {
  width: 1908px;
  height: 745px;
}
.cesium-widget canvas {
  width: 1908px;
  height: 745px;
}
</style>
