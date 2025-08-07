<template>
  <div class="portfolio">
    <div class="menu">
      <span class="title" @click="toPortfolio">{{ t("common.common02-002") }}</span>
      <div class="box" v-show="!rightRoute">
        <div class="box-item">
          <span class="box-item-name" @click="toMobile">{{ t("portfolio.portfolio01-001") }} :</span>
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
          <span class="box-item-name" @click="toComputer">{{ t("portfolio.portfolio01-002") }} :</span>
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
        <div class="box-item">
          <span class="box-item-name" @click="toWebGL">WebGL :</span>
          <div class="box-item-box">
            <a-tag
              :color="tagColorList[index % 7]"
              v-for="(item, index) in webglDemoList"
              :key="index"
              @click="toDemo(item)"
              >{{ item.name }}</a-tag
            >
          </div>
        </div>
      </div>
    </div>

    <div class="content" :class="[rightRoute ? (rightRoute == 'mobile' ? 'rightFoldSP' : rightRoute == 'computer' ? 'rightFoldPC' : 'rightFoldGL') : '']">
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
    name: `${t("portfolio.portfolio01-006")}`,
    route: "/portfolio/mobile/waterfallFlow",
  },
  {
    name: `${t("portfolio.portfolio01-007")}`,
    route: "/portfolio/mobile/instantMusicVideo",
  },
  {
    name: `${t("portfolio.portfolio01-008")}`,
    route: "/portfolio/mobile/musicPlayer",
  },
  {
    name: `${t("portfolio.portfolio01-010")}`,
    route: "/portfolio/mobile/AMap",
  },
]);
const computerDemoList = reactive([
  {
    name: `${t("portfolio.portfolio01-006")}`,
    route: "/portfolio/computer/waterfallFlow",
  },
  {
    name: `${t("portfolio.portfolio01-009")}`,
    route: "/portfolio/computer/GEO-SVG-Map",
  },
]);
const webglDemoList = reactive([
  {
    name: `Sphere`,
    route: "/portfolio/webgl/sphere",
  },
  {
    name: `Earth`,
    route: "/portfolio/webgl/earth",
  },
]);
onMounted(() => {
  if (router.currentRoute.value.path === "/portfolio") rightRoute.value = "";
  else if (router.currentRoute.value.path.indexOf("/mobile") != -1) rightRoute.value = "mobile";
  else if (router.currentRoute.value.path.indexOf("/computer") != -1) rightRoute.value = "computer";
  else rightRoute.value = "webgl";
});
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    let lastRoute = newValue.split("/").reverse();
    if (lastRoute.length < 3) {
      rightRoute.value = "";
      return;
    }
    if (lastRoute[1].match(/[a-zA-Z]/g).join("") == "mobile") {
      refreshBtnName.value = mobileDemoList.find(
        (e) =>
          e.route
            .split("/")
            .reverse()[0]
            .match(/[a-zA-Z]/g)
            .join("") == lastRoute[0].match(/[a-zA-Z]/g).join(""),
      )?.name;
    } else if (lastRoute[1].match(/[a-zA-Z]/g).join("") == "computer") {
      refreshBtnName.value = computerDemoList.find(
        (e) =>
          e.route
            .split("/")
            .reverse()[0]
            .match(/[a-zA-Z]/g)
            .join("") == lastRoute[0].match(/[a-zA-Z]/g).join(""),
      )?.name;
    } else if (lastRoute[1].match(/[a-zA-Z]/g).join("") == "webgl") {
      refreshBtnName.value = webglDemoList.find(
        (e) =>
          e.route
            .split("/")
            .reverse()[0]
            .match(/[a-zA-Z]/g)
            .join("") == lastRoute[0].match(/[a-zA-Z]/g).join(""),
      )?.name;
    }
    if (newValue === "/portfolio") rightRoute.value = "";
    else if (newValue.indexOf("/mobile") != -1) rightRoute.value = "mobile";
    else if (newValue.indexOf("/computer") != -1) rightRoute.value = "computer";
    else rightRoute.value = "webgl";
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
const toWebGL = () => {
  rightRoute.value = "webgl";
  router.push("/portfolio/webgl");
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
  flex-direction: column;
  .menu {
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
      padding: 0 20px;
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
          border: 1px solid var(--primary-color);
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
  .content {
    width: 100%;
    // background: linear-gradient(to right, #c0a8ff, #ed7275);
    display: flex;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    .title {
      position: absolute;
      top: 10px;
      display: flex;
      justify-content: center;
      align-items: baseline;
      transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      &-name {
        margin-right: 10px;
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
        color: var(--primary-color);
      }
    }
    .titleShow {
      display: none;
      opacity: 0;
      transition: opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>
