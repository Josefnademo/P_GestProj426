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
              />
            </div>
            <div class="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                v-model="loginForm.password"
              />
            </div>
            <button type="submit" class="submit-btn">Se connecter</button>
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
              />
            </div>
            <div class="form-group">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Choisissez un nom"
                v-model="registerForm.username"
              />
            </div>
            <div class="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Créez un mot de passe"
                v-model="registerForm.password"
              />
            </div>
            <button type="submit" class="submit-btn">S'inscrire</button>
          </form>
          <div class="back-btn" @click="flipTo('cover')">← Retour</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InteractiveBook",
  data() {
    return {
      currentPage: "cover",
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
    },
    handleLogin() {
      console.log("Login submitted:", this.loginForm);
      // Add login logic
    },
    handleRegister() {
      console.log("Register submitted:", this.registerForm);
      // Add registration logic
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
.login,
.register {
  transform: rotateY(180deg);
  z-index: 2;
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

/* Book Flip Animations */
.flipped-login {
  transform: rotateY(-180deg);
}

.flipped-register {
  transform: rotateY(-180deg);
}

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
}
</style>
