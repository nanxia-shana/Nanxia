const showpageRouter = [
  {
    path: "/showPage/waterfallFlow",
    name: "WaterfallFlow",
    component: () => import("@/views/portfolio/computer/WaterfallFlow.vue"),
    meta: {
      title: {
        "/zh-CN": "瀑布流",
        "/en-US": "WaterfallFlow",
      },
    },
  },
  {
    path: "/showPage/GEO-SVG-Map",
    name: "GEO-SVG-Map",
    component: () => import("@/views/portfolio/computer/GEO-SVG-Map.vue"),
    meta: {
      title: {
        "/zh-CN": "地图（SVG）",
        "/en-US": "GEO-SVG-Map",
      },
    },
  },
  {
    path: "/showPage/AMap",
    name: "AMapp",
    component: () => import("@/views/portfolio/mobile/AMap.vue"),
    meta: {
      title: {
        "/zh-CN": "瀑布流",
        "/en-US": "WaterfallFlow",
      },
    },
  },
];

export default showpageRouter;
