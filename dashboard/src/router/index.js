import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { createAuthGuard } from "@auth0/auth0-vue";
import app from "../app";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      beforeEnter: createAuthGuard(app),
      component: () => import("../views/DashboardView.vue"),
    },
  ],
});

export default router;
