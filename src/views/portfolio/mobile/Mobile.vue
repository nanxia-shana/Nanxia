<template>
  <div class="mobile">
    <div class="mobile-item mobile-left">
      <img src="@/assets/images/iphone.png" alt="iphone" />
      <div class="mobile-item-iphone">
        <div class="mobile-item-iphone-content backVideo" :class="{ isWindow: isWindow }">
          <div class="isWindowTime mobile-item-iphone-content-time">{{ curTime }}</div>
          <div class="mobile-item-iphone-content-status">
            <svg-icon name="iphonesignal" className="iphoneIcon1"></svg-icon>
            <svg-icon name="iphonebattery" className="iphoneIcon2"></svg-icon>
          </div>
          <div class="mobile-item-iphone-content-desktop">
            <span class="mobile-item-iphone-content-desktop-time">{{ curTime }}</span>
            <div class="mobile-item-iphone-content-desktop-date">
              <span>{{ today }}</span>
              <span>{{ week }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mobile-item-window"
        ref="iphone"
        @mousedown="mousedown"
        @mouseup="mouseup"
        @mouseout="mouseout"
        @mousemove="mousemove($event)">
        <router-view v-slot="{ Component }">
          <!-- <transition name="fade"> -->
          <component :is="Component" />
          <!-- </transition> -->
        </router-view>
      </div>
    </div>
    <div class="mobile-item mobile-right">
      <img src="@/assets/images/iphone.png" alt="iphone" />
      <div class="mobile-item-iphone">
        <div class="mobile-item-iphone-content">
          <div class="mobile-item-iphone-content-time">{{ curTime }}</div>
          <div class="mobile-item-iphone-content-status">
            <svg-icon name="iphonesignal" className="iphoneIcon1"></svg-icon>
            <svg-icon name="iphonebattery" className="iphoneIcon2"></svg-icon>
          </div>
          <div class="mobile-item-iphone-content-desktop">
            <span class="mobile-item-iphone-content-desktop-time">{{ curTime }}</span>
            <div class="mobile-item-iphone-content-desktop-date">
              <span>{{ today }}</span>
              <span>{{ week }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-item-window"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { timeFormatCN, timeFormat, getWeekDate } from "@/utils/tools";
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
// import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
// const { t } = useI18n();
const store = useGlobalStore();
const { language } = storeToRefs(store);
const router = useRouter();
const isWindow = ref<boolean>(false);
const curTime = ref<string>(timeFormatCN(new Date(), "hh:mm"));
const iphone = ref(null); // 使用 ref 引用 DOM 元素
let flag = ref<boolean>(false); //判断鼠标是否在iphone内且按住未松
let today: string = timeFormat(new Date(), language.value, "yyyy年MM月dd日");
let week: string = getWeekDate(new Date(), language.value, 3);
const setIphoneTime = () => {
  curTime.value = timeFormatCN(new Date(), "hh:mm");
};
let nowtime = ref();
const mousedown = () => {
  flag.value = true;
};
const mouseup = () => {
  flag.value = false;
};
const mouseout = () => {
  flag.value = false;
};
const mousemove = (e: any) => {
  if (flag.value) {
    console.log(e);
    // 保证下滑时页面相同方向滚动
    iphone.value.scrollTop -= e.movementY;
  }
};
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    let routeArray = newValue.split("/");
    if (routeArray.reverse()[0] !== "mobile") isWindow.value = true;
    else isWindow.value = false;
  },
  { immediate: true },
);
watch(language, (val: string) => {
  today = timeFormat(new Date(), val, "yyyy年MM月dd日");
  week = getWeekDate(new Date(), val, 3);
});
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
      z-index: 4;
      user-select: none;
    }
    &-iphone {
      width: 260px;
      height: 565px;
      // padding: 0 8px 2px;
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: space-between;
      position: absolute;
      top: 18.3px;
      left: 20.3px;
      z-index: 3;
      cursor: default;
      .backVideo {
        background-image: url("../../../assets/images/deskBack2.jpeg");
      }
      &-content {
        overflow-x: hidden;
        overflow-y: scroll;
        width: 100%;
        // height: calc(100% - 26px);
        height: 100%;
        border-radius: 26px;
        background-image: url("../../../assets/images/deskBack.jpeg");
        background-position: 0 0;
        background-size: 100% 100%;
        position: relative;
        &-time {
          width: 40%;
          height: 20px;
          margin: 4px 0 0 12px;
          font-size: 14px;
          color: #fff;
          font-weight: bolder;
          user-select: none;
          position: absolute;
          top: 0;
          left: 0;
        }
        &-status {
          width: 40%;
          height: 20px;
          margin: 4px 12px 0 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: absolute;
          top: 0;
          right: 0;
        }
        &-desktop {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          top: 0;
          right: 0;
          z-index: 2;
          &-time {
            margin-top: 40px;
            font-size: 50px;
            color: #fff;
          }
          &-date {
            display: flex;
            span {
              font-size: 16px;
              font-weight: 500;
              color: #fff;
            }
            span:first-child {
              margin-right: 10px;
            }
          }
        }
      }
      &-content::-webkit-scrollbar {
        display: none;
      }
    }
    &-window {
      overflow-x: hidden;
      overflow-y: scroll;
      width: calc(100% - 40px);
      height: calc(100% - 57px);
      border-radius: 2px 2px 26px 26px;
      position: absolute;
      top: 40px;
      left: 20px;
      z-index: 5;
    }
    &-window::-webkit-scrollbar {
      display: none;
    }
  }
  &-left {
    margin-left: 2%;
    margin-right: 4%;
  }
}
.isWindow {
  background-color: #fff;
  background-image: none !important;
  .isWindowTime {
    color: #333;
  }
  .iphoneIcon1 {
    fill: #333;
  }
  .iphoneIcon2 {
    fill: #333;
  }
}
.iphoneIcon1 {
  width: 14px;
  height: 14px;
  margin-right: 6px;
  fill: #fff;
}
.iphoneIcon2 {
  width: 18px;
  height: 18px;
  margin-right: 2px;
  fill: #fff;
}
</style>
