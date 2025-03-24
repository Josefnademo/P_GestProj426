<template>
  <div id="app">
    <div class="personal-info-container">
      <h1>Information personnelle</h1>
      <div class="info-section">
        <div class="info-item">
          <span>Email Tony.Smith@gmail.com</span>
          <button class="change-button">Changer</button>
        </div>
        <div class="info-item">
          <span>Mot de passe ********</span>
          <button class="change-button">Changer</button>
        </div>
      </div>
      <div class="actions">
        <button class="save-button">Save</button>
        <button class="logout-button">Déconnexion</button>
      </div>
      <div class="danger-zone">
        <h2>Zone de danger</h2>
        <div class="danger-item">
          <span>Supprimer mon compte</span>
          <p>
            Une fois que vous avez supprimé un compte, il n’y a pas de retour en
            arrière. Soyez-en certain.
          </p>
          <button class="delete-button">Supprimer</button>
        </div>
      </div>
      <footer class="footer">
        <p>Tout droit réservé © 2025 ACD Motorsport</p>
        <div class="footer-links">
          <a href="#">Recherche</a>
          <a href="#">Compte</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
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

.personal-info-container {
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

.info-section {
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.change-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.change-button:hover {
  background-color: #0056b3;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.save-button,
.logout-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.save-button {
  background-color: #28a745;
  color: white;
}

.save-button:hover {
  background-color: #218838;
}

.logout-button {
  background-color: #dc3545;
  color: white;
}

.logout-button:hover {
  background-color: #c82333;
}

.danger-zone {
  margin-bottom: 2rem;
}

.danger-item {
  text-align: left;
}

.danger-item span {
  font-weight: bold;
}

.danger-item p {
  font-size: 0.9rem;
  color: #666;
}

.delete-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}

.footer {
  margin-top: 2rem;
  font-size: 0.9rem;
}

.footer-links {
  margin-top: 0.5rem;
}

.footer-links a {
  margin: 0 0.5rem;
  color: #007bff;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
