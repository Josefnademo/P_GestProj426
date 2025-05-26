<template>
  <header>
    <div class="logo">
      <router-link to="/">
        <img
          src="../../../public/images/logo-ACD.png"
          alt="logo ACD motorsport"
        />
      </router-link>
    </div>
    <nav>
      <ul>
        <li><router-link to="/" class="nav-button">Accueil</router-link></li>
        <li><router-link to="/login" class="nav-button">Login</router-link></li>
        <li>
          <router-link to="/account" class="nav-button">Account</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo img {
  height: 50px;
  width: auto;
}

nav ul {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-button {
  text-decoration: none;
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.router-link-active {
  color: white;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
