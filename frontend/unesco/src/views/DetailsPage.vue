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
const isLiked = ref(false);
const error = ref(null);
const loading = ref(true);

const handleLike = async () => {
  try {
    await ShowDetails.wantToVisit(props.id, props.compte_id);
    isLiked.value = !isLiked.value;
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    const response = await ShowDetails.getDetails(props.id);
    detail.value = response.data;
  } catch (err) {
    error.value = "Failed to load details. Please try again later.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div id="app">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="detail" class="content-container">
      <h1>{{ detail.nom }}</h1>
      <p>{{ detail.particularite }}</p>
      <p>{{ detail.histoire }}</p>

      <div class="buttons">

        <button class="action-button" @click="handleLike">
          <img
            v-if="isLiked"
            src="http://localhost:3000/images/likeRED.jpg"
            alt="Liked"
          />
          <img
            v-else
            src="http://localhost:3000/images/like.jpg"
            alt="Not liked"
          />
        </button>
        <button class="action-button">
          <img src="http://localhost:3000/images/visited.jpg" alt="Visited" />
        </button>
      </div>

      <img
        v-if="detail.image"
        :src="detail.image"
        :alt="detail.nom"
        class="detail-image"
      />
    </div>
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
  min-height: 100vh;
  padding: 2rem;
}

.content-container {
  text-align: center;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.error {
  color: #dc3545;
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
  margin: 2rem 0;
}

.action-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.action-button:hover {
  background-color: #0056b3;
}

.detail-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
