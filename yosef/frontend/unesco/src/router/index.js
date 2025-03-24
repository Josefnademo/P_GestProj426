import { createRouter, createWebHistory } from "vue-router";
import SearchPage from "../components/SearchPage.vue";
import LoginPage from "../views/LoginPage.vue";
import DetailsPage from "../views/DetailsPage.vue";
import AccountPage from "../views/AccountPage.vue";

const routes = [
  /* {
    path: "/",
    name: "accueil"
    views: HomePage,
  },*/
  {
    path: "/search",
    name: "Search",
    component: SearchPage,
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
