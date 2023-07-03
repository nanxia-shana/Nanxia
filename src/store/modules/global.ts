import { defineStore } from "pinia";
// import { useI18n } from "vue-i18n";
// const { locale } = useI18n();
// 这里在ts文件中必须这样引用locale，否则报错
import i18n from "@/locale";
const { locale } = i18n.global;
import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js";
const global = defineStore("global", {
  state: () => {
    return {
      language: "",
      theme: "",
      mode: "",
    };
  },
  actions: {
    switchLang(lang: string) {
      this.language = lang;
      locale.value = lang;
      localStorage.setItem("Shana-locale", lang);
    },
    switchTheme(theme: string) {
      this.theme = theme;
      localStorage.setItem("Shana-theme", theme);
      toggleTheme({
        scopeName: `theme-${theme}`,
      });
      document.head.querySelector("#theme-link")?.setAttribute("href", `./src/theme/theme-${theme}.css`);
    },
    switchMode(mode: string) {
      this.mode = mode;
      localStorage.setItem("Shana-mode", mode);
      document.head.querySelector("#mode-link")?.setAttribute("href", `./src/theme/mode/mode-${mode}.css`);
    },
  },
});
export default global;
