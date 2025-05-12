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

  //Zooms on the user
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);
      //HOME
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
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0),
      });
    });
  }

  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 6378137 * 0.05;

  var imagery = Cesium.createDefaultImageryProviderViewModels();

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
      const entity = viewer.entities.add({
        name: place.nom,
        description:
          place.particularite +
          '<a target="_blank" href="gogole.com">Page de détails</a>',
        position: adjustedPosition,
        point: {
          pixelSize: 10,

          color: (() => {
            const cat = String(place.categorie).trim().toLowerCase();
            if (cat === "cultural") return Cesium.Color.YELLOW;
            if (cat === "natural") return Cesium.Color.LIME;
            if (cat === "Agile") return Cesium.Color.PINK;
            if (cat === "mixed" || cat === "mixt") return Cesium.Color.ORANGE;
            console.log(place);
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
} /*html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: "Segoe UI", sans-serif;
}

#cesiumContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
  display: block;
}

.cesium-viewer,
.cesium-viewer-cesiumWidgetContainer,
.cesium-widget,
.cesium-widget canvas {
  width: 100% !important;
  height: 100% !important;
  max-width: 100vw;
  max-height: 100vh;
  display: block;
  object-fit: cover;
  box-sizing: border-box;
}


.cesium-viewer-toolbar,
.cesium-viewer-timelineContainer,
.cesium-viewer-animationContainer {
  z-index: 10;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 0.5em;
}


.cesium-infoBox {
  backdrop-filter: blur(5px);
  background-color: rgba(10, 10, 10, 0.6);
  color: white;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}


.cesium-widget-credits {
  display: none !important;
} */
</style>
