<template>
  <Suspense>
    <carte></carte>
  </Suspense>
</template>
<script setup>
import carte from "./carte.vue";
</script>
<style>
#cesiumContainer {
  width: 100%;
}
.cesium-sceneModePicker-dropDown-icon[data-bind*="COLUMBUS_VIEW"] {
  display: none;
}
.cesium-widget-credits {
  display: none !important;
}
#cesium-viewer {
  width: 100%;
  height: 150%;
}
body {
  background-color: black;
}
button.cesium-infoBox-camera {
  display: none;
}
</style>
