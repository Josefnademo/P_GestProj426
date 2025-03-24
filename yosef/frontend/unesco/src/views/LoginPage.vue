<template>
  <div class="login-container">
    <div class="circle circle-green"></div>
    <div class="circle circle-orange"></div>

    <div class="book" :class="{ flipped: isFlipped }" @click="handleBookClick">
      <!-- Left page (Welcome) -->
      <div class="page page-left">
        <div class="welcome">Content de vous revoir !</div>
        <div class="login-title">ACD Motorsport</div>
        <button class="flip-button" @click.stop="flipBook">Login</button>
      </div>

      <!-- Right page (Login form) -->
      <div class="page page-right">
        <div class="connect-title">Se connecter</div>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              placeholder="Entrez votre nom"
              v-model="username"
            />
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              v-model="password"
            />
          </div>

          <button type="submit" class="login-button">Se connecter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginBook",
  data() {
    return {
      isFlipped: false,
      username: "",
      password: "",
    };
  },
  methods: {
    flipBook() {
      this.isFlipped = !this.isFlipped;
    },
    handleBookClick(e) {
      // Close the book if clicked outside when it's flipped
      if (this.isFlipped && !e.target.closest(".page-right")) {
        this.isFlipped = false;
      }
    },
    handleSubmit() {
      // Handle form submission
      console.log("Login submitted:", this.username, this.password);
      // Add your authentication logic here
    },
  },
};
</script>

<style scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Background circles */
.circle {
  position: absolute;
  border-radius: 70%;
  filter: blur(70px);
  opacity: 0.6;
  z-index: 0;
}

.circle-green {
  width: 70px;
  height: 400px;
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  box-shadow: 0 0 100px #4caf50;
  margin-top: 2%;
  margin-left: 10%;
}

.circle-orange {
  width: 100px;
  height: 300px;
  background: linear-gradient(135deg, #ff9800, #ff5722);
  box-shadow: 0 0 120px #ff9800;
  margin-top: 20%;
  margin-right: -90%;
}
/* Book container */
.book {
  display: flex;
  width: 800px;
  height: 500px;
  perspective: 2000px;
  z-index: 1;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Page styling */
.page {
  position: absolute;
  width: 50%;
  height: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(89, 87, 104, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.8s ease;
}

/* Left page (welcome) */
.page-left {
  left: 0;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  transform-origin: right center;
  backface-visibility: hidden;
}

/* Right page (login form) */
.page-right {
  right: 0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  transform-origin: left center;
  transform: rotateY(180deg);
  backface-visibility: hidden;
}

/* Flipped state */
.book.flipped {
  transform: rotateY(180deg);
}

.book.flipped .page-left {
  opacity: 0;
  pointer-events: none;
}

.book.flipped .page-right {
  opacity: 1;
  pointer-events: all;
}

/* Rest of your styles remain the same */
.welcome {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.8);
}

.flip-button {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
  transition: all 0.3s ease;
}

.flip-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(76, 175, 80, 0.6);
}

.connect-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
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
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.login-button {
  background: linear-gradient(135deg, #ff9800, #ff5722);
  color: white;
  border: none;
  padding: 15px 0;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);
  transition: all 0.3s ease;
}

.login-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(255, 152, 0, 0.6);
}

.footer {
  margin-top: 40px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.footer-links {
  margin-top: 10px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin: 0 10px;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #4caf50;
  text-decoration: underline;
}
</style>
