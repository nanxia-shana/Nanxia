<template>
  <a-layout style="height: 100%" @click="closeSider">
    <a-layout-sider class="sider" breakpoint="md" collapsed-width="0" v-model:collapsed="collapsed" :theme="curMode" @click.stop="() => {}">
      <div class="sider-menu">
        <svg-icon name="menu" className="icon" @click.stop="collapsed = !collapsed"></svg-icon>
      </div>
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <div class="paintBox">
        <a-tooltip placement="rightBottom" title="快速入口" color="#404040  ">
          <div class="paint">
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
          <span> {{ t("common.common02-001") }} </span>
        </a-menu-item>
        <a-menu-item key="/portfolio">
          <video-camera-outlined />
          <span> {{ t("common.common02-002") }} </span>
        </a-menu-item>
        <a-menu-item key="/schedule">
          <field-time-outlined />
          <span> {{ t("common.common02-003") }} </span>
        </a-menu-item>
        <a-menu-item key="/person">
          <user-outlined />
          <span> {{ t("common.common02-004") }} </span>
        </a-menu-item>
        <a-menu-item key="/setting">
          <setting-outlined />
          <span> {{ t("common.common02-005") }} </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="right">
      <a-layout-header style="padding: 0">
        <nan-header></nan-header>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }" class="content">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { getModels } from '@/utils/tools';
import {
  HomeOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FieldTimeOutlined,
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
    selectedKeys.value.push(`/${newValue.split("/")[1]}`);
  },
  { immediate: true },
);
onMounted(() => {
  console.log("Layout-Page");
});
const closeSider = () => {
  if(getModels())
    collapsed.value = true
};
const menuItem = (e: any) => {
  router.push(e.key);
};
</script>
<style lang="less" scoped>
.sider{
  position: relative;
  @media (max-width: @md) {
    height: 100%;
    position: absolute;
    z-index: 99;
  }
  &-menu{
    width: 5rem;
    height: 4rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: end;
    position: absolute;
    top: 1.5rem;
    left: 0;
    z-index: 100;
    user-select: none;
    @media (max-width: 767px) {
      display: none;
    }
    .icon{
      width: 3rem;
      height: 3rem;
      cursor: pointer;
    }
  }
}
.right {
  background-color: var(--background-color1);
}
.content {
  background-color: var(--background-color3);
  overflow: auto;
}
.logo {
  width: 100%;
  height: 64px;
  transform: translateX(1.2rem);
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
  width: calc(100% + 30px);
  height: 92px;
  margin: 10px auto;
  display: flex;
  // flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color1);
  border-radius: 10px;
  transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
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
</style>
