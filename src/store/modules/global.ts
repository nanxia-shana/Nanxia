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
      musicList: [],
      music: {
        id: 1,
        url: "/src/assets/audios/川田まみ - 光芒.mp3",
        imgUrl: "file05.jpeg",
        name: "II. Largo appassionato",
        author: "Ludwig van Beethoven",
        lyric: "",
        tlyric: "",
        duration: 0,
      },
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
    musicLoadMsg(musicInfo: any) {
      this.music.id = musicInfo.id;
      this.music.url = musicInfo.url;
      this.music.imgUrl = musicInfo.imgUrl;
      this.music.name = musicInfo.name;
      this.music.author = musicInfo.author;
      this.music.lyric = musicInfo.lyric;
      this.music.tlyric = musicInfo.tlyric;
    },
    loadingMusic(array: any) {
      this.musicList = array;
    },
    nextMusic(id: number) {
      const index = this.musicList.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        let nextItem: any;
        if (index < this.musicList.length - 1) {
          nextItem = this.musicList[index + 1];
        } else if (index === this.musicList.length - 1) {
          nextItem = this.musicList[0];
        }
        this.music.id = nextItem.id;
        this.music.url = nextItem.url;
        this.music.imgUrl = nextItem.imgUrl;
        this.music.name = nextItem.name;
        this.music.author = nextItem.author;
        this.music.lyric = nextItem.lyric;
        this.music.tlyric = nextItem.tlyric;
        return nextItem;
      } else {
        console.log("next:传入ID不存在于歌单中");
        return false;
      }
    },
    lastMusic(id: number) {
      const index = this.musicList.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        let lastItem: any;
        if (index > 0) {
          lastItem = this.musicList[index - 1];
        } else if (index === 0) {
          lastItem = this.musicList[this.musicList.length - 1];
        }
        this.music.id = lastItem.id;
        this.music.url = lastItem.url;
        this.music.imgUrl = lastItem.imgUrl;
        this.music.name = lastItem.name;
        this.music.author = lastItem.author;
        this.music.lyric = lastItem.lyric;
        this.music.tlyric = lastItem.tlyric;
        return lastItem;
      } else {
        console.log("last:传入ID不存在于歌单中");
        return false;
      }
    },
  },
});
export default global;
