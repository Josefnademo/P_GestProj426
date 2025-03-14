<template>
  <div class="search-container">
    <h1>Recherche Lieux</h1>
    <form @submit.prevent="searchLieu">
      <label for="nom">Nom du lieu :</label>
      <input
        type="text"
        id="nom"
        v-model="nom"
        list="suggestions"
        placeholder="Entrez un lieu"
      />
      <datalist id="suggestions">
        <option
          v-for="suggestion in suggestions"
          :key="suggestion.nom"
          :value="suggestion.nom"
        />
      </datalist>
      <button type="submit">Rechercher</button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="lieux.length > 0" class="results">
      <h2>Résultats :</h2>
      <div v-for="lieu in lieux" :key="lieu.lieu_id" class="result-item">
        <p><strong>ID :</strong> {{ lieu.lieu_id }}</p>
        <p><strong>Nom :</strong> {{ lieu.nom }}</p>
        <p><strong>Longitude :</strong> {{ lieu.longitude }}</p>
        <p><strong>Latitude :</strong> {{ lieu.latitude }}</p>
        <p><strong>Particularité :</strong> {{ lieu.particularite }}</p>
        <hr />
      </div>
    </div>

    <div v-else-if="!error && lieux.length === 0 && searched">
      <p>Aucun lieu trouvé.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchPage",
  data() {
    return {
      nom: "",
      lieux: [],
      suggestions: [],
      error: "",
      searched: false,
    };
  },
  watch: {
    nom(newVal) {
      if (newVal.length > 2) {
        axios
          .get(`http://localhost:3000/suggest-lieu?query=${newVal}`)
          .then((res) => {
            this.suggestions = res.data;
          })
          .catch((err) => {
            console.error("Erreur suggestions:", err);
          });
      }
    },
  },
  methods: {
    searchLieu() {
      axios
        .post("http://localhost:3000/search-user", { nom: this.nom })
        .then((res) => {
          this.lieux = res.data.lieux;
          this.error = res.data.error || "";
          this.searched = true;
        })
        .catch((err) => {
          console.error("Erreur recherche:", err);
          this.error = "Erreur lors de la recherche.";
        });
    },
  },
};
</script>

<style scoped>
/* General body styling for clean and modern look */
body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  background-color: #f7f9fc;
  color: #222;
  line-height: 1.6;
}

/* Error message styling */
.erreur {
  color: #e53935;
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
}

/* Search bar styling - almost full screen width */
input[type="search"] {
  width: 95%;
  max-width: 800px;
  display: block;
  margin: 30px auto 20px auto;
  padding: 15px 20px;
  font-size: 1.1rem;
  border: 2px solid #a374d3;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

/* Search bar focus effect */
input[type="search"]:focus {
  border-color: #6a1b9a;
  outline: none;
  box-shadow: 0 4px 10px rgba(106, 27, 154, 0.2);
}

/* Counter text styling */
p {
  text-align: center;
  font-size: 1.1rem;
  margin: 15px 0;
}

/* Buttons styling - consistent and modern */
button {
  display: block;
  width: 90%;
  max-width: 300px;
  margin: 10px auto;
  padding: 14px 20px;
  font-size: 1rem;
  font-weight: 600;
  background-color: #7e57c2;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Button hover effect */
button:hover {
  background-color: #673ab7;
  transform: translateY(-3px);
}

/* Button active/click effect */
button:active {
  background-color: #5e35b1;
  transform: translateY(1px);
}

/* Highlight text when count is 5 */
p:nth-child(1) {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff5722;
}

/* User list block styling */
div {
  margin-top: 30px;
  padding: 0 10%;
}

/* Each user card */
div p {
  background-color: #ffffff;
  border-left: 6px solid #7e57c2;
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease;
}

div p:hover {
  background-color: #f0ebfa;
}

/* Responsive typography for heading if needed */
h1,
h2 {
  text-align: center;
  color: #333;
  margin-top: 30px;
}
</style>
