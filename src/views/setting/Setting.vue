<template>
  <div class="setting">
    <span class="title">{{ t("common.setting") }}</span>
    <div class="box">
      <div class="box-item">
        <div class="box-item-ddd"></div>
        <span class="box-item-name">{{ t("setting.language") }} :</span>
        <a-radio-group v-model:value="curLang" @change="changeLang">
          <a-radio-button value="zh_CN">{{ t("setting.chinese") }}</a-radio-button>
          <a-radio-button value="en_US">{{ t("setting.english") }}</a-radio-button>
          <a-radio-button value="ja_JP">{{ t("setting.japanese") }}</a-radio-button>
        </a-radio-group>
      </div>
      <!-- 开关切换模式 -->
      <div class="box-item">
        <span class="box-item-name">{{ t("setting.mode") }} :</span>
        <a-switch v-model:checked="curMode" @change="changeMode" disabled />
      </div>
      <!-- 切换主题 -->
      <div class="box-item">
        <span class="box-item-name">{{ t("setting.theme") }} :</span>
        <a-radio-group v-model:value="curTheme" @change="changeTheme">
          <a-radio-button value="violet">{{ t("setting.violet") }}</a-radio-button>
          <a-radio-button value="green">{{ t("setting.green") }}</a-radio-button>
        </a-radio-group>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
const { t } = useI18n();
const store = useGlobalStore();
const { language, theme, mode } = storeToRefs(store);

const curLang = ref<string>(language.value);
const curTheme = ref<string>(theme.value);
const curMode = ref<boolean>(mode.value == "light" ? true : false);

const changeLang = (e) => {
  store.switchLang(e.target.value);
};
const changeTheme = (e) => {
  store.switchTheme(e.target.value);
};
const changeMode = (e) => {
  store.switchMode(e ? "light" : "dark");
};

onMounted(() => {
  console.log("Setting-Page");
});
</script>
<style lang="less" scoped>
.setting {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 38px;
    font-weight: 600;
  }
  .box {
    padding: 60px 20px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    &-item {
      margin-bottom: 30px;
      &-name {
        width: 100px;
        margin-right: 60px;
        font-size: 18px;
        font-weight: 600;
        display: inline-block;
        text-align: end;
      }
    }
  }
}
</style>
