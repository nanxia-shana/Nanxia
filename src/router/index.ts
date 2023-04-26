import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "登录",
    component: () => import("../views/login/Login.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/",
    name: "",
    component: () => import("../views/login/Login.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/main",
    name: "主页",
    component: () => import("../views/Main.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
