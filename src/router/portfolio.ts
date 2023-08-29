import { RouteRecordRaw } from "vue-router";

const portfolioRouter: Array<RouteRecordRaw> = [
  {
    path: "/portfolio/mobile",
    name: "Mobile",
    component: () => import("@/views/portfolio/mobile/Mobile.vue"),
    meta: {
      title: {
        "/zh-CN": "移动端",
        "/en-US": "Mobile Terminal",
      },
    },
    children: [
      {
        path: "/portfolio/mobile/waterfallFlow",
        name: "WaterfallFlowM",
        component: () => import("@/views/portfolio/mobile/WaterfallFlow.vue"),
        meta: {
          title: {
            "/zh-CN": "瀑布流",
            "/en-US": "WaterfallFlow",
          },
        },
      },
      {
        path: "/portfolio/mobile/instantMusicVideo",
        name: "InstantMusicVideo",
        component: () => import("@/views/portfolio/mobile/InstantMusicVideo.vue"),
        meta: {
          title: {
            "/zh-CN": "瀑布流",
            "/en-US": "Instant Music Video",
          },
        },
      },
      {
        path: "/portfolio/mobile/musicPlayer",
        name: "MusicPlayer",
        component: () => import("@/views/portfolio/mobile/MusicPlayer.vue"),
        meta: {
          title: {
            "/zh-CN": "音乐播放器",
            "/en-US": "Music Player",
          },
        },
      },
      {
        path: "/portfolio/mobile/AMap",
        name: "AMap",
        component: () => import("@/views/portfolio/mobile/AMap.vue"),
        meta: {
          title: {
            "/zh-CN": "高德地图",
            "/en-US": "AMap",
          },
        },
      },
    ],
  },
  {
    path: "/portfolio/computer",
    name: "Computer",
    component: () => import("@/views/portfolio/computer/Computer.vue"),
    meta: {
      title: {
        "/zh-CN": "电脑端",
        "/en-US": "Computer Terminal",
      },
      "/en-US": "WaterfallFlow",
    },
    children: [
      {
        path: "/portfolio/computer/waterfallFlow",
        name: "WaterfallFlowC",
        component: () => import("@/views/portfolio/computer/WaterfallFlow.vue"),
        meta: {
          title: {
            "/zh-CN": "瀑布流",
            "/en-US": "WaterfallFlow",
          },
        },
      },
      {
        path: "/portfolio/computer/GEO-SVG-Map",
        name: "GEO-SVG-MapC",
        component: () => import("@/views/portfolio/computer/GEO-SVG-Map.vue"),
        meta: {
          title: {
            "/zh-CN": "地图（SVG）",
            "/en-US": "GEO-SVG-Map",
          },
        },
      },
    ],
  },
  {
    path: "/portfolio/webgl",
    name: "Webgl",
    component: () => import("@/views/portfolio/webGL/ThreeJs.vue"),
    meta: {
      title: {
        "/zh-CN": "Webgl",
        "/en-US": "Webgl",
      },
    },
    children: [
      {
        path: "/portfolio/webgl/sphere",
        name: "Sphere",
        component: () => import("@/components/threeJs/Sphere.vue"),
        meta: {
          title: {
            "/zh-CN": "球体",
            "/en-US": "Sphere",
          },
        },
      },
      {
        path: "/portfolio/webgl/earth",
        name: "Earth",
        component: () => import("@/components/threeJs/Earth.vue"),
        meta: {
          title: {
            "/zh-CN": "地球",
            "/en-US": "Earth",
          },
        },
      },
    ],
  },
];

export default portfolioRouter;
