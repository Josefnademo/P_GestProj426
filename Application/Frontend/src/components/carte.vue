<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZWI0YmFmZS05ZmZiLTRiMDgtYmQ1Mi00OWFhMTFmNWVkYmYiLCJpZCI6Mjc5OTg2LCJpYXQiOjE3NTc5MjQ3ODF9.t28f8jM1pQSAjjhQzw5VRXbEVfSfCdxLq0sxpE8bTMU";

onMounted(async () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    animation: false,
    timeline: false,
    shouldAnimate: true,
  });

  const defaultLat = 50.4268;
  const defaultLon = 30.5549;

  let latitude = defaultLat;
  let longitude = defaultLon;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
        flyToPosition(latitude, longitude);
      },
      () => flyToPosition(latitude, longitude)
    );
  } else {
    flyToPosition(latitude, longitude);
  }

  function flyToPosition(lat, lon) {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, 2500),
      duration: 2.2,
      easingFunction: Cesium.EasingFunction.QUADRATIC_OUT,
    });

    viewer.homeButton.viewModel.command.beforeExecute.addEventListener((e) => {
      e.cancel = true;
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, 2500),
        duration: 2,
      });
    });
  }

  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100.0;

  Cesium.createOsmBuildingsAsync().then((tileset) => {
    viewer.scene.primitives.add(tileset);
  });

  // Подгружаем точки
  fetch("http://localhost:3000/lieu")
    .then((res) => res.json())
    .then(async (places) => {
      const cartographics = places.map((p) =>
        Cesium.Cartographic.fromDegrees(Number(p.longitude), Number(p.latitude))
      );

      const updated = await Cesium.sampleTerrainMostDetailed(
        viewer.terrainProvider,
        cartographics
      );

      updated.forEach((pos, i) => {
        const place = places[i];
        const adjustedHeight = (pos.height || 0) + 3000;

        const entity = viewer.entities.add({
          name: place.nom,
          description: "Redirecting...",
          position: Cesium.Cartesian3.fromDegrees(
            Number(place.longitude),
            Number(place.latitude),
            adjustedHeight
          ),
          point: {
            pixelSize: 12,
            color: getColorByCategory(place.categorie),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            heightReference: Cesium.HeightReference.NONE,
          },
          label: {
            text: place.nom,
            font: "13pt monospace",
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -20),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0,
              55000
            ),
          },
        });

        entity.lieu_id = place.lieu_id;
      });

      if (places.length > 0) {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            Number(places[0].longitude),
            Number(places[0].latitude),
            15000
          ),
        });
      }
    });

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((click) => {
    const picked = viewer.scene.pick(click.position);
    if (Cesium.defined(picked) && picked.id?.lieu_id) {
      window.location.href = GoToDetails(picked.id.lieu_id);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});

function getColorByCategory(cat) {
  cat = String(cat).trim().toLowerCase();
  if (cat === "cultural") return Cesium.Color.YELLOW;
  if (cat === "natural") return Cesium.Color.LIME;
  if (cat === "agile") return Cesium.Color.PINK;
  if (cat === "mixed" || cat === "mixt") return Cesium.Color.ORANGE;
  return Cesium.Color.GRAY;
}

function GoToDetails(lieu_id) {
  return `/details/lieu/${lieu_id}`;
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#cesiumContainer {
  width: 90vw;
  height: 80vh;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.15);
  background-color: #1e1e1e;
  position: relative;
}

/* Keep all Cesium toolbar buttons but align them cleanly */
.cesium-viewer-toolbar {
  position: absolute !important;
  top: 12px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 1000;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 8px;
  padding: 4px 12px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  width: fit-content !important;
  max-width: 90vw !important;
}

/* Prevent layer and navigation buttons from overlapping */
.cesium-viewer-geocoderContainer,
.cesium-navigationHelpButton,
.cesium-baseLayerPicker-dropDown {
  z-index: 1001 !important;
}

/* Hide Cesium credit footer */
.cesium-viewer-bottom {
  display: none !important;
}

@media (max-width: 768px) {
  #cesiumContainer {
    width: 95vw;
    height: 70vh;
  }
}
</style>
