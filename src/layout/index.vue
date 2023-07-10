<template>
  <a-layout style="height: 100%">
    <a-layout-sider v-model:collapsed="collapsed" :theme="curMode" :trigger="null" collapsible>
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <div class="paintBox">
        <a-tooltip placement="rightBottom" title="快速入口" color="#404040  ">
          <div class="paint" :class="[!collapsed ? '' : 'paintFold']">
            <svg-icon name="huiyuan" className="paint-icon"></svg-icon>
            <svg-icon name="jiankong" className="paint-icon"></svg-icon>
            <svg-icon name="search" className="paint-icon"></svg-icon>
            <svg-icon name="sanceng" className="paint-icon"></svg-icon>
            <svg-icon name="kanban" className="paint-icon"></svg-icon>
            <svg-icon name="tuceng" className="paint-icon"></svg-icon>
            <svg-icon name="schedule" className="paint-icon"></svg-icon>
            <svg-icon name="threeSix" className="paint-icon"></svg-icon>
          </div>
        </a-tooltip>
        <div class="paintB" :class="[!collapsed ? 'paintBUnfold' : 'paintBFold']">Record</div>
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
      <div class="triggerBox" :class="[!collapsed ? 'triggerUnfold' : 'triggerFold']" @click="() => (collapsed = !collapsed)">
        <right-outlined class="trigger" />
      </div>
    </a-layout-sider>
    <a-layout class="right">
      <a-layout-header style="padding: 0">
        <nan-header></nan-header>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }" class="content">
        <router-view v-slot="{ Component }">
          <transition
            name="fade"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut">
            <component :is="Component" />
          </transition>
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
const collapsed = ref<boolean>(true);
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
  max-height: 92px;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color1);
  border-radius: 10px;
  transition: max-height 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  &-icon {
    width: 30px;
    height: 30px;
    margin: 8px 4px;
    transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: pointer;
  }
  &-icon:hover {
    transform: scale(1.3);
    transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
.paintFold {
  max-height: 184px;
  transition: max-height 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.paintB {
  overflow: hidden;
  width: calc(100% + 30px);
  border-radius: 4px;
  background: linear-gradient(to bottom, #c0a8ff, #ad7bd2);
  text-align: center;
  line-height: 92px;
  font-size: 40px;
  font-style: italic;
  font-weight: bold;
  color: aliceblue;
  letter-spacing: 2px;
  text-indent: 2px;
  // background-color: red;
  // img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: contain;
  // }
}
.paintBUnfold {
  height: 92px;
  transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0.3s;
}
.paintBFold {
  height: 0px;
  transition: height 0s;
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
.triggerUnfold {
  position: absolute;
  top: 88px;
  left: 174px;
  .trigger {
    transform: rotateY(180deg);
  }
}
.triggerFold {
  position: absolute;
  top: 88px;
  left: 54px;
}
.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 0.2s;
  --animate-delay: 0s;
}
</style>
