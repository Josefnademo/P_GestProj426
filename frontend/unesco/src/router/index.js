import { createRouter, createWebHistory } from "vue-router";
import home from "../components/home.vue";
import search from "../components/search.vue";
import about from "../components/about.vue";
import LoginPage from "../views/LoginPage.vue";
import DetailsPage from "../views/DetailsPage.vue";
import AccountPage from "../views/AccountPage.vue";

const routes = [
  { path: "/", component: home },
  { path: "/about", component: about },
  {
    path: "/search",
    component: search,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/details",
    name: "Details",
    component: DetailsPage,
  },
  {
    path: "/account",
    name: "Account",
    component: AccountPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
