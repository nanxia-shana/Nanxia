<template>
  <div class="mobile">
    <div class="mobile-item mobile-left">
      <img src="@/assets/images/iphone.png" alt="iphone" />
      <div class="mobile-item-iphone">
        <div class="mobile-item-iphone-time">{{ curTime }}</div>
        <div class="mobile-item-iphone-status">
          <svg-icon name="iphonesignal" className="iphoneIcon1"></svg-icon>
          <svg-icon name="iphonebattery" className="iphoneIcon2"></svg-icon>
        </div>
        <div class="mobile-item-iphone-content">
          <div style="width: 100%; height: 1000px; background: linear-gradient(to bottom, yellow, pink)"></div>
        </div>
      </div>
    </div>
    <div class="mobile-item mobile-right">
      <img src="@/assets/images/iphone.png" alt="iphone" />
      <div class="mobile-item-iphone">
        <div class="mobile-item-iphone-time">{{ curTime }}</div>
        <div class="mobile-item-iphone-status">
          <svg-icon name="iphonesignal" className="iphoneIcon1"></svg-icon>
          <svg-icon name="iphonebattery" className="iphoneIcon2"></svg-icon>
        </div>
        <div class="mobile-item-iphone-content">
          <WaterfallFlow></WaterfallFlow>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import WaterfallFlow from "./WaterfallFlow.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
// import { useI18n } from "vue-i18n";
import { timeFormatCN } from "@/utils/tools";
// const { t } = useI18n();
const curTime = ref<string>(timeFormatCN(new Date(), "hh:mm"));
const setIphoneTime = () => {
  curTime.value = timeFormatCN(new Date(), "hh:mm");
};
let nowtime = ref();
onMounted(() => {
  //启动定时器
  nowtime.value = setInterval(() => {
    setIphoneTime();
  }, 1000);
});
onBeforeUnmount(() => {
  // 在组件消费前，销毁定时器
  clearInterval(nowtime.value);
});
</script>
<style lang="less" scoped>
.mobile {
  overflow: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  &-item {
    width: 300px;
    height: 600px;
    margin-top: 60px;
    // background-color: rgba(250, 140, 10, 0.6);
    // border: 2px solid #c0a8ff;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      width: 300px;
      height: 600px;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      user-select: none;
    }
    &-iphone {
      width: 260px;
      height: 565px;
      padding: 0 8px 2px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      position: absolute;
      top: 18.3px;
      left: 20px;
      z-index: 4;
      cursor: default;
      &-time {
        width: 40%;
        height: 20px;
        margin: 5px 0 0 4px;
        font-size: 14px;
        color: #333;
        font-weight: bolder;
        user-select: none;
      }
      &-status {
        width: 40%;
        height: 20px;
        margin: 5px 4px 0 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      &-content {
        overflow-x: hidden;
        overflow-y: scroll;
        width: 100%;
        height: calc(100% - 26px);
        border-radius: 0 0 12px 12px;
        position: relative;
        z-index: 5;
      }
      &-content::-webkit-scrollbar {
        display: none;
      }
    }
  }
  &-left {
    margin-left: 2%;
    margin-right: 4%;
  }
}

.iphoneIcon1 {
  width: 14px;
  height: 14px;
  margin-right: 6px;
}

.iphoneIcon2 {
  width: 18px;
  height: 18px;
  margin-right: 2px;
}
</style>
