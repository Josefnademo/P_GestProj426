<!-- App.vue -->
<template>
  <p v-if="count >= 5">5!!!</p>

  <p>Compteur : {{ count }}</p>
  <button @click="increment">Incrémenter</button>
  <button @click="mounted">decrement</button>
  <img src="imageMusique.src" alt="" />
  <ul>
    <li v-for="monument in monuments">
      {{ monument }}
    </li>
  </ul>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
const song = "veridisquo";
const artist = "daftpunk";
search(song, artist);
async function search(song, artist) {
  console.log(song);
  console.log(artist);
  const url = `http://localhost:3000/music/search/?song=${song}&artist=${artist}`;
  try {
    const result = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    console.log("hello");
    result.json().then((data) => {
      console.log(data);
      imageMusique.src = data[0].image;
    });
  } catch (err) {
    console.log(err);
  }
}

const count = ref(0);
const increment = () => {
  count.value += 1;
};
const decrement = () => {
  count.value--;
};
const monuments = ref(["lavaux", "tajmahal", "tour eifel"]);
</script>
