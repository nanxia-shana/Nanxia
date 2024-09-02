<template>
  <div class="music" @click="closeWindow">
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
      <div v-show="lyricShow" class="music-mid-lyric" id="lyricWindow">
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
      </div>
    </div>
    <div class="music-bot">
      <div class="music-bot-icon" :style="lyricShow ? 'justify-content: space-between; align-items: flex-end' : ''">
        <div style="display: flex; align-items: center">
          <svg-icon name="loveempty" :className="lyricShow ? 'botLoveLyrc' : 'botIcon1'"></svg-icon>
          <svg-icon v-show="lyricShow" name="mvplay" className="botIcon1" style="margin: 0" @click="musicMV"></svg-icon>
        </div>
        <div v-show="!lyricShow" class="music-bot-icon-item">
          <svg-icon name="download" className="botIcon1"></svg-icon>
          <div class="music-bot-icon-item-lb">vip</div>
        </div>
        <div v-show="!lyricShow" class="music-bot-icon-item">
          <div v-show="!lyricShow" class="music-bot-icon-chang">唱</div>
          <div class="music-bot-icon-item-lt" style="left: 3rem">352</div>
        </div>
        <div v-show="!lyricShow" class="music-bot-icon-item">
          <svg-icon name="comment" className="botIcon1"></svg-icon>
          <div class="music-bot-icon-item-lt">10w+</div>
        </div>
        <div style="display: flex; align-items: center">
          <div
            v-show="musicTlyric && lyricShow"
            class="music-bot-icon-tlyric"
            :style="`color: ${tlyricShow ? '#fff' : 'rgba(222, 222, 222, .6)'}`"
            @click.stop="tlyricShow = !tlyricShow">
            译
          </div>
          <svg-icon name="menuright" :className="lyricShow ? 'botMenuLyrc' : 'botIcon1'"></svg-icon>
        </div>
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
        <svg-icon name="lastsong" className="botIcon2" @click="checkSong(false)"></svg-icon>
        <div @click="playMusic">
          <svg-icon v-if="musicIsPlay" name="pause" className="botIcon4"></svg-icon>
          <svg-icon v-else name="nopause" className="botIcon4"></svg-icon>
        </div>
        <svg-icon name="nextsong" className="botIcon2" @click="checkSong(true)"></svg-icon>
        <svg-icon name="menu" className="botIcon3" @click.stop="musicListWindow"></svg-icon>
      </div>
    </div>
    <div class="music-list" v-show="musicListShow" @click.stop="() => {}">
      <div class="music-list-title">当前播放<span>{{musicList.length}}</span></div>
      <div class="music-list-icon">
        <div class="music-list-icon-left"></div>
        <div class="music-list-icon-right"></div>
      </div>
    </div>
    <div class="music-msg" :class="{ msgShow: phoneMsgShow }">{{ phoneMsg }}</div>
  </div>
</template>
<script lang="ts" setup>
import { inject, reactive, ref, onMounted, watch } from "vue";
import { binarySearchRange } from "@/utils/tools";
import useGlobalStore from "@/store/modules/global";
const store = useGlobalStore();
import { storeToRefs } from "pinia";
const { music, musicList } = storeToRefs(store);
import { useRouter } from "vue-router";
const router = useRouter();
const phoneMsgShow = ref<boolean>(false);
const phoneMsg = ref<string>("暂无MV");
const musicId = ref<number>(inject("musicId"));
const musicImgUrl: string = inject("musicImgUrl");
const musicName: string = inject("musicName");
const musicAuthor: string = inject("musicAuthor");
const musicLyric = ref<string>(inject("musicLyric"));
const musicTlyric = ref<string>(inject("musicTlyric"));
const musicDuration = ref<number>(inject("musicDuration"));
const musicCurTime = ref<number>(inject("musicCurTime"));
const musicIsPlay = ref<boolean>(inject("musicIsPlay"));
const audioPlayerRef: any = inject("audioPlayerRef");

