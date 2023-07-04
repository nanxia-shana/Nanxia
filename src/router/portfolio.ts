const portfolioChildren = [
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
        name: "WaterfallFlow",
        component: () => import("@/views/portfolio/mobile/WaterfallFlow.vue"),
        meta: {
          title: {
            "/zh-CN": "瀑布流",
            "/en-US": "WaterfallFlow",
          },
        },
      },
    ],
  },
];

export default portfolioChildren;
