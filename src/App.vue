<template>
  <a-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
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
watch(language, (val: string) => {
  locale.value = val == "zh_CN" ? zhCN : val == "en_US" ? enUS : jaJP;
});
</script>
<style>
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
