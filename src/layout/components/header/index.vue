<template>
  <div class="header">
    <a-button type="primary" shape="round" size="large" class="buttonP" style="margin-right: 16px">
      <template #icon>
        <coffee-outlined />
      </template>
      {{ t("common.record") }}
    </a-button>
    <div class="user" @mouseenter="menuUnfold" @mouseleave="menuFold">
      <div class="avatar">
        <img class="avatar-img" :class="{ imgUnfold: !isFold }" src="@/assets/images/Iraina3.jpg" alt="avatar" />
        <div class="avatar-menu" :class="{ menuUnfold: !isFold }">
          <div class="avatar-menu-top">
            <svg-icon name="vip" className="icon-user"></svg-icon>
            <svg-icon name="message" className="icon-user"></svg-icon>
          </div>
          <div class="avatar-menu-mid">
            <div class="avatar-menu-mid-item">
              <user-outlined />
              <span>{{ t("common.person") }}</span>
            </div>
            <div class="avatar-menu-mid-item">
              <message-outlined />
              <span>{{ t("common.message") }}</span>
            </div>
            <div class="avatar-menu-mid-item">
              <read-outlined />
              <span>内容管理</span>
            </div>
            <div class="avatar-menu-mid-item">
              <code-sandbox-outlined />
              <span>信息中心</span>
            </div>
            <div class="avatar-menu-mid-item">
              <poweroff-outlined />
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </div>
      <span class="name">Iraina</span>
    </div>
    <span class="hello">{{ t("common.hello") }}</span>
    <span class="date">{{ today }}，{{ week }}</span>
  </div>
</template>
<script lang="ts" setup>
import {
  CoffeeOutlined,
  UserOutlined,
  MessageOutlined,
  ReadOutlined,
  CodeSandboxOutlined,
  PoweroffOutlined,
} from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import { timeFormat, getWeekDate } from "@/utils/tools";
const { t } = useI18n();
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
import { watch, ref } from "vue";
const store = useGlobalStore();
const { language } = storeToRefs(store);
let today: string = timeFormat(new Date(), language.value);
let week: string = getWeekDate(new Date(), language.value);
const isFold = ref<boolean>(true);
const menuUnfold = () => {
  isFold.value = false;
};
const menuFold = () => {
  isFold.value = true;
};
watch(language, (val: string) => {
  today = timeFormat(new Date(), val);
  week = getWeekDate(new Date(), val);
});
</script>
<style lang="less" scoped>
.header {
  width: inherit;
  height: inherit;
  background: var(--background-color3);
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  .user {
    margin: 0 16px 0 10px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    cursor: pointer;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: relative;
      &-img {
        width: 100%;
        height: 100%;
        margin-top: 0px;
        transform: scale(1);
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        display: block;
        position: relative;
        z-index: 9;
      }
      &-menu {
        overflow: hidden;
        width: 200px;
        height: 0px;
        background-color: var(--background-color3);
        border-radius: 4px;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
        transform: translateX(25px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 25px;
        right: -100%;
        z-index: 7;
        cursor: default;
        &-top {
          width: 100%;
          height: 50px;
          border-bottom: 1px solid var(--border-color-base);
          display: flex;
          justify-content: space-between;
        }
        &-mid {
          width: 100%;
          padding: 5px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          &-item {
            width: 100%;
            height: 40px;
            padding-left: 16px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          &-item:hover {
            color: var(--primary-color);
            background-color: var(--primary-color1);
          }
          &-item span {
            margin-left: 10px;
          }
        }
      }
      .imgUnfold {
        margin-top: 20px;
        transform: scale(1.3);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      .menuUnfold {
        opacity: 1;
        height: 260px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        top: 45px;
      }
    }
    .name {
      margin-right: 20px;
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-color);
    }
  }
  .hello,
  .date {
    font-size: 18px;
    font-weight: 550;
    color: var(--primary-color);
  }
  .date {
    margin-right: 30px;
    color: var(--font-color2);
    font-style: italic;
  }
}
.icon-user {
  margin: 10px 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
