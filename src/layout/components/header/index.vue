<template>
  <div class="header">
    <img class="avatar" src="@/assets/images/Iraina3.jpg" alt="avatar" />
    <span class="name">Iraina</span>
    <span class="hello">{{ t("common.hello") }}</span>
    <span class="date">{{ today }}，{{ week }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { timeFormat, getWeekDate } from "@/utils/tools";
const { t } = useI18n();
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
import { watch } from "vue";
const store = useGlobalStore();
const { language } = storeToRefs(store);
let today: string = timeFormat(new Date(), language.value);
let week: string = getWeekDate(new Date(), language.value);
watch(language, (val: string) => {
  today = timeFormat(new Date(), val);
  week = getWeekDate(new Date(), val);
});
</script>
<style lang="less" scoped>
.header {
  width: inherit;
  height: inherit;
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 16px;
    border-radius: 50%;
    cursor: pointer;
  }
  .name {
    margin: 0 20px 0 8px;
    font-size: 18px;
    font-weight: bold;
  }
  .hello,
  .date {
    font-size: 18px;
  }
  .date {
    margin-right: 30px;
    color: #999999;
    font-style: italic;
  }
}
</style>
