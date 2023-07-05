<template>
  <a-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" @contextmenu.stop="rightClick" />
      </transition>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";
import jaJP from "ant-design-vue/es/locale/ja_JP";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
const store = useGlobalStore();
const { language } = storeToRefs(store);
dayjs.locale("zh-cn");
const locale = ref(zhCN);
const rightClick = (e) => {
  console.log(e);
};
watch(language, (val: string) => {
  locale.value = val == "zh_CN" ? zhCN : val == "en_US" ? enUS : jaJP;
});
onMounted(() => {
  store.switchLang(localStorage.getItem("Shana-locale") ? localStorage.getItem("Shana-locale") : "zh_CN");
  store.switchTheme(localStorage.getItem("Shana-theme") ? localStorage.getItem("Shana-theme") : "violet");
  store.switchMode(localStorage.getItem("Shana-mode") ? localStorage.getItem("Shana-mode") : "light");
});
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
