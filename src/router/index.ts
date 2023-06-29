import { createRouter, createWebHashHistory } from "vue-router";
import layout from "@/layout/index.vue";

const routes = [
  {
    path: "/",
    component: layout,
    meta: {
      title: {
        "/zh-CN": "首页",
        "/en-US": "Home Page",
      },
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      title: {
        "/zh-CN": "首页",
        "/en-US": "Home Page",
      },
    },
  },
  {
    path: "/noFound",
    name: "NoFound",
    component: () => import("@/views/noFound.vue"),
    meta: {
      title: {
        "/zh-CN": "404",
        "/en-US": "404",
      },
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
