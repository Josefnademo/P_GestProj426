import { createRouter, createWebHistory } from "vue-router";

import home from "../components/home.vue";
import search from "../components/search.vue";
import about from "../components/about.vue";
import LoginPage from "../views/LoginPage.vue";
import DetailsPage from "../views/DetailsPage.vue";
import AccountPage from "../views/AccountPage.vue";

const routes = [
  // / Route return back the home component
  { path: "/", component: home },
  // /about returns the about component
  { path: "/about", component: about },
  // /search returns the search component
  { path: "/search", component: search },
  // /login returns the login component
  { path: "/login", name: "Login", component: LoginPage },
  // /details returns the details component
  {
    path: "/details/lieu/:lieu_id/",
    name: "Details",
    component: DetailsPage,
  },
  // /account returns the account component
  { path: "/account", name: "Account", component: AccountPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
