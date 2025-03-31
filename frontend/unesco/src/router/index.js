import { createRouter, createWebHistory } from "vue-router";
import home from "../components/home.vue";
import about from "../components/about.vue";
import LoginPage from "../views/LoginPage.vue";
import DetailsPage from "../views/DetailsPage.vue";
import AccountPage from "../views/AccountPage.vue";

const routes = [
  {
    path: "/",
    name: "Search",
    component: home,
  },
  {
    path: "/search",
    component: about,
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
