<template>
  <div class="app-container">
    <div class="background">
      <div class="circle circle-green"></div>
      <div class="circle circle-orange"></div>
    </div>

    <div class="book-container">
      <div
        class="book"
        :class="{
          'flipped-login': currentPage === 'login',
          'flipped-register': currentPage === 'register',
        }"
      >
        <!-- Cover Page -->
        <div class="page cover">
          <div class="welcome">Content de vous revoir !</div>
          <div class="logo">ACD Motorsport</div>
          <div class="buttons">
            <button class="action-btn login-btn" @click="flipTo('login')">
              Login
            </button>
            <button class="action-btn register-btn" @click="flipTo('register')">
              Registration
            </button>
          </div>
        </div>

        <!-- Login Page -->
        <div class="page login">
          <div class="title">Se connecter</div>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Entrez votre nom"
                v-model="loginForm.username"
                required
              />
            </div>
            <div class="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                v-model="loginForm.password"
                required
              />
            </div>
            <div v-if="loginError" class="error-message">{{ loginError }}</div>
            <button type="submit" class="submit-btn" :disabled="loading">
              <span v-if="!loading">Se connecter</span>
              <span v-else>Connexion...</span>
            </button>
          </form>
          <div class="back-btn" @click="flipTo('cover')">← Retour</div>
        </div>

        <!-- Registration Page -->
        <div class="page register">
          <div class="title">S'inscrire</div>
          <form @submit.prevent="handleRegister">
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Votre email"
                v-model="registerForm.email"
                required
              />
            </div>
            <div class="form-group">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Choisissez un nom"
                v-model="registerForm.username"
                required
              />
            </div>
            <div class="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Créez un mot de passe"
                v-model="registerForm.password"
                required
              />
            </div>
            <div v-if="registerError" class="error-message">
              {{ registerError }}
            </div>
            <div v-if="registerSuccess" class="success-message">
              {{ registerSuccess }}
            </div>
            <button type="submit" class="submit-btn" :disabled="loading">
              <span v-if="!loading">S'inscrire</span>
              <span v-else>Inscription...</span>
            </button>
          </form>
          <div class="back-btn" @click="flipTo('cover')">← Retour</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InteractiveBook",
  data() {
    return {
      currentPage: "cover",
      loading: false,
      loginError: "",
      registerError: "",
      registerSuccess: "",
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        email: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    flipTo(page) {
      this.currentPage = page;
      this.loginError = "";
      this.registerError = "";
      this.registerSuccess = "";
    },
    async handleLogin() {
      this.loading = true;
      this.loginError = "";
      try {
        const response = await axios.post(
          "http://localhost:3000/login/",
          this.loginForm
        );
        const token = response.data.token;

        // Stocker le token dans localStorage ou cookies
        localStorage.setItem("auth_token", token);

        // Redirection vers la page principale ou détails
        this.$router.push("/"); // adapte selon ta route
      } catch (error) {
        this.loginError = "Nom d'utilisateur ou mot de passe invalide.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async handleRegister() {
      this.loading = true;
      this.registerError = "";
      this.registerSuccess = "";
      try {
        const response = await axios.post(
          "http://localhost:3000/register/",
          this.registerForm
        );
        const token = response.data.token;

        // Stocker le token
        localStorage.setItem("auth_token", token);

        this.registerSuccess = "Inscription réussie ! Redirection...";
        setTimeout(() => {
          this.$router.push("/");
        }, 1500);
      } catch (error) {
        this.registerError =
          error.response?.data?.message || "Erreur lors de l'inscription.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
  color: white;
}

/* Background Effects */
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.8;
}

.circle-green {
  width: 700px;
  height: 700px;
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  top: -100px;
  left: -100px;
  box-shadow: 0 0 150px #4caf50;
}

.circle-orange {
  width: 700px;
  height: 700px;
  background: linear-gradient(135deg, #ff9800, #ff5722);
  bottom: -150px;
  right: -100px;
  box-shadow: 0 0 180px #ff9800;
}

/* Book Container */
.book-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  perspective: 2000px;
  margin-bottom: 100px;
}

.book {
  position: relative;
  width: 900px;
  height: 600px;
  transform-style: preserve-3d;
  transition: transform 1s ease;
}

/* Page Styles */
.page {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 60px;
  background: rgba(89, 87, 104, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.8s ease;
  backface-visibility: hidden;
}

/* Cover Page */
.cover {
  transform: rotateY(0deg);
  z-index: 3;
}

.welcome {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.logo {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 60px;
  color: rgba(255, 255, 255, 0.9);
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60%;
  align-items: center;
  justify-content: center;
}

.action-btn {
  padding: 18px;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  color: white;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.login-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(76, 175, 80, 0.6);
}

.register-btn {
  background: linear-gradient(135deg, #2196f3, #3f51b5);
  color: white;
  box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
}

.register-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(33, 150, 243, 0.6);
}

/* Login/Register Pages */

/* Remove initial rotations - let the BOOK handle flipping */
.login,
.register {
  transform: rotateY(0); /* Changed from ±180deg */
  opacity: 0; /* Hide initially */
  z-index: 1; /* Same z-index */
}

.title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 40px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.form-group {
  width: 100%;
  max-width: 400px;
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.form-group input {
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  color: white;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #4caf50;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
}

.submit-btn {
  width: 100%;
  max-width: 400px;
  padding: 16px;
  background: linear-gradient(135deg, #ff9800, #ff5722);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 152, 0, 0.6);
}

.back-btn {
  margin-top: 30px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.back-btn:hover {
  color: white;
  text-decoration: underline;
}

/* Show active page */
.flipped-login .login,
.flipped-register .register {
  opacity: 1;
  z-index: 2;
}

/* Flip animations */
.flipped-login {
  transform: rotateY(-180deg);
}
.flipped-register {
  transform: rotateY(180deg);
}
/* Keep initial rotations but add visibility control */
.login {
  transform: rotateY(-180deg);
  backface-visibility: hidden;
}
.register {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}

/* Flip book to reveal correct side */
.flipped-login {
  transform: rotateY(-180deg);
}
.flipped-register {
  transform: rotateY(180deg);
}

/* Responsive Design */
@media (max-width: 768px) {
  .book-container {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }

  .book {
    flex-direction: column;
    transform: none !important;
    width: 100%;
    min-height: auto;
    box-shadow: none;
  }

  .page {
    width: 100%;
    height: auto;
    padding: 1.5rem;
    box-sizing: border-box;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.95);
    margin-bottom: 1.5rem;
  }

  .cover .buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .action-btn,
  .submit-btn {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
  }

  .back-btn {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
    cursor: pointer;
    color: #333;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
  }

  /* Show only active page */
  .book.cover .cover,
  .book.login .login,
  .book.register .register {
    display: flex;
  }

  /* Text adjustments */
  .welcome {
    font-size: 1.8rem;
    color: #222;
    margin-bottom: 1.5rem;
  }

  .logo {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 2.5rem;
  }

  .title {
    font-size: 1.5rem;
    color: #222;
    margin-bottom: 1.8rem;
  }

  /* Button styles */
  .buttons {
    width: 100%;
    max-width: 100%;
    gap: 1rem;
  }

  .action-btn {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    border-radius: 0.5rem;
  }

  .login-btn {
    background: linear-gradient(135deg, #3d8b40, #6fa832);
  }

  .register-btn {
    background: linear-gradient(135deg, #1a7fd8, #2f3f9e);
  }

  /* Form elements */
  .form-group {
    margin-bottom: 1.2rem;
    width: 100%;
  }

  .form-group label {
    color: #555;
    font-size: 0.95rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.9rem;
    font-size: 1rem;
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid #ddd;
    color: #333;
  }

  .form-group input:focus {
    background: rgba(0, 0, 0, 0.08);
    border-color: #4caf50;
  }

  .submit-btn {
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    background: linear-gradient(135deg, #e68a00, #d84315);
  }

  /* Back button */
  .back-btn {
    margin-top: 1.5rem;
    color: #555;
    font-size: 1rem;
    font-weight: 500;
  }

  .back-btn:hover {
    color: #000;
  }

  /* Background elements adjustment */
  .circle {
    filter: blur(40px);
    opacity: 0.6;
  }

  .circle-green {
    width: 300px;
    height: 300px;
    top: -50px;
    left: -50px;
  }

  .circle-orange {
    width: 300px;
    height: 300px;
    bottom: -50px;
    right: -50px;
  }
}

/* Extra small devices (phones) */
@media (max-width: 480px) {
  .page {
    padding: 1.5rem 1rem;
    min-height: calc(100vh - 1rem);
  }

  .welcome {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }

  .logo {
    margin-bottom: 2rem;
  }

  .title {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }

  .action-btn,
  .submit-btn {
    padding: 0.9rem;
    font-size: 1rem;
  }

  .form-group input {
    padding: 0.8rem;
  }

  .back-btn {
    font-size: 0.9rem;
  }
  .circle {
    filter: blur(30px);
    opacity: 0.5;
  }

  .circle-green {
    width: 250px;
    height: 250px;
    top: -30px;
    left: -30px;
  }

  .circle-orange {
    width: 250px;
    height: 250px;
    bottom: -30px;
    right: -30px;
  }
  .app-container {
    background-color: #121212;
  }

  .page {
    background: rgba(255, 255, 255, 0.1);
    color: #e0e0e0;
  }

  .form-group input {
    background: rgba(255, 255, 255, 0.2);
    color: #e0e0e0;
    border-color: rgba(255, 255, 255, 0.3);
  }

  .form-group input:focus {
    background: rgba(255, 255, 255, 0.25);
    border-color: #4caf50;
  }

  .action-btn,
  .submit-btn {
    background: linear-gradient(135deg, #4caf50, #8bc34a);
    color: white;
  }

  .login-btn,
  .register-btn,
  .submit-btn {
    box-shadow: none;
    transition: none;
  }

  .back-btn {
    color: #e0e0e0;
  }

  .back-btn:hover {
    color: #fff;
  }
}
/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .app-container {
    background-color: #121212;
  }

  .page {
    background: rgba(255, 255, 255, 0.1);
    color: #e0e0e0;
  }

  .form-group input {
    background: rgba(255, 255, 255, 0.2);
    color: #e0e0e0;
    border-color: rgba(255, 255, 255, 0.3);
  }

  .form-group input:focus {
    background: rgba(255, 255, 255, 0.25);
    border-color: #4caf50;
  }

  .action-btn,
  .submit-btn {
    background: linear-gradient(135deg, #4caf50, #8bc34a);
    color: white;
  }

  .login-btn,
  .register-btn,
  .submit-btn {
    box-shadow: none;
    transition: none;
  }

  .back-btn {
    color: #e0e0e0;
  }

  .back-btn:hover {
    color: #fff;
  }
}
</style>
