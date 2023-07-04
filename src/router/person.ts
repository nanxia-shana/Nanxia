const personRouter = [
  {
    path: "/person/character",
    name: "Character",
    component: () => import("@/views/person/Character.vue"),
    meta: {
      title: {
        "/zh-CN": "角色卡片",
        "/en-US": "Character Card",
      },
    },
  },
];

export default personRouter;
