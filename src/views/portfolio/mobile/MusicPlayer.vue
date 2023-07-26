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
      <svg-icon name="shareMusic" className="topIcon1"></svg-icon>
    </div>
    <div class="music-mid" @click="lyricShow = !lyricShow">
      <div v-show="!lyricShow" class="music-mid-cover">
        <img
          class="music-mid-cover-stick"
          :class="{ stickOn: !musicIsPlay }"
          src="@/assets/images/stick_bg.png"
          alt="stick_bg" />
        <div class="music-mid-cover-wrapper">
          <img class="music-mid-cover-wrapper-cd" src="@/assets/images/cd_wrapper.png" alt="CDwrapper" />
        </div>
        <img class="music-mid-cover-img" :class="{ imgRotate: musicIsPlay }" :src="getImageUrl(musicImgUrl)" alt="cover" />
      </div>
      <div v-show="lyricShow" class="music-mid-lyric">
        <div id="lyricBox">
          <div class="lyric" :id="value[0]" v-for="(value, key) in lyricMap" :key="key">
            <span>
              {{ value[1][0] ? value[1][0] : "&nbsp" }}
            </span>
            <span v-show="tlyricShow">
              {{ value[1][1] ? value[1][1] : "&nbsp" }}
            </span>
          </div>
        </div>
        <div
          v-if="musicTlyric"
          class="tlyricBox"
          :style="`background-color: ${tlyricShow ? '#fff' : 'none'};color: ${tlyricShow ? '#666' : '#fff'}`"
          @click.stop="tlyricShow = !tlyricShow">
          译
        </div>
      </div>
    </div>
    <div class="music-bot">
      <div class="music-bot-icon">
        <svg-icon name="loveempty" className="botIcon1"></svg-icon>
        <div class="music-bot-icon-item">
          <svg-icon name="download" className="botIcon1"></svg-icon>
          <div class="music-bot-icon-item-lb">vip</div>
        </div>
        <div class="music-bot-icon-chang">唱</div>
        <div class="music-bot-icon-item">
          <svg-icon name="comment" className="botIcon1"></svg-icon>
          <div class="music-bot-icon-item-lt">10w+</div>
        </div>
        <svg-icon name="menuright" className="botIcon1"></svg-icon>
      </div>
      <div class="music-bot-progress">
        <span class="music-bot-progress-time" style="transform-origin: 0 50%">{{ formatter(musicCurTime) }}</span>
        <div class="music-bot-progress-line">
          <a-slider v-model:value="musicCurTime" :tooltip-open="false" :max="musicDuration" @change="musicDrag" />
        </div>
        <span class="music-bot-progress-time" style="transform-origin: 100% 50%">{{ formatter(musicDuration) }}</span>
      </div>
      <div class="music-bot-operate">
        <svg-icon name="circulation" className="botIcon2" style="transform: rotateY(180deg)"></svg-icon>
        <svg-icon name="lastsong" className="botIcon3" @click="checkSong(false)"></svg-icon>
        <div @click="playMusic">
          <svg-icon v-if="musicIsPlay" name="pause" className="botIcon4"></svg-icon>
          <svg-icon v-else name="nopause" className="botIcon4"></svg-icon>
        </div>
        <svg-icon name="nextsong" className="botIcon3" @click="checkSong(true)"></svg-icon>
        <svg-icon name="menu" className="botIcon2"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject, reactive, ref, onMounted, watch } from "vue";
import { binarySearchRange } from "@/utils/tools";
import useGlobalStore from "@/store/modules/global";
const store = useGlobalStore();
import { storeToRefs } from "pinia";
const { music } = storeToRefs(store);
import { useRouter } from "vue-router";
const router = useRouter();
const musicId = ref<number>(inject("musicId"));
const musicImgUrl: string = inject("musicImgUrl");
const musicName: string = inject("musicName");
const musicAuthor: string = inject("musicAuthor");
const musicLyric = ref<string>(inject("musicLyric"));
const musicTlyric = ref<string>(inject("musicTlyric"));
const musicDuration = ref<number>(inject("musicDuration"));
const musicCurTime = ref<number>(inject("musicCurTime"));
const musicIsPlay: boolean = inject("musicIsPlay");
const audioPlayerRef: any = inject("audioPlayerRef");

