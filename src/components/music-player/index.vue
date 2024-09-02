<template>
  <div
    class="music"
    id="draggable"
    :class="{ musicShow: musicShow}"
    @contextmenu.prevent.stop="rightClick">
    <div class="music-img" @click="showMusic" :class="{ imgRotate: musicIsPlay }">
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
  <ul
    v-show="menuRVisible"
    :style="{ left: menuLeft + 'px', top: menuTop + 'px' }"
    class="contextmenu">
    <li @click="router.push('/musicPlayer')">{{ t("common.expand") }}</li>
    <li>{{ t("common.collapse") }}</li>
  </ul>
</template>
<script lang="ts" setup>
import { Moving } from '@/components/music-player/draggable'
import {
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
const musicShow = ref<boolean>(false);
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
  return () => {
    // component 卸载后，解除事件绑定
    document.getElementById("draggable").removeEventListener("mouseup", ()=>{})
  }
});
watch(language, (val: string) => {
  today = timeFormat(new Date(), val, "yyyy-MM-dd");
  week = getWeekDate(new Date(), val, 3);
});
const showMusic = () => {
  console.log(Moving);
  if (!Moving)
    musicShow.value = !musicShow.value
}
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
.music {
  overflow: hidden;
  width: 46px;
  height: 46px;
  border: 1px solid transparent;
  border-radius: 23px;
  box-sizing: content-box;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: absolute; 
  left: 20px;
  top: 600px;
  z-index: 1001;
  cursor: grab;
  user-select: none;
  transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
              background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
              border 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
              box-shadow 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  &-img {
    overflow: hidden;
    width: 46px;
    height: 46px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: rotate-infinity 8s linear infinite forwards;
    -webkit-animation: rotate-infinity linear 8s infinite forwards;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    animation-play-state: paused;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }
  }
  @keyframes rotate-infinity {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .imgRotate {
    animation-play-state: running;
  }

  &-control {
    width: 120px;
    height: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-progress {
      width: 90px;
      height: 20px;
      .ant-slider {
        margin: 5px 6px;
      }
    }
    &-icon {
      width: 100px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      &-item {
        font-size: 20px;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
.musicShow {
  width: 160px;
  background-color: rgba(160, 123, 255, 0.3);
  border: 1px solid rgba(192, 163, 255, 0.6);
  box-shadow: 0 0 6rem 0 rgba(160, 123, 255, 0.3);
  transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
              background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
              border 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
              box-shadow 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.contextmenu {
  width: 100px;
  padding: 5px 0;
  margin: 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  list-style-type: none;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  position: fixed; //关键样式设置固定定位
  z-index: 3000;
}

.contextmenu li {
  width: 100%;
  height: 36px;
  margin: 0;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: #eee;
}
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