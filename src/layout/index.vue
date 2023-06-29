<template>
  <a-layout style="height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" theme="light" :trigger="null" collapsible>
      <div class="logo" />
      <div class="paint"></div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" @select="menuItem">
        <a-menu-item key="1">
          <home-outlined />
          <span> {{ t("common.home") }} </span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span> {{ t("common.home") }} </span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span> {{ t("common.home") }} </span>
        </a-menu-item>
        <a-menu-item key="4">
          <user-outlined />
          <span> {{ t("common.person") }} </span>
        </a-menu-item>
        <a-menu-item key="5">
          <setting-outlined />
          <span> {{ t("common.setting") }} </span>
        </a-menu-item>
      </a-menu>
      <div class="triggerBox" :class="[!collapsed ? 'triggerFold' : 'triggerunFold']" @click="() => (collapsed = !collapsed)">
        <right-outlined class="trigger" />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding: 0">
        <nan-header></nan-header>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <a-button type="primary" class="buttonP">Primary Button</a-button>
        <a-button>Default Button</a-button>
        <a-button type="dashed">Dashed Button</a-button>
        <a-button type="text">Text Button</a-button>
        <a-button type="link">Link Button</a-button>
        <a-radio-group v-model:value="lang" @change="changeLang">
          <a-radio-button value="zh_CN">zh_CN</a-radio-button>
          <a-radio-button value="en_US">en_US</a-radio-button>
          <a-radio-button value="ja_JP">ja_JP</a-radio-button>
        </a-radio-group>
        <!-- 开关切换主题 -->
        <a-switch v-model:checked="checked" checked-children="绿" un-checked-children="黄" @change="change" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js";
import {
  HomeOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import NanHeader from "@/layout/components/header/index.vue";
import { ref, onMounted } from "vue";
// import { useRouter } from "vue-router";
// const router = useRouter();
const checked = ref<boolean>(false);
const selectedKeys = ref<string[]>(["1"]);
const collapsed = ref<boolean>(false);
onMounted(() => {
  console.log(language.value, lang.value);
});
// -----> 切换语言
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const store = useGlobalStore();
const { language } = storeToRefs(store);
const lang = ref<string>(language.value);
const changeLang = (e) => {
  language.value = e.target.value;
  locale.value = e.target.value;
};
// <------------
// 切换主题回调
const change = (value: boolean) => {
  // 如果开关打开，就切换为绿色主题，否则默认黄色主题
  if (value) {
    toggleTheme({
      scopeName: "theme-dark",
    });
  } else {
    toggleTheme({
      scopeName: "theme-light",
    });
  }
};
const menuItem = (e) => {
  console.log(e);
  // router.push("/noFound");
};
</script>
<style lang="less" scoped>
.logo {
  width: 100%;
  height: 64px;
  background-color: #ebe2ff;
}
.paint {
  width: calc(100% - 40px);
  height: 64px;
  margin: 10px 0 50px;
  background-color: #a883f7;
}
.triggerBox {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ebe2ff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: left 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  .trigger {
    font-size: 20px;
    color: #a07bff;
    transition: transform 0.6s cubic-bezier(0.2, 0, 0, 1) 0s;
  }
}
.triggerFold {
  position: absolute;
  top: 88px;
  left: 174px;
  .trigger {
    transform: rotateY(180deg);
  }
}
.triggerunFold {
  position: absolute;
  top: 88px;
  left: 54px;
}
</style>
