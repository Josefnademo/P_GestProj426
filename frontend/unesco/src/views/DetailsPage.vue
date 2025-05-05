<script setup>
import { ref, onMounted } from "vue";
import ShowDetails from "@/services/ShowDetails.js";

const props = defineProps({
  id: {
    required: true,
  },
  compte_id: {
    required: true,
  },
});

const detail = ref(null);

onMounted(() => {
  ShowDetails.getDetails(props.id)
    .then((response) => {
      detail.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
});
const likedImage = "";
</script>

<template>
  <div id="app">
    <div class="content-container">
      <h1>Lorem ipsum dolor od tempor</h1>
      <p></p>
      <div v-if="detail">
        <h1>{{ detail.nom }}</h1>
        <p>{{ detail.particularite }}</p>
        <p>{{ detail.histoire }}</p>
      </div>
      <div class="buttons">
        <button class="action-button" @click="/*methodeLiked*/">
          <img v-if="isLiked" src="http://localhost:3000/images/likeRED.jpg" />
          <img v-else src="http://localhost:3000/images/like.jpg" />
        </button>
        <button class="action-button" @click="/*methodeVisité*/">
          <img src="http://localhost:3000/images/visited.jpg" />
        </button>
      </div>
    </div>
    <img :src="detail.image" />
  </div>
</template>

<script>
export default {
  name: "App",
  isLiked(lieu_id, compte_id) {
    ShowDetails.wantToVisit(lieu_id, compte_id);
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  color: #333;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content-container {
  text-align: center;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.action-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>
