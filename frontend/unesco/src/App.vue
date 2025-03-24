<template>
  <div>
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">À propos</router-link> |
      <router-link to="/search">recherche</router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2025 UNESCO - Tous droits réservés</p>
    </footer>
  </div>
</template>

<script></script>
<style>
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
