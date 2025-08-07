<template>
  <div class="mobile">
    <div class="mobile-item mobile-left">
      <img class="mobile-item-iphoneFrame" src="@/assets/images/iphone.png" alt="iphone" />
      <div class="mobile-item-iphone">
        <div class="mobile-item-iphone-content backImg" :class="{ isWindow: isWindow }">
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
            <div class="mobile-item-iphone-content-desktop-apps">
              <div class="mobile-item-iphone-content-desktop-apps-item" v-for="(item, index) in appList" :key="index" @click="appClick(item.url)">
                <img class="mobile-item-iphone-content-desktop-apps-item-icon" :src="item.path" alt="icon" />
                <div class="mobile-item-iphone-content-desktop-apps-item-name">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-item-window" :class="{app: isApp}">
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
      <img class="mobile-item-iphoneFrame" src="@/assets/images/iphone.png" alt="iphone" />
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
import { ref, watch, onMounted, onBeforeUnmount, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
const { t } = useI18n();
const store = useGlobalStore();
const { language } = storeToRefs(store);
const router = useRouter();
const isWindow = ref<boolean>(false);
const curTime = ref<string>(timeFormatCN(new Date(), "hh:mm"));
let today: string = timeFormat(new Date(), language.value, "yyyy/MM/dd");
let week: string = getWeekDate(new Date(), language.value, 3);
const rightIsStart = ref<boolean>(false);
const isApp = ref<boolean>(false)
const appList = reactive([
  {
    path: new URL(`/src/assets/images/WaterfallFlow.jpg`, import.meta.url).href,
    name: t("portfolio.portfolio01-006"),
    url: "/portfolio/mobile/waterfallFlow",
  },
  {
    path: new URL(`/src/assets/images/Tiktok.jpg`, import.meta.url).href,
    name: t("portfolio.portfolio01-007"),
    url: "/portfolio/mobile/instantMusicVideo",
  },
  {
    path: new URL(`/src/assets/images/netease_cloud_music.jpg`, import.meta.url).href,
    name: t("portfolio.portfolio01-008"),
    url: "/portfolio/mobile/musicPlayer",
  },
  {
    path: new URL(`/src/assets/images/Amap.jpg`, import.meta.url).href,
    name: t("portfolio.portfolio01-010"),
    url: "/portfolio/mobile/AMap",
  },
]);
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
    if (routeArray.reverse()[0] !== "mobile") {
      isWindow.value = true;
      isApp.value = true
    } else {
      isWindow.value = false;
      isApp.value = false
    }
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
const appClick = (url: string) => {
  router.push(url)

}
</script>
<style lang="less" scoped>
.mobile {
  width: 100%;
  padding: 0 0 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &-item {
    width: 300px;
    height: 600px;
    margin-left: 1rem;
    margin-top: 60px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &-iphoneFrame {
      width: 300px;
      height: 600px;
      border-radius: 40px;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      cursor: pointer;
      user-select: none;
    }
    &-iphone {
      overflow: hidden;
      width: 262px;
      height: 565px;
      border-radius: 20px;
      position: absolute;
      top: 18px;
      left: 19px;
      z-index: 4;
      &-lock {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        filter: blur(0);
        opacity: 1;
        transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
        &-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .noStart {
        filter: blur(6px);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      .backImg {
        background-image: url("../../../assets/images/deskBack2.jpeg");
      }
      &-content {
        overflow-x: hidden;
        overflow-y: scroll;
        width: 101%;
        // height: calc(100% - 26px);
        height: 100%;
        margin-left: -1px;
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
          &-apps {
            width: 94%;
            margin-top: 20px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            &-item {
              width: 20%;
              height: 66px;
              margin: 2.5%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              cursor: pointer;
              &-icon {
                width: 100%;
                aspect-ratio: 1/1;
                border-radius: 8px;
                object-fit: cover;
                display: block;
              }
              &-name {
                width: 100%;
                color: #fff;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
                line-height: 13px;
              }
            }
          }
        }
      }
      &-content::-webkit-scrollbar {
        display: none;
      }
    }

    &-window {
      overflow: hidden;
      width: 262px;
      height: 544px;
      border-radius: 0 0 20px 20px;
      position: absolute;
      top: 39px;
      left: 19px;
      z-index: 3;
    }

    .app{
      z-index: 5;
    }
  }

  &-left {
    margin-right: 2rem;
    // transform-style: preserve-3d;
    // transform: rotateX(15deg) rotateY(20deg);
  }
  &-right {
    // transform-style: preserve-3d;
    // transform: rotateX(15deg) rotateY(-20deg);
  }
}
.isWindow {
  .isWindowItem {
    background-color: #333;
    transition: all 0s 0.6s;
  }
  .iphoneIcon1 {
    transition: all 0s 0.6s;
  }
  .iphoneIcon2 {
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