const lyricShow = ref<boolean>(false);
const tlyricShow = ref<boolean>(false);
const lyricMap = reactive(new Map());
const tlyricMap = reactive(new Map());
const musicListShow = ref<boolean>(false);
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
const closeWindow = () => {
  musicListShow.value = false
};
const formatter = (value: number) => {
  return `${Math.floor(value / 60)}:${Math.floor(value % 60) < 10 ? "0" + Math.floor(value % 60) : Math.floor(value % 60)}`;
};
const musicDrag = async (e: number) => {
  audioPlayerRef.value.currentTime = e;
};
const musicMV = () => {
  phoneMsg.value = "暂无MV";
  phoneMsgShow.value = true;
  setTimeout(() => {
    phoneMsgShow.value = false;
  }, 3300);
};
const playMusic = () => {
  if (audioPlayerRef.value.readyState == 4) {
    if (audioPlayerRef.value.paused == true) {
      audioPlayerRef.value.play();
    } else {
      audioPlayerRef.value.pause();
    }
  } else {
    audioPlayerRef.value.load();

    audioPlayerRef.value.addEventListener("durationchange", function () {
      musicDuration.value = audioPlayerRef.value.duration;
    });
    audioPlayerRef.value.addEventListener("canplay", async () => {
      audioPlayerRef.value.play();
    });
  }
};
const checkSong = (flag: boolean) => {
  let item: any;
  if (flag) item = store.nextMusic(musicId.value);
  else item = store.lastMusic(musicId.value);
  if (item) {
    musicIsPlay.value = false;
    audioPlayerRef.value.load();
    audioPlayerRef.value.addEventListener("canplay", async () => {
      musicDuration.value = audioPlayerRef.value.duration;
      audioPlayerRef.value.play();
      musicIsPlay.value = true;
      await formatLyric();
      operateLyric();
    });
  } else {
    alert("歌曲不存在");
  }
};
const musicListWindow = () => {
  musicListShow.value = true;
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
        item.style.color = "rgba(255, 255, 255, .55)";
      });
      document.getElementById(timeArray[i]).style.color = "rgba(255, 255, 255, 1)";
      console.log(document.getElementById("lyricBox").offsetHeight, document.getElementById(timeArray[i]).offsetTop, document.getElementById(timeArray[i]).offsetHeight, "aaaaaaaaaaa")
      centerTop =
        document.getElementById("lyricWindow").offsetHeight / 2 -
        document.getElementById(timeArray[i]).offsetTop -
        document.getElementById(timeArray[i]).offsetHeight / 2;
      document.getElementById("lyricBox").style.top = `${centerTop / 10}rem`;
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
    height: 3.6rem;
    padding: 0 1rem 0 0;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
    &-msg {
      flex: 1;
      height: 100%;
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-name {
        font-size: 1.2rem;
        color: #fff;
        transform: scale(.95);
        transform-origin: 50% 100%;
      }
      &-author {
        display: flex;
        align-items: center;
        transform: scale(.8);
        transform-origin: 50% 0;
        cursor: pointer;
        span {
          font-size: 1.2rem;
          color: #ccc;
        }
      }
    }
    .topIcon1 {
      width: 2.6rem;
      height: 2.6rem;
      fill: #dddddd;
      cursor: pointer;
    }
    .topIcon2 {
      width: 1.6rem;
      height: 1.6rem;
      margin-top: .2rem;
      fill: #cccccc;
      transform: rotateY(180deg);
    }
  }
  &-mid {
    flex: 1;
    overflow: hidden;
    width: 100%;
    padding-bottom: .4rem;
    position: relative;
    z-index: 2;
    cursor: pointer;
    &-cover {
      &-stick {
        width: 8.6rem;
        object-fit: contain;
        position: absolute;
        top: -1.4rem;
        left: 50%;
        z-index: 3;
        transform: translateX(-1.8rem);
        transform-origin: 1.5rem 1.5rem;
        transition: transform .6s ease-out;
      }
      .stickOn {
        transform: translateX(-1.8rem) rotateZ(-30deg);
        transition: transform .6s ease-out;
      }
      &-wrapper {
        width: 80%;
        max-width: 36rem;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, .25);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        &-cd {
          width: 99%;
          max-width: 35.5rem;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
        }
      }
      &-img {
        width: 56%;
        max-width: 25rem;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        object-fit: cover;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        z-index: 3;
        animation: rotateInfinity 8s linear infinite forwards;
        -webkit-animation: rotateInfinity linear 8s infinite forwards;
        animation-play-state: paused;
      }
      @keyframes rotateInfinity {
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
        padding: 16rem 2rem 15rem;
        transition: 0.8s top cubic-bezier(.645, .045, .355, 1);
        position: absolute;
        z-index: 4;
        // background: linear-gradient(to top, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        // mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
        .lyric {
          width: 100%;
          margin-bottom: .5rem;
          color: rgba(255, 255, 255, .55);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            font-size: 1.4rem;
            font-weight: 540;
            transition: .3s color cubic-bezier(.645, .045, .355, 1);
          }
        }
      }
    }
    &-lyric::-webkit-scrollbar {
      display: none;
    }
  }
  &-bot {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
    &-icon {
      width: 100%;
      max-width: 45rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      &-chang {
        width: 2.6rem;
        height: 2.6rem;
        margin: 0 1.5rem;
        border: 2px solid #fff;
        border-radius: 50%;
        font-size: 1.4rem;
        color: #fff;
        transform: scale(.7);
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
          height: 1.6rem;
          padding: 0 .4rem;
          border-radius: .8rem;
          background-color: #eee;
          font-size: 1.4rem;
          font-weight: bold;
          line-height: 1.6rem;
          color: #aaa;
          transform: scale(.6);
          transform-origin: 0 50%;
          box-sizing: border-box;
          position: absolute;
          top: -.4rem;
          left: 2.6rem;
        }
        &-lb {
          height: 1.6rem;
          padding: 0 .4rem;
          border-radius: .8rem;
          background-color: #eee;
          font-size: 1.4rem;
          font-weight: bold;
          line-height: 1.6rem;
          color: #aaa;
          transform: scale(.6);
          transform-origin: 0 50%;
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          left: 2.7rem;
        }
      }

      &-tlyric {
        min-width: 3rem;
        height: 2rem;
        padding: .4rem;
        border: 1px solid rgba(222, 222, 222, .6);
        border-radius: 1rem;
        font-size: 1.2rem;
        color: rgba(222, 222, 222, .6);
        transform: scale(.8);
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .botIcon1 {
        width: 1.8rem;
        height: 1.8rem;
        margin: 0 1.6rem;
        fill: #fff;
        cursor: pointer;
        transition: all 0s;
        cursor: pointer;
      }
      .botLoveLyrc {
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 1rem;
        fill: #fff;
        cursor: pointer;
        transition: all 0s;
        cursor: pointer;
      }
      .botMenuLyrc {
        width: 1rem;
        height: 1rem;
        padding: .2rem;
        margin: 0 1rem;
        box-sizing: content-box;
        border-radius: 50%;
        border: 1px solid rgba(222, 222, 222, .6);
        fill: rgba(222, 222, 222, .6);
        transition: all 0s;
        cursor: pointer;
      }
    }
    &-progress {
      width: 100%;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &-line {
        width: 78%;
        margin: 0 .1rem;
      }
      &-time {
        margin-top: -.4rem;
        font-size: 1.2rem;
        color: #fff;
        transform: scale(.9);
      }
    }
    &-operate {
      width: 100%;
      max-width: 45rem;
      height: 5rem;
      padding-bottom: 2rem;
      box-sizing: content-box;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .botIcon2 {
        width: 1.8rem;
        height: 1.8rem;
        margin: 0 1.4rem;
        fill: #fff;
        cursor: pointer;
      }
      .botIcon3 {
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 1.4rem;
        fill: #fff;
        cursor: pointer;
      }
      .botIcon4 {
        width: 4rem;
        height: 4rem;
        margin: 0 1.4rem;
        fill: #fff;
        cursor: pointer;
      }
    }
  }
  &-list {
    width: 96%;
    height: 66%;
    margin: auto;
    padding: 2rem 1.4rem 1.4rem;
    border-radius: 1.4rem 1.4rem 0 0;
    background-color: #800;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    &-title{
      width: fit-content;
      font-size: 1.2rem;
      color: #fff;
      letter-spacing: 1px;
      position: relative;
      span{
        display: inline-block;
        transform: scale(.8);
        position: absolute;
        top: -.4rem;
        right: -.8rem;
      }
    }
  }
  &-list::before{
    content: "";
    width: 2.4rem;
    height: .2rem;
    border-radius: 1px;
    background-color: rgba(222, 222, 222, .3);
    position: absolute;
    top: .6rem;
    left: calc(50% - 1.2rem);
  }
  &-msg {
    visibility: hidden;
    opacity: 0;
    width: fit-content;
    padding: .2rem 1rem;
    margin: auto;
    border-radius: .4rem;
    background-color: rgba(0, 0, 0, .6);
    font-size: 1.2rem;
    color: #fff;
    text-align: center;
    transition: opacity .3s cubic-bezier(.645, .045, .355, 1);
    position: absolute;
    top: 8rem;
    left: 0;
    right: 0;
    z-index: 8;
  }
  .msgShow {
    visibility: visible;
    opacity: 1;
    transition: opacity .3s cubic-bezier(.645, .045, .355, 1);
    animation: msghidden 3s .3s ease-out forwards;
  }
  @keyframes msghidden {
    0% {
      opacity: 1;
      visibility: visible;
    }
    90% {
      opacity: 1;
      visibility: visible;
    }
    99% {
      opacity: 0;
      visibility: visible;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }
}
</style>
<style>
.ant-slider-tooltip {
  visibility: hidden;
}
</style>
