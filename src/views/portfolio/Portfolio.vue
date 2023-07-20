<template>
  <div class="portfolio">
    <div class="left">
      <span class="title" @click="toPortfolio">{{ t("common.portfolio") }}</span>
      <div class="box">
        <div class="box-item">
          <span class="box-item-name" @click="toMobile">{{ t("portfolio.mobile") }} :</span>
          <div class="box-item-box">
            <a-tag
              :color="tagColorList[index % 7]"
              v-for="(item, index) in mobileDemoList"
              :key="index"
              @click="toDemo(item)"
              >{{ item.name }}</a-tag
            >
          </div>
        </div>
        <div class="box-item">
          <span class="box-item-name" @click="toComputer">{{ t("portfolio.computer") }} :</span>
          <div class="box-item-box">
            <a-tag
              :color="tagColorList[6 - (index % 7)]"
              v-for="(item, index) in computerDemoList"
              :key="index"
              @click="toDemo(item)"
              >{{ item.name }}</a-tag
            >
          </div>
        </div>
      </div>
    </div>

    <div class="right" :class="[rightRoute ? (rightRoute == 'mobile' ? 'rightFoldM' : 'rightFoldC') : '']">
      <div class="title" :class="{ titleShow: !rightRoute }">
        <span class="title-name">{{ refreshBtnName }}</span>
        <a-button shape="circle" @click="router.go(0)">
          <template #icon><reload-outlined /></template>
        </a-button>
      </div>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ReloadOutlined } from "@ant-design/icons-vue";
import { reactive, ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const router = useRouter();
const rightRoute = ref<string>("");
const refreshBtnName = ref<string>("");
const tagColorList = ref(["pink", "red", "orange", "green", "cyan", "blue", "purple"]);
const mobileDemoList = reactive([
  {
    name: `${t("portfolio.waterfallFlow")}(component)`,
    route: "/portfolio/mobile/waterfallFlow",
  },
  {
    name: `${t("portfolio.instantMusicVideo")}`,
    route: "/portfolio/mobile/instantMusicVideo",
  },
  {
    name: `${t("portfolio.musicPlayer")}`,
    route: "/portfolio/mobile/musicPlayer",
  },
]);
const computerDemoList = reactive([
  {
    name: `${t("portfolio.waterfallFlow")}(component)`,
    route: "/portfolio/computer/waterfallFlow",
  },
]);
onMounted(() => {
  if (router.currentRoute.value.path === "/portfolio") rightRoute.value = "";
  else if (router.currentRoute.value.path.indexOf("/mobile") != -1) rightRoute.value = "mobile";
  else rightRoute.value = "computer";
});
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    let lastRouteName = newValue.split("/").reverse();
    if (lastRouteName.length < 3) {
      rightRoute.value = "";
      return;
    }
    refreshBtnName.value = t(`portfolio.${lastRouteName[0]}`);
    if (newValue === "/portfolio") rightRoute.value = "";
    else if (newValue.indexOf("/mobile") != -1) rightRoute.value = "mobile";
    else rightRoute.value = "computer";
  },
  { immediate: true },
);
const toPortfolio = () => {
  // rightRoute.value = "";
  router.push("/portfolio");
};
const toMobile = () => {
  rightRoute.value = "mobile";
  router.push("/portfolio/mobile");
};
const toComputer = () => {
  rightRoute.value = "computer";
  router.push("/portfolio/computer");
};
const toDemo = (item: any) => {
  router.push(item.route);
};
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
          // width: 100%;
          width: fit-content;
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
    // background: linear-gradient(to right, #c0a8ff, #ed7275);
    display: flex;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    .title {
      position: absolute;
      top: 10px;
      display: flex;
      justify-content: center;
      align-items: baseline;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      &-name {
        margin-right: 10px;
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
      }
    }
    .titleShow {
      visibility: hidden;
      opacity: 0;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  .rightFoldM {
    width: 900px;
    border-left: 2px solid var(--primary-color);
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .rightFoldC {
    width: 1000px;
    border-left: 2px solid var(--primary-color);
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>
