<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import "./assets/footer.css";
import "./assets/header.css";
import "../../../Logos/logo-ACD.png";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  background-color: #f7f9fc;
  color: #222;
}

.erreur {
  color: #e53935;
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
}

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

input[type="search"]:focus {
  border-color: #6a1b9a;
  outline: none;
  box-shadow: 0 4px 10px rgba(106, 27, 154, 0.2);
}

p {
  text-align: center;
  font-size: 1.1rem;
  margin: 15px 0;
}

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

button:hover {
  background-color: #673ab7;
  transform: translateY(-3px);
}

button:active {
  background-color: #5e35b1;
  transform: translateY(1px);
}

p:nth-child(1) {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff5722;
}

div {
  margin-top: 30px;
}

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

h1,
h2 {
  text-align: center;
  color: #333;
  margin-top: 30px;
}
</style>