const lyricShow = ref<boolean>(false);
const tlyricShow = ref<boolean>(false);
const lyricMap = reactive(new Map());
const tlyricMap = reactive(new Map());
let i: number;
let timeArray = [];
let centerTop = 160;
onMounted(async () => {
  await formatLyric();
  operateLyric();
});
watch(
  () => music.value,
  async () => {
    await formatLyric();
    operateLyric();
  },
  {
    deep: true,
  },
);
const formatter = (value: number) => {
  return `${Math.floor(value / 60)}:${Math.floor(value % 60) < 10 ? "0" + Math.floor(value % 60) : Math.floor(value % 60)}`;
};
const musicDrag = async (e: number) => {
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
    audioPlayerRef.value.addEventListener("canplay", async () => {
      musicDuration.value = audioPlayerRef.value.duration;
      audioPlayerRef.value.play();
      await formatLyric();
      operateLyric();
    });
  } else {
    alert("歌曲不存在");
  }
};
const formatLyric = async () => {
  lyricMap.clear();
  if (!musicLyric.value) {
    lyricMap.set(0, ["暂无歌词", ""]);
    return;
  }
  if (musicTlyric.value) {
    let tlyricList = musicTlyric.value.split("\\n");
    let tlyricTime: number;
    let tlyric: string;
    tlyricList.forEach((item) => {
      if (item.indexOf("]") !== -1) {
        let m = Number(item.split("]")[0].split("[")[1].split(".")[0].split(":")[0]);
        let s = Number(item.split("]")[0].split("[")[1].split(".")[0].split(":")[1]);
        tlyricTime = m * 60 + s;
        tlyric = item.split("]")[1];
        tlyricMap.set(tlyricTime, tlyric);
      }
    });
  } else {
    tlyricMap.set(0, "");
  }
  let lyricList = musicLyric.value.split("\\n");
  let lyricTime: number;
  let lyric: string;
  lyricList.forEach((item) => {
    if (item.indexOf("]") !== -1) {
      let m = Number(item.split("]")[0].split("[")[1].split(".")[0].split(":")[0]);
      let s = Number(item.split("]")[0].split("[")[1].split(".")[0].split(":")[1]);
      lyricTime = m * 60 + s;
      lyric = item.split("]")[1];
      lyricMap.set(lyricTime, [lyric, tlyricMap.get(lyricTime)]);
    }
  });
};
const operateLyric = () => {
  timeArray.length = 0;
  Array.from(document.querySelectorAll(".lyric")).forEach((item) => {
    timeArray.push(Number(item.id));
  });
  audioPlayerRef.value.addEventListener("timeupdate", () => {
    i = binarySearchRange(timeArray, musicCurTime.value)[0];
    if (i > -1) {
      Array.from(document.querySelectorAll(".lyric")).forEach((item: HTMLElement) => {
        item.style.color = "rgba(255, 255, 255, 0.55)";
      });
      document.getElementById(timeArray[i]).style.color = "rgba(255, 255, 255, 1)";
      centerTop = -(
        document.getElementById(timeArray[i]).offsetTop +
        document.getElementById(timeArray[i]).offsetHeight / 2 -
        160
      );
      document.getElementById("lyricBox").style.top = `${centerTop}px`;
    }
  });
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
  user-select: none;
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
    padding: 0 10px 0 0;
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
      align-items: center;
      &-name {
        font-size: 12px;
        color: #fff;
        transform: scale(0.95);
        transform-origin: 50% 100%;
      }
      &-author {
        display: flex;
        align-items: center;
        transform: scale(0.8);
        transform-origin: 50% 0;
        cursor: pointer;
        span {
          font-size: 12px;
          color: #ccc;
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
    }
  }
  &-mid {
    overflow: hidden;
    width: 100%;
    height: 350px;
    position: relative;
    z-index: 2;
    cursor: pointer;
    &-cover {
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
      &-img {
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

    &-lyric {
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 3;
      #lyricBox {
        overflow: visible;
        padding: 160px 20px 150px;
        transition: 0.8s top cubic-bezier(0.645, 0.045, 0.355, 1);
        position: absolute;
        z-index: 4;
        // background: linear-gradient(to top, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        // mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
        .lyric {
          width: 100%;
          margin-bottom: 5px;
          color: rgba(255, 255, 255, 0.55);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            font-size: 14px;
            font-weight: 540;
            transition: 0.3s color cubic-bezier(0.645, 0.045, 0.355, 1);
          }
        }
      }
      .tlyricBox {
        width: 30px;
        height: 16px;
        border: 1px solid #fff;
        border-radius: 4px;
        font-size: 12px;
        transform: scale(0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        right: 8px;
        z-index: 5;
      }
    }
    &-lyric::-webkit-scrollbar {
      display: none;
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
      &-chang {
        width: 26px;
        height: 26px;
        margin: 0 15px;
        border: 2px solid #fff;
        border-radius: 50%;
        font-size: 14px;
        color: #fff;
        transform: scale(0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
      }
      &-item {
        position: relative;
        cursor: pointer;
        &-lt {
          height: 16px;
          padding: 0 4px;
          border-radius: 8px;
          background-color: #eee;
          font-size: 14px;
          font-weight: bold;
          line-height: 16px;
          color: #aaa;
          transform: scale(0.6);
          box-sizing: border-box;
          position: absolute;
          top: -4px;
          left: 16px;
        }
        &-lb {
          height: 16px;
          padding: 0 4px;
          border-radius: 8px;
          background-color: #eee;
          font-size: 14px;
          font-weight: bold;
          line-height: 16px;
          color: #aaa;
          transform: scale(0.6);
          box-sizing: border-box;
          position: absolute;
          bottom: 0px;
          left: 22px;
        }
      }
      .botIcon1 {
        width: 18px;
        height: 18px;
        margin: 0 16px;
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
        width: 78%;
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
        width: 18px;
        height: 18px;
        margin: 0 14px;
        fill: #fff;
        cursor: pointer;
      }
      .botIcon3 {
        width: 18px;
        height: 18px;
        margin: 0 14px;
        fill: #fff;
        cursor: pointer;
      }
      .botIcon4 {
        width: 40px;
        height: 40px;
        margin: 0 14px;
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
