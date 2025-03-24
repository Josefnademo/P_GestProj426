import { createRouter, createWebHistory } from "vue-router";
import home from "../components/home.vue";
import about from "../components/about.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
