<template>
  <div class="main">
    <!-- <Test></Test> -->
    <p>{{ t("common.username") }}</p>
    <a-button type="primary" class="buttonP" @click="changeLang('zh_CN')">{{ t("setting.chinese") }}</a-button>
    <a-button @click="changeLang('en_US')">{{ t("setting.english") }}</a-button>
    <a-button type="dashed" @click="changeLang('ja_JP')">{{ t("setting.japanese") }}</a-button>

    <a-date-picker v-model:value="value1" />
    <a-date-picker v-model:value="value2" picker="week" />
    <a-date-picker v-model:value="value3" picker="month" />
    <a-date-picker v-model:value="value4" picker="quarter" />
    <a-date-picker v-model:value="value5" picker="year" />
  </div>
</template>

<script lang="ts" setup>
// import Test from "./test/test.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
const { t, locale } = useI18n();
import type { Dayjs } from "dayjs";
const store = useGlobalStore();
const { language } = storeToRefs(store);
const changeLang = (lang: string) => {
  language.value = lang;
  locale.value = lang;
};

const value1 = ref<Dayjs>();
const value2 = ref<Dayjs>();
const value3 = ref<Dayjs>();
const value4 = ref<Dayjs>();
const value5 = ref<Dayjs>();
</script>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
