<template>
  <div class="computer">
    <div class="computer-box">
      <img src="@/assets/images/MAC.png" alt="iphone" />
      <div class="computer-box-desktop">
        <div class="computer-box-desktop-topbar">
          <span style="margin-right: 1%">{{ curTime }}</span>
          <span style="margin-right: 0.5%">{{ week }}</span>
          <span style="margin-left: 1%">{{ today }}</span>
          <svg-icon name="iphonewifi" className="macIcon"></svg-icon>
          <svg-icon name="iphonebattery" className="macIcon"></svg-icon>
          <svg-icon name="mackeyboard" className="macIcon1"></svg-icon>
          <span>ABC</span>
        </div>
        <div class="computer-box-desktop-avatar">
          <img src="@/assets/images/Iraina6.jpg" alt="avatar" />
        </div>
        <span class="computer-box-desktop-name">Iraina</span>
        <input
          class="computer-box-desktop-password"
          type="password"
          maxlength="6"
          :placeholder="t('portfolio.enterpassword')"
          @keydown.enter="keydown" />
        <span class="computer-box-desktop-tips">{{ t("portfolio.mactips") }}</span>
        <div class="computer-box-desktop-btn">
          <div class="computer-box-desktop-btn-item">
            <div class="computer-box-desktop-btn-item-icon">
              <svg-icon name="close" className="macBtnIcon"></svg-icon>
            </div>
            <span>{{ t("common.cancel") }}</span>
          </div>
          <div class="computer-box-desktop-btn-item">
            <div class="computer-box-desktop-btn-item-icon">
              <svg-icon name="macuser" className="macBtnIcon"></svg-icon>
            </div>
            <span>{{ t("portfolio.visitor") }}</span>
          </div>
        </div>
      </div>
      <div class="computer-box-mac" :class="{ macShow: !macShow }">
        <router-view v-slot="{ Component }">
          <!-- <transition name="fade"> -->
          <component :is="Component" />
          <!-- </transition> -->
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { timeFormatCN, timeFormat, getWeekDate } from "@/utils/tools";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const store = useGlobalStore();
const { language } = storeToRefs(store);
const router = useRouter();
const { t } = useI18n();
const curTime = ref<string>(timeFormatCN(new Date(), "hh:mm:ss"));
const macShow = ref<boolean>(true);
let today: string = timeFormat(new Date(), language.value, "yyyy/MM/dd");
let week: string = getWeekDate(new Date(), language.value, 2);
let nowtime = ref();
const setIphoneTime = () => {
  curTime.value = timeFormatCN(new Date(), "hh:mm:ss");
};
const keydown = () => {
  console.log("object");
};
watch(language, (val: string) => {
  today = timeFormat(new Date(), val, "yyyy/MM/dd");
  week = getWeekDate(new Date(), val, 2);
});
watch(
  () => router.currentRoute.value.path,
  (newValue) => {
    let lastRouteName = newValue.split("/").reverse()[0];
    if (lastRouteName === "portfolio" || lastRouteName === "computer" || lastRouteName === "mobile") macShow.value = true;
    else macShow.value = false;
  },
  { immediate: true },
);
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
.computer {
  overflow: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-box {
    width: 80%;
    margin-top: 100px;
    position: relative;
    // transform-style: preserve-3d;
    // transform: rotateX(10deg) rotateY(-15deg) translateX(10px);
    img {
      width: 100%;
      object-fit: contain;
      position: relative;
      z-index: 3;
    }
    &-desktop {
      width: 91.8%;
      height: 63.8%;
      background-image: url(../../../assets/images/night-sea.jpg);
      background-position: 0 0;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      top: 4.6%;
      left: 4%;
      z-index: 4;
      &-topbar {
        width: 100%;
        height: 4%;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        filter: blur(0.4px);
        span {
          font-size: 12px;
          color: #fff;
          letter-spacing: 1px;
          transform: scale(0.8);
        }
      }
      &-avatar {
        width: 10%;
        height: calc(width);
        margin-top: 10%;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: contain;
        }
      }
      &-name {
        margin: 1% 0;
        font-size: 1vw;
        font-weight: 600;
        color: #ccc;
      }
      &-password {
        width: 14%;
        padding: 0 1%;
        border-radius: 10px;
        background-color: #5f5f5f;
        font-size: 12px;
        color: #ddd;
      }
      &-password::placeholder {
        color: #aaa;
      }
      &-tips {
        margin: 1% 0 14%;
        font-size: 12px;
        color: #fff;
        letter-spacing: 1px;
        text-indent: 1px;
        transform: scale(0.7);
      }
      &-btn {
        width: 14%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          &-icon {
            width: 2vw;
            height: 2vw;
            min-width: 20px;
            min-height: 20px;
            max-width: 30px;
            max-height: 30px;
            border-radius: 50%;
            background-color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          span {
            font-size: 12px;
            color: #fff;
            white-space: nowrap;
            letter-spacing: 1px;
            text-indent: 1px;
            transform: scale(0.76);
          }
        }
      }
    }
    &-mac {
      overflow: auto;
      width: 91.8%;
      height: 63.8%;
      position: absolute;
      top: 4.6%;
      left: 4%;
      z-index: 5;
      transform: scale(0);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    &-mac::-webkit-scrollbar {
      display: none;
    }
    .macShow {
      transform: scale(1);
      opacity: 1;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.macIcon {
  width: 12px;
  height: 12px;
  margin-left: 1%;
  fill: #fff;
}
.macIcon1 {
  width: 12px;
  height: 12px;
  margin-right: 1%;
  fill: #fff;
}
.macBtnIcon {
  width: 100%;
  height: 100%;
  fill: #999;
}
</style>
