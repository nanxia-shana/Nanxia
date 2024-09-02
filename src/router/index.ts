import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import layout from "@/layout/index.vue";
import personRouter from "./person";
import portfolioRouter from "./portfolio";
import showpageRouter from "./showpageRouter";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: layout,
    redirect: "/home",
    meta: {
      title: {
        "/zh-CN": "主页",
        "/en-US": "Home Page",
      },
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/Home.vue"),
        meta: {
          title: {
            "/zh-CN": "主页",
            "/en-US": "Home Page",
          },
        },
      },
      {
        path: "/portfolio",
        name: "Portfolio",
        component: () => import("@/views/portfolio/Portfolio.vue"),
        meta: {
          title: {
            "/zh-CN": "作品集",
            "/en-US": "Portfilio Page",
          },
        },
        children: [...portfolioRouter],
      },
      {
        path: "/schedule",
        name: "Schedule",
        component: () => import("@/views/schedule/Schedule.vue"),
        meta: {
          title: {
            "/zh-CN": "时间表",
            "/en-US": "Schedule Page",
          },
        },
      },
      {
        path: "/person",
        name: "Person",
        component: () => import("@/views/person/Person.vue"),
        meta: {
          title: {
            "/zh-CN": "个人中心",
            "/en-US": "Person Page",
          },
        },
      },
      {
        path: "/setting",
        name: "Setting",
        component: () => import("@/views/setting/Setting.vue"),
        meta: {
          title: {
            "/zh-CN": "设置",
            "/en-US": "Setting Page",
          },
        },
      },
      ...personRouter,
    ],
  },
  {
    path: "/showPage",
    name: "ShowPage",
    component: () => import("@/views/showpage/Showpage.vue"),
    meta: {
      title: {
        "/zh-CN": "展示页",
        "/en-US": "Show Page",
      },
    },
    children: [...showpageRouter],
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
  {
    path: "/musicPlayer",
    name: "musicPlayer",
    component: () => import("@/views/portfolio/mobile/MusicPlayer.vue"),
    meta: {
      title: {
        "/zh-CN": "音乐播放",
        "/en-US": "musicPlayer",
      },
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
