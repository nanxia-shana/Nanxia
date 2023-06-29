import { defineStore } from "pinia";
const global = defineStore("global", {
  state: () => {
    return {
      language: "zh_CN",
    };
  },
});
export default global;
