<template>
  <div class="portfolio">
    <div class="left">
      <span class="title" @click="toPortfolio">{{ t("common.portfolio") }}</span>
      <div class="box">
        <div class="box-item">
          <span class="box-item-name" @click="toMobile">移动端 :</span>
          <div class="box-item-box">
            <a-tag :color="tagColorList[index % 7]" v-for="index in 20" :key="index">pink</a-tag>
          </div>
        </div>
        <div class="box-item">
          <span class="box-item-name" @click="toComputer">电脑端 :</span>
          <div class="box-item-box">
            <a-tag :color="tagColorList[index % 7]" v-for="index in 20" :key="index">pink</a-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="right" :class="{ rightFold: rightRoute }">
      <router-view v-slot="{ Component }">
        <!-- <transition name="fade"> -->
        <component :is="Component" />
        <!-- </transition> -->
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const tagColorList = ref(["pink", "red", "orange", "green", "cyan", "blue", "purple"]);
const router = useRouter();
const rightRoute = ref<boolean>(false);
const toPortfolio = () => {
  rightRoute.value = false;
  router.push("/portfolio");
};
const toMobile = () => {
  rightRoute.value = true;
  router.push("/portfolio/mobile");
};
const toComputer = () => {
  rightRoute.value = true;
  router.push("/portfolio/computer");
};
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    if (newValue === "/portfolio") rightRoute.value = false;
    else rightRoute.value = true;
  },
  { immediate: true },
);
</script>
<style lang="less" scoped>
.portfolio {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    min-width: 280px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .title {
      width: fit-content;
      margin-bottom: 20px;
      font-size: 38px;
      font-weight: 600;
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      cursor: pointer;
    }
    .title:hover {
      color: var(--primary-color);
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .box {
      width: fit-content;
      padding: 0 20px 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      &-item {
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        &-name {
          width: fit-content;
          padding: 0 10px;
          margin-bottom: 16px;
          font-size: 20px;
          font-weight: 600;
          color: var(--primary-color);
          border: 2px dashed rgba(255, 255, 255, 0);
          border-radius: 4px;
          display: inline-block;
          box-sizing: border-box;
          cursor: pointer;
        }
        &-name:hover {
          border: 2px dashed var(--primary-color);
          border-radius: 4px;
        }
        &-box {
          width: 100%;
          padding: 6px;
          border: 1px solid #c0a8ff;
          border-radius: 4px;
          display: flex;
          flex-wrap: wrap;
          span {
            margin: 8px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .right {
    width: 0;
    border-left: 2px solid rgba(255, 255, 255, 0);
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .rightFold {
    width: 1000px;
    border-left: 2px solid var(--primary-color);
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
