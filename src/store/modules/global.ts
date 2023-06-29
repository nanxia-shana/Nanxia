import { defineStore } from "pinia";
const global = defineStore("global", {
  state: () => {
    return {
      language: "zh-CN",
    };
  },
});
export default global;
