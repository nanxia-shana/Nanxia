const portfolioRouter = [
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
    ],
  },
];

export default portfolioRouter;
