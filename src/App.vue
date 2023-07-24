<template>
  <a-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" @contextmenu.stop="rightClick" />
    </router-view>
  </a-config-provider>
  <audio v-show="false" ref="audioPlayerRef" controls @play="musicPlaying" @pause="musicPause" @timeupdate="musicTimeupdate">
    <source :src="musicUrl" type="audio/mpeg" />
    <source :src="musicUrl" type="audio/flac" />
  </audio>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, provide, getCurrentInstance } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";
import jaJP from "ant-design-vue/es/locale/ja_JP";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
const instance: any = getCurrentInstance();
const store = useGlobalStore();
const { language, music } = storeToRefs(store);
dayjs.locale("zh-cn");
const locale = ref(zhCN);

const audioPlayerRef = ref<HTMLAudioElement>();
const musicId = ref<number>(music.value.id);
const musicUrl = ref<string>(music.value.url);
const musicImgUrl = ref<string>(music.value.imgUrl);
const musicName = ref<string>(music.value.name);
const musicAuthor = ref<string>(music.value.author);
const musicLyric = ref<string>(music.value.lyric);
const musicTlyric = ref<string>(music.value.tlyric);
const musicDuration = ref<number>(0);
const musicCurTime = ref<number>(0);
const musicIsPlay = ref<boolean>(false);
provide("musicId", musicId);
provide("musicImgUrl", musicImgUrl);
provide("musicName", musicName);
provide("musicAuthor", musicAuthor);
provide("musicLyric", musicLyric);
provide("musicTlyric", musicTlyric);
provide("musicDuration", musicDuration);
provide("musicCurTime", musicCurTime);
provide("musicIsPlay", musicIsPlay);
provide("audioPlayerRef", audioPlayerRef);
onMounted(() => {
  audioPlayerRef.value.preload = "auto";
  instance.proxy.$request
    .get("/user/getMusicList", {
      currentPage: 0,
      pageSize: 5,
    })
    .then((res: any) => {
      store.loadingMusic(res.data);
      store.musicLoadMsg(res.data[1]);
    });
  store.switchLang(localStorage.getItem("Shana-locale") ? localStorage.getItem("Shana-locale") : "zh_CN");
  store.switchTheme(localStorage.getItem("Shana-theme") ? localStorage.getItem("Shana-theme") : "violet");
  store.switchMode(localStorage.getItem("Shana-mode") ? localStorage.getItem("Shana-mode") : "light");
});
watch(language, (val: string) => {
  locale.value = val == "zh_CN" ? zhCN : val == "en_US" ? enUS : jaJP;
});
watch(
  () => music.value,
  (val: any) => {
    musicId.value = val.id;
    musicUrl.value = val.url;
    musicImgUrl.value = val.imgUrl;
    musicName.value = val.name;
    musicAuthor.value = val.author;
    musicLyric.value = val.lyric;
    musicTlyric.value = val.tlyric;
    audioPlayerRef.value.src = val.url;
  },
  {
    deep: true,
  },
);
const rightClick = (e) => {
  console.log(e);
};
const musicPlaying = () => {
  musicDuration.value = audioPlayerRef.value.duration;
  musicIsPlay.value = true;
};
const musicPause = () => {
  musicIsPlay.value = false;
};
const musicTimeupdate = (e: any) => {
  musicCurTime.value = Math.floor(e.srcElement.currentTime);
};
</script>
<style>
#app {
  min-width: 1200px;
  min-height: 800px;
  height: 100vh;
}
* {
  transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0s,
    background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.buttonP:hover,
.buttonP:focus {
  color: #fff !important;
}
:root {
  --animate-duration: 0.3s;
  --animate-delay: 0s;
}
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
