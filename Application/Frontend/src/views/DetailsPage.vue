<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ShowDetails from "@/services/ShowDetails.js";

const route = useRoute();
const detail = ref(null);
const isLiked = ref(false);
const isVisited = ref(false);
const notification = ref(null);
const loading = ref(true);
const lieuId = ref(route.params.lieu_id);
const userId = ref(localStorage.getItem("user_id"));

const showNotification = (message) => {
  notification.value = message;
  setTimeout(() => {
    notification.value = null;
  }, 3000);
};

const handleLike = async () => {
  if (!userId.value) {
    showNotification("Please log in to like this site");
    return;
  }
  try {
    await ShowDetails.wantToVisit(lieuId.value, userId.value);
    isLiked.value = !isLiked.value;
  } catch (error) {
    console.error("Error toggling like:", error);
    showNotification("Error updating like status");
  }
};

const handleVisited = async () => {
  if (!userId.value) {
    showNotification("Please log in to mark as visited");
    return;
  }
  try {
    await ShowDetails.markAsVisited(lieuId.value, userId.value);
    isVisited.value = !isVisited.value;
  } catch (error) {
    console.error("Error toggling visited status:", error);
    showNotification("Error updating visited status");
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    const response = await ShowDetails.getDetail(lieuId.value);
    detail.value = response.data;
    if (userId.value) {
      // You might want to add API calls here to check the initial state
      // of isLiked and isVisited for the current user
    }
  } catch (err) {
    showNotification("Failed to load details. Please try again later.");
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div id="app">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="notification" class="notification">
      {{ notification }}
    </div>

    <div v-if="detail" class="content-container">
      <h1>{{ detail.nom }}</h1>
      <p>{{ detail.particularite }}</p>
      <p>{{ detail.histoire }}</p>

      <div class="buttons">
        <button
          class="action-button"
          @click="handleLike"
          :class="{ active: isLiked }"
        >
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
        <div class="visited-container">
          <label class="switch">
            <input
              type="checkbox"
              v-model="isVisited"
              @change="handleVisited"
            />
            <span class="slider round"></span>
          </label>
          <span class="visited-label">Visited</span>
        </div>
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
  align-items: center;
  gap: 2rem;
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
  transition: all 0.3s ease;
}

.action-button.active {
  background-color: #28a745;
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

/* Switch styles */
.visited-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.visited-label {
  font-size: 1rem;
  color: #333;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
