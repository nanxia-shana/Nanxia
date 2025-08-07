<template>
  <div class="header">
    <a-button type="primary" shape="round" size="large" class="buttonP" style="margin-right: 16px">
      <template #icon>
        <coffee-outlined />
      </template>
      {{ t("common.common02-008") }}
    </a-button>
    <div class="user" @mouseenter="isFold = false" @mouseleave="isFold = true">
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
              <span>{{ t("common.common02-004") }}</span>
            </div>
            <div class="avatar-menu-mid-item">
              <message-outlined />
              <span>{{ t("common.common02-006") }}</span>
            </div>
            <div class="avatar-menu-mid-item">
              <read-outlined />
              <span>内容管理</span>
            </div>
            <div class="avatar-menu-mid-item">
              <code-sandbox-outlined />
              <span>信息中心</span>
            </div>
            <div class="avatar-menu-mid-item" @click="logout">
              <poweroff-outlined />
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wordBox">
      <div class="word">  
        <span class="word-date">{{ today }}，{{ week }}</span>
        <span class="word-hello">{{ t("common.common02-007") }}</span>
        <span class="word-name">&nbsp; Iraina</span>
        <span class="word-date sm">{{ today }}，{{ week }}</span>
        <span class="word-hello sm">{{ t("common.common02-007") }}</span>
        <span class="word-name sm">&nbsp; Iraina</span>
        <span class="word-date sm">{{ today }}，{{ week }}</span>
        <span class="word-hello sm">{{ t("common.common02-007") }}</span>
        <span class="word-name sm">&nbsp; Iraina</span>
        <span class="word-date sm">{{ today }}，{{ week }}</span>
        <span class="word-hello sm">{{ t("common.common02-007") }}</span>
        <span class="word-name sm">&nbsp; Iraina</span>
      </div>
    </div>
    <div>
      
    </div>
    <div
      v-if="false"
      class="music"
      :class="{ musicShow: musicShow, musicLock: musicLock }"
      @mouseenter="musicShow = true"
      @mouseleave="musicShow = false"
      @contextmenu.prevent.stop="rightClick">
      <div class="music-img" :class="{ imgRotate: musicIsPlay }" @click="router.push('/portfolio/mobile/musicPlayer')">
        <img :src="getImageUrl(musicImgUrl)" alt="music" />
      </div>
      <div class="music-control">
        <div class="music-control-progress" :class="{ breathLight: musicIsPlay }">
          <a-slider v-model:value="musicCurTime" :tip-formatter="formatter" :max="musicDuration" @change="musicDrag" />
        </div>
        <div class="music-control-icon">
          <backward-outlined class="music-control-icon-item" @click="checkSong(false)" />
          <div @click="playMusic">
            <pause-outlined v-if="musicIsPlay" class="music-control-icon-item" />
            <caret-right-outlined v-else class="music-control-icon-item" />
          </div>
          <forward-outlined class="music-control-icon-item" @click="checkSong(true)" />
        </div>
      </div>
    </div>
  </div>
  <ul 
    v-show="menuRVisible"
    :style="{ left: menuLeft + 'px', top: menuTop + 'px' }"
    class="contextmenu"
    @mouseenter="musicShow = true"
    @mouseleave="musicShow = false">
    <li @click="musicLock = true">{{ t("common.common02-009") }}</li>
    <li @click="musicLock = false">{{ t("common.common02-010") }}</li>
  </ul>
</template>
<script lang="ts" setup>
import {
  CoffeeOutlined,
  UserOutlined,
  MessageOutlined,
  ReadOutlined,
  CodeSandboxOutlined,
  PoweroffOutlined,
  BackwardOutlined,
  PauseOutlined,
  CaretRightOutlined,
  ForwardOutlined,
} from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import { timeFormat, getWeekDate } from "@/utils/tools";
const { t } = useI18n();
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
import { watch, ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useGlobalStore();
const { language } = storeToRefs(store);
let today: string = timeFormat(new Date(), language.value, "yyyy-MM-dd");
let week: string = getWeekDate(new Date(), language.value, 3);
const isFold = ref<boolean>(true);
const musicShow = ref<boolean>(false);
const musicLock = ref<boolean>(false);
const musicId = ref<number>(inject("musicId"));
const musicImgUrl: string = inject("musicImgUrl");
const musicDuration = ref<number>(inject("musicDuration"));
const musicCurTime: number = inject("musicCurTime");
const musicIsPlay: boolean = inject("musicIsPlay");
const audioPlayerRef: any = inject("audioPlayerRef");
const menuRVisible = ref<boolean>(false);
const menuLeft = ref<number>(0);
const menuTop = ref<number>(0);
onMounted(() => {
  document.addEventListener("click", () => {
    menuRVisible.value = false;
  });
  document.addEventListener("mousedown", (e) => {
    const { button } = e;
    if (button === 2) {
      menuRVisible.value = false;
    }
  });
});
watch(language, (val: string) => {
  today = timeFormat(new Date(), val, "yyyy-MM-dd");
  week = getWeekDate(new Date(), val, 3);
});
const logout = () => {
  router.push("/login");
};

const formatter = (value: number) => {
  return `${Math.floor(value / 60)}:${Math.floor(value % 60) < 10 ? "0" + Math.floor(value % 60) : Math.floor(value % 60)}`;
};
const musicDrag = (e: number) => {
  audioPlayerRef.value.currentTime = e;
};
const playMusic = () => {
  if (audioPlayerRef.value.paused == true) {
    audioPlayerRef.value.play();
  } else {
    audioPlayerRef.value.pause();
  }
};
const checkSong = (flag: boolean) => {
  let item: any;
  if (flag) item = store.nextMusic(musicId.value);
  else item = store.lastMusic(musicId.value);
  if (item) {
    audioPlayerRef.value.load();
    audioPlayerRef.value.addEventListener("canplay", () => {
      musicDuration.value = audioPlayerRef.value.duration;
      audioPlayerRef.value.play();
    });
  }
};
const rightClick = (e: any) => {
  menuRVisible.value = true;
  menuLeft.value = e.pageX;
  menuTop.value = e.pageY;
};
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href;
};
</script>
<style lang="less" scoped>
@import '@/assets/css/layout/header';
</style>
<style lang="less">
.ant-slider-step,
.ant-slider-rail,
.ant-slider-track {
  height: 2px !important;
}
.ant-slider-step {
  background-color: #e1e1e1 !important;
}
.ant-slider-handle {
  width: 8px !important;
  height: 8px !important;
  margin-top: -3px !important;
}
.breathLight .ant-slider-handle {
  animation: point-blink 2s ease-out infinite;
  -webkit-animation: point-blink ease-out 2s infinite;
}
@keyframes point-blink {
  0% {
    box-shadow: 0 0 3px 1px rgba(160, 123, 255, 0.2);
    border: 1px solid rgba(160, 123, 255, 0.1);
  }
  90% {
    box-shadow: 0 0 3px 1px rgba(160, 123, 255, 0.6);
    border: 1px solid rgba(160, 123, 255, 0.3);
  }
}
</style>
