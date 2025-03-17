<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted } from "vue";
import * as Cesium from "cesium";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYzdjMDI0Yy1lNmRjLTRlNGQtODhlNC03MDk2YTFiOTkwZjIiLCJpZCI6Mjg1MDU5LCJpYXQiOjE3NDIyMTU0NTl9.O5SAKSAFH-6ir1VBpZPCduvvTJGKbNWiR6ivpwMBL-o"; // Remplace par ta clé

onMounted(async () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    animation: false,
    timeline: false,
  });

  const buildingTileset = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileset);
});
</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
