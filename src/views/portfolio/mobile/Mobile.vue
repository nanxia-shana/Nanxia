<template>
  <div class="mobile">
    <div class="mobile-item mobile-left">
      <img src="@/assets/images/iphone.png" alt="iphone" />
      <div class="mobile-item-iphone">
        <div class="mobile-item-iphone-content backVideo" :class="{ isWindow: isWindow }">
          <div class="isWindowItem mobile-item-iphone-content-time">{{ curTime }}</div>
          <div class="isWindowItem mobile-item-iphone-content-status">
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
      <div class="mobile-item-window">
        <router-view v-slot="{ Component }">
          <transition
            name="custom-classes"
            enter-active-class="animate__animated animate__backInUp"
            leave-active-class="animate__animated animate__backOutDown">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <!-- Right -->
    <div class="mobile-item mobile-right" @click="rightStart">
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
        <div class="mobile-item-iphone-lock" :class="{ noStart: rightIsStart }">
          <video class="mobile-item-iphone-lock-video" src="@/assets/videos/earthstar.mp4" muted autoplay loop></video>
        </div>
      </div>
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
let today: string = timeFormat(new Date(), language.value, "yyyy/MM/dd");
let week: string = getWeekDate(new Date(), language.value, 3);
const rightIsStart = ref<boolean>(false);
const lockRightTime = setTimeout(() => {
  rightIsStart.value = false;
}, 15000);
const setIphoneTime = () => {
  curTime.value = timeFormatCN(new Date(), "hh:mm");
};
let nowtime = ref();

const rightStart = () => {
  if (rightIsStart.value) {
    rightIsStart.value = false;
  } else {
    rightIsStart.value = true;
    lockRightTime;
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
  today = timeFormat(new Date(), val, "yyyy/MM/dd");
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
  clearTimeout(lockRightTime);
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
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      width: 300px;
      height: 600px;
      border-radius: 40px;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      cursor: pointer;
      user-select: none;
    }
    &-iphone {
      width: 260px;
      height: 565px;
      position: absolute;
      top: 18.3px;
      left: 20.3px;
      z-index: 3;
      &-lock {
        width: 272px;
        height: 565px;
        position: absolute;
        top: 0;
        left: -6px;
        z-index: 4;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        &-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .noStart {
        filter: blur(6px);
        opacity: 0;
        transform: scale(0);
        transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0s 1s;
      }
      .backVideo {
        background-image: url("../../../assets/images/deskBack2.jpeg");
      }
      &-content {
        overflow-x: hidden;
        overflow-y: scroll;
        width: 101%;
        // height: calc(100% - 26px);
        height: 100%;
        margin-left: -1px;
        border-radius: 20px;
        background-image: url("../../../assets/images/deskBack.jpeg");
        background-position: 0 0;
        background-size: 100% 100%;
        position: relative;
        &-time {
          width: 50%;
          height: 20px;
          padding: 2px 0 20px 12px;
          font-size: 14px;
          color: #fff;
          font-weight: bolder;
          user-select: none;
          position: absolute;
          top: 0;
          left: 0;
          transition: all 0s;
        }
        &-status {
          width: 50%;
          height: 22px;
          padding: 4px 12px 0 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: absolute;
          top: 0;
          right: 0;
          transition: all 0s;
        }
        &-desktop {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
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
      // overflow-x: hidden;
      // overflow-y: scroll;
      overflow: hidden;
      width: calc(100% - 41px);
      height: calc(100% - 57px);
      border-radius: 0 0 20px 20px;
      position: absolute;
      top: 40px;
      left: 21px;
      z-index: 5;
    }
  }

  &-left {
    margin-left: 2%;
    margin-right: 4%;
    // transform-style: preserve-3d;
    // transform: rotateX(15deg) rotateY(20deg);
  }
  &-right {
    // transform-style: preserve-3d;
    // transform: rotateX(15deg) rotateY(-20deg);
  }
}
.isWindow {
  // background-image: none !important;
  .isWindowItem {
    // color: #333;
    background-color: #333;
    transition: all 0s 0.6s;
  }
  .iphoneIcon1 {
    // fill: #333;
    transition: all 0s 0.6s;
  }
  .iphoneIcon2 {
    // fill: #333;
    transition: all 0s 0.6s;
  }
}
.iphoneIcon1 {
  width: 14px;
  height: 14px;
  margin-right: 6px;
  fill: #fff;
  transition: all 0s;
}
.iphoneIcon2 {
  width: 18px;
  height: 18px;
  margin-right: 2px;
  fill: #fff;
  transition: all 0s;
}
.animate__animated.animate__backInUp,
.animate__animated.animate__backOutDown {
  --animate-duration: 0.6s;
  --animate-delay: 0s;
}
</style>
