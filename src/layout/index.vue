<template>
  <a-layout style="height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :theme="curMode" :trigger="null" collapsible>
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <div class="paintBox">
        <div class="paint" @click="() => (collapsed = !collapsed)">
          <svg-icon name="huiyuan" className="paint-icon"></svg-icon>
          <svg-icon name="jiankong" className="paint-icon"></svg-icon>
          <svg-icon name="search" className="paint-icon"></svg-icon>
          <svg-icon name="sanceng" className="paint-icon"></svg-icon>
          <svg-icon name="kanban" className="paint-icon"></svg-icon>
          <svg-icon name="tuceng" className="paint-icon"></svg-icon>
          <svg-icon name="schedule" className="paint-icon"></svg-icon>
          <svg-icon name="threeSix" className="paint-icon"></svg-icon>
        </div>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" :theme="curMode" mode="inline" @select="menuItem">
        <a-menu-item key="/home">
          <home-outlined />
          <span> {{ t("common.home") }} </span>
        </a-menu-item>
        <a-menu-item key="/portfolio">
          <video-camera-outlined />
          <span> {{ t("common.portfolio") }} </span>
        </a-menu-item>
        <a-menu-item key="/schedule">
          <field-time-outlined />
          <span> {{ t("common.schedule") }} </span>
        </a-menu-item>
        <a-menu-item key="/person">
          <user-outlined />
          <span> {{ t("common.person") }} </span>
        </a-menu-item>
        <a-menu-item key="/setting">
          <setting-outlined />
          <span> {{ t("common.setting") }} </span>
        </a-menu-item>
      </a-menu>
      <div class="triggerBox" :class="[!collapsed ? 'triggerFold' : 'triggerunFold']" @click="() => (collapsed = !collapsed)">
        <right-outlined class="trigger" />
      </div>
    </a-layout-sider>
    <a-layout class="right">
      <a-layout-header style="padding: 0">
        <nan-header></nan-header>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }" class="content">
        <router-view v-slot="{ Component }">
          <!-- <transition name="fade"> -->
          <component :is="Component" />
          <!-- </transition> -->
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  HomeOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FieldTimeOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import NanHeader from "@/layout/components/header/index.vue";
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
const store = useGlobalStore();
const { mode } = storeToRefs(store);
const router = useRouter();
const selectedKeys = ref<string[]>(["/home"]);
const collapsed = ref<boolean>(false);
const curMode = ref<string>(mode.value);
watch(mode, (val: string) => {
  curMode.value = val;
});
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    selectedKeys.value.length = 0;
    selectedKeys.value.push(newValue);
  },
  { immediate: true },
);
onMounted(() => {
  console.log("Layout-Page");
});
const menuItem = (e) => {
  // console.log(e);
  router.push(e.key);
};
</script>
<style lang="less" scoped>
.right {
  background-color: var(--background-color1);
}
.content {
  background-color: var(--background-color3);
}
.logo {
  width: 100%;
  height: 64px;
  // background-color: var(--primary-color1);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.paintBox {
  width: calc(100% - 40px);
  height: 200px;
}
.paint {
  overflow: hidden;
  width: 100%;
  // height: 70px;
  max-height: 184px;
  margin: 10px 0 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color1);
  border-radius: 10px;
  cursor: pointer;
  &-icon {
    width: 30px;
    height: 30px;
    margin: 8px 4px;
  }
}
.triggerBox {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color1);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  .trigger {
    font-size: 20px;
    color: var(--primary-color);
    transition: all 0.6s cubic-bezier(0.2, 0, 0, 1) 0s;
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
