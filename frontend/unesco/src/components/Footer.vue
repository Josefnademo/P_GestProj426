<template>
  <footer>
    <ul>
      <li>INFOS & RESERVATIONS</li>
      <li>+41 79 417 71 55</li>
      <li>ccroset@acd-motorsport.ch</li>
    </ul>
    <a href="HomePage.vue"
      ><img src="./Logos/logo-ACD.png" alt="logo ACD motorsport"
    /></a>
  </footer>
</template>
<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(89, 87, 104, 0.8); /* Matching book style */
  padding: 1.5rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px); /* Frosted glass effect */
  z-index: 100;
}

footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

footer ul li {
  font-family: "Montserrat", sans-serif; /* Matching book font */
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

footer ul li:first-child {
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: white;
  font-size: 1rem;
}

footer img {
  height: 50px;
  width: auto;
  transition: transform 0.3s ease;
  opacity: 0.9;
}

footer a:hover img {
  transform: scale(1.05);
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  footer {
    padding: 1.2rem 2rem;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  footer ul {
    margin-bottom: 0.5rem;
  }

  footer img {
    height: 40px;
  }
}

@media (max-width: 480px) {
  footer {
    padding: 1rem;
  }

  footer ul li {
    font-size: 0.8rem;
  }

  footer ul li:first-child {
    font-size: 0.9rem;
  }

  footer img {
    height: 35px;
  }
}
</style>
