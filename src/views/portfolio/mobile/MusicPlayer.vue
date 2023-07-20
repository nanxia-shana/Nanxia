<template>
  <div class="music">
    <div class="music-bg"></div>
    <div class="music-top">
      <svg-icon name="back" className="topIcon1" @click="router.push('/portfolio/mobile')"></svg-icon>
      <div class="music-top-msg">
        <div class="music-top-msg-name">{{ musicName }}</div>
        <div class="music-top-msg-author">
          <span>{{ musicAuthor }}</span>
          <svg-icon name="back" className="topIcon2"></svg-icon>
        </div>
      </div>
    </div>
    <div class="music-mid">
      <img class="music-mid-stick" :class="{ stickOn: !musicIsPlay }" src="@/assets/images/stick_bg.png" alt="stick_bg" />
      <div class="music-mid-wrapper">
        <img class="music-mid-wrapper-cd" src="@/assets/images/cd_wrapper.png" alt="CDwrapper" />
      </div>
      <img class="music-mid-cover" :class="{ imgRotate: musicIsPlay }" :src="getImageUrl(musicImgUrl)" alt="cover" />
    </div>
    <div class="music-bot">
      <div class="music-bot-icon">
        <svg-icon name="love" className="botIcon1"></svg-icon>
        <svg-icon name="comment" className="botIcon1"></svg-icon>
        <svg-icon name="shareMusic" className="botIcon1"></svg-icon>
      </div>
      <div class="music-bot-progress">
        <span class="music-bot-progress-time" style="transform-origin: 0 50%">{{ formatter(musicCurTime) }}</span>
        <div class="music-bot-progress-line">
          <a-slider v-model:value="musicCurTime" :tooltip-open="false" :max="musicLength" @change="musicDrag" />
        </div>
        <span class="music-bot-progress-time" style="transform-origin: 100% 50%">{{ formatter(musicLength) }}</span>
      </div>
      <div class="music-bot-operate">
        <svg-icon name="circulation" className="botIcon2" style="transform: rotateY(180deg)"></svg-icon>
        <svg-icon name="lastsong" className="botIcon3" @click="checkSong"></svg-icon>
        <div @click="playMusic">
          <svg-icon v-if="musicIsPlay" name="pause" className="botIcon4"></svg-icon>
          <svg-icon v-else name="nopause" className="botIcon4"></svg-icon>
        </div>
        <svg-icon name="nextsong" className="botIcon3" @click="checkSong"></svg-icon>
        <svg-icon name="menu" className="botIcon2"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject } from "vue";
import useGlobalStore from "@/store/modules/global";
import { storeToRefs } from "pinia";
const store = useGlobalStore();
const { music } = storeToRefs(store);
import { useRouter } from "vue-router";
const router = useRouter();
const musicImgUrl = ref<string>(music.value.musicMsg.imgUrl);
const musicName = ref<string>(music.value.musicMsg.name);
const musicAuthor = ref<string>(music.value.musicMsg.author);
const musicLength: number = inject("musicLength");
const musicCurTime: number = inject("musicCurTime");
const musicIsPlay: boolean = inject("musicIsPlay");
const audioPlayerRef: any = inject("audioPlayerRef");
const formatter = (value: number) => {
  return `${Math.floor(value / 60)}:${Math.floor(value % 60) < 10 ? "0" + Math.floor(value % 60) : Math.floor(value % 60)}`;
};
const musicDrag = (e: number) => {
  audioPlayerRef.value.currentTime = e;
};
const playMusic = () => {
  if (audioPlayerRef.value.paused == true) {
    store.musicLengthSync(Math.floor(audioPlayerRef.value.duration));
    audioPlayerRef.value.play();
  } else {
    audioPlayerRef.value.pause();
  }
};
const checkSong = () => {
  audioPlayerRef.value.currentTime = 0;
  audioPlayerRef.value.play();
};
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href;
};
</script>
<style lang="less" scoped>
.music {
  width: 100%;
  height: 100%;
  background-color: #343434;
  display: flex;
  flex-direction: column;
  position: relative;
  &-bg {
    width: 100%;
    height: 100%;
    background: url("@/assets/images/file06.jpeg") no-repeat center;
    background-size: cover;
    filter: blur(30px);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &-top {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;

    &-msg {
      flex: 1;
      height: 100%;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transform: scale(0.97);
      transform-origin: 0 100%;
      &-name {
        font-size: 12px;
        color: #fff;
        line-height: 13px;
      }
      &-author {
        display: flex;
        align-items: center;
        transform: scale(0.8);
        transform-origin: 0 0;
        span {
          font-size: 12px;
          color: #ccc;
          line-height: 16px;
        }
      }
    }
    .topIcon1 {
      width: 26px;
      height: 26px;
      fill: #dddddd;
      cursor: pointer;
    }
    .topIcon2 {
      width: 16px;
      height: 16px;
      margin-top: 2px;
      fill: #cccccc;
      transform: rotateY(180deg);
      cursor: pointer;
    }
  }
  &-mid {
    overflow: hidden;
    width: 100%;
    height: 350px;
    position: relative;
    z-index: 2;
    &-stick {
      width: 86px;
      object-fit: contain;
      position: absolute;
      top: -14px;
      left: 50%;
      z-index: 3;
      transform: translateX(-18px);
      transform-origin: 15px 15px;
      transition: transform 0.6s ease-out;
    }
    .stickOn {
      transform: translateX(-18px) rotateZ(-30deg);
      transition: transform 0.6s ease-out;
    }
    &-wrapper {
      width: 188px;
      height: 188px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translate(-94px, -100px);
      &-cd {
        width: 186px;
        height: 186px;
        border-radius: 50%;
      }
    }
    &-cover {
      width: 126px;
      height: 126px;
      border-radius: 50%;
      object-fit: cover;
      position: absolute;
      top: 48%;
      left: 50%;
      z-index: 3;
      transform: translate(-63px, -70px);
      animation: rotateInfinity 8s linear infinite forwards;
      -webkit-animation: rotateInfinity linear 8s infinite forwards;
      animation-play-state: paused;
    }
    @keyframes rotateInfinity {
      0% {
        transform: translate(-63px, -70px) rotateZ(0);
      }
      100% {
        transform: translate(-63px, -70px) rotateZ(360deg);
      }
    }
    .imgRotate {
      animation-play-state: running;
    }
  }
  &-bot {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
    &-icon {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      .botIcon1 {
        width: 14px;
        height: 14px;
        margin: 0 30px;
        fill: #fff;
        cursor: pointer;
      }
    }
    &-progress {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      &-line {
        width: 66%;
        margin: 0 1px;
      }
      &-time {
        margin-top: -4px;
        font-size: 12px;
        color: #fff;
        transform: scale(0.9);
      }
    }
    &-operate {
      margin-top: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      .botIcon2 {
        width: 15px;
        height: 15px;
        margin: 0 15px;
        fill: #fff;
        cursor: pointer;
      }
      .botIcon3 {
        width: 20px;
        height: 20px;
        margin: 0 16px;
        fill: #fff;
        cursor: pointer;
      }
      .botIcon4 {
        width: 24px;
        height: 24px;
        margin: 0 16px;
        fill: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
<style>
.ant-slider-tooltip {
  visibility: hidden;
}
</style>
