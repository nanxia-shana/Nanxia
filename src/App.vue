<template>
  <a-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component" @contextmenu.stop="rightClick" />
    </router-view>
  </a-config-provider>
  <audio v-show="false" ref="audioPlayerRef" controls @play="musicPlaying" @pause="musicPause" @timeupdate="musicTimeupdate">
    <source src="@/assets/audios/II. Largo appassionato.mp3" type="audio/mpeg" />
  </audio>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, provide } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";
import jaJP from "ant-design-vue/es/locale/ja_JP";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
const store = useGlobalStore();
const { language, music } = storeToRefs(store);
dayjs.locale("zh-cn");
const locale = ref(zhCN);

const audioPlayerRef = ref<HTMLAudioElement>();
const musicLength = ref<number>(music.value.musicLength);
const musicCurTime = ref<number>(music.value.musicCurTime);
const musicIsPlay = ref<boolean>(music.value.musicIsPlay);
provide("musicLength", musicLength);
provide("musicCurTime", musicCurTime);
provide("musicIsPlay", musicIsPlay);
provide("audioPlayerRef", audioPlayerRef);

watch(language, (val: string) => {
  locale.value = val == "zh_CN" ? zhCN : val == "en_US" ? enUS : jaJP;
});

watch(
  () => music.value.musicLength,
  (val: number) => {
    musicLength.value = val;
  },
);
watch(
  () => music.value.musicCurTime,
  (val: number) => {
    musicCurTime.value = val;
  },
);
watch(
  () => music.value.musicIsPlay,
  (val: boolean) => {
    musicIsPlay.value = val;
  },
);
onMounted(() => {
  store.switchLang(localStorage.getItem("Shana-locale") ? localStorage.getItem("Shana-locale") : "zh_CN");
  store.switchTheme(localStorage.getItem("Shana-theme") ? localStorage.getItem("Shana-theme") : "violet");
  store.switchMode(localStorage.getItem("Shana-mode") ? localStorage.getItem("Shana-mode") : "light");
});
const rightClick = (e) => {
  console.log(e);
};
const musicPlaying = () => {
  store.playMusic(true);
};
const musicPause = () => {
  store.playMusic(false);
};
const musicTimeupdate = (e: any) => {
  store.musicCurTimeSync(Math.floor(e.srcElement.currentTime));
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
