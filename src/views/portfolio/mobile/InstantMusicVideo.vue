<template>
  <!-- mousewheel -->
  <swiper
    class="swiper"
    :modules="modules"
    :slides-per-view="1"
    :space-between="0"
    :pagination="{ clickable: true }"
    direction="vertical"
    @swiper="onSwiper"
    @slideChangeTransitionStart="slideChangeTransitionStart"
    @slideChangeTransitionEnd="slideChangeTransitionEnd">
    <swiper-slide class="swiper-slide" v-for="(item, index) in videoList" :key="index">
      <div class="swiper-slide-video" @click="videoClick(index, $event)">
        <video :id="'video' + index" class="video" :src="getImageUrl(item.name)" loop></video>
        <div v-show="item.isPause" class="swiper-slide-video-play">
          <svg-icon name="play" className="playIcon"></svg-icon>
        </div>
        <div class="swiper-slide-video-love" @click.stop="collect(item)">
          <svg-icon name="love" :className="item.collection ? 'collectionIcon' : 'noCollectionIcon'"></svg-icon>
          <span>{{ item.collectionNum }}</span>
        </div>
        <div class="swiper-slide-video-review" @click.stop="review(item)">
          <svg-icon name="review" className="operatIcon"></svg-icon>
          <span>{{ item.reviewNum }}</span>
        </div>
        <div class="swiper-slide-video-share" @click.stop="share(item)">
          <svg-icon name="share" className="operatIcon"></svg-icon>
          <span>{{ item.shareNum }}</span>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/less";
import { Pagination, A11y, Mousewheel } from "swiper/modules";
import { reactive } from "vue";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const videoList = reactive([
      {
        name: "manwalk",
        isPause: true,
        collecting: false,
        collectionNum: "6782",
        reviewNum: "307",
        shareNum: "1386",
      },
      {
        name: "moonsea",
        isPause: true,
        collecting: false,
        collectionNum: "5.2w",
        reviewNum: "8944",
        shareNum: "2.3w",
      },
      {
        name: "rainbowsky",
        isPause: true,
        collecting: false,
        collectionNum: "12.5w",
        reviewNum: "3.1w",
        shareNum: "6.7w",
      },
      {
        name: "sakura",
        isPause: true,
        collecting: false,
        collectionNum: "30.2w",
        reviewNum: "8.7w",
        shareNum: "13.9w",
      },
      {
        name: "snowriver",
        isPause: true,
        collecting: false,
        collectionNum: "1.8w",
        reviewNum: "4916",
        shareNum: "8090",
      },
    ]);
    const onSwiper = (swiper) => {
      // Swiper初始化
      // console.log(swiper);
    };
    const slideChangeTransitionStart = (swiper) => {
      videoList[swiper.previousIndex].isPause = true;
      document.getElementById(`video${swiper.previousIndex}`).pause();
      document.getElementById(`video${swiper.previousIndex}`).currentTime = 0;
    };
    const slideChangeTransitionEnd = (swiper) => {
      videoList[swiper.activeIndex].isPause = false;
      document.getElementById(`video${swiper.activeIndex}`).play();
    };
    const videoClick = (index, e) => {
      videoList[index].isPause = !videoList[index].isPause;
      if (e.srcElement.paused && e.srcElement.readyState) e.srcElement.play();
      else e.srcElement.pause();
    };
    const getImageUrl = (name) => {
      return new URL(`/src/assets/videos/${name}.mp4`, import.meta.url).href;
    };
    const collect = (item) => {
      item.collection = !item.collection;
    };
    const review = (item) => {
      console.log(item.name);
    };
    const share = (item) => {
      console.log(item.name);
    };
    return {
      onSwiper,
      slideChangeTransitionStart,
      slideChangeTransitionEnd,
      videoClick,
      getImageUrl,
      collect,
      review,
      share,

      modules: [Pagination, A11y, Mousewheel],
      videoList,
    };
  },
};
</script>
<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  &-slide {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    user-select: none;
    &-video {
      width: 100%;
      height: 100%;
      position: relative;
      cursor: pointer;
      .video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &-play {
        pointer-events: none;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: #888;
        opacity: 0.7;
        position: absolute;
        top: 34%;
        left: 50%;
        transform: translateX(-35px);
        .playIcon {
          width: 100%;
          height: 100%;
          fill: #111;
        }
      }
      &-love,
      &-review,
      &-share {
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        span {
          font-size: 12px;
          color: #fff;
        }
        .noCollectionIcon {
          width: 44px;
          height: 44px;
          fill: #eee;
          transition: fill 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .collectionIcon {
          width: 44px;
          height: 44px;
          fill: #f13a68;
          transition: fill 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .operatIcon {
          width: 40px;
          height: 40px;
          fill: #eee;
        }
      }
      &-love {
        top: 36%;
        right: 6px;
      }
      &-review {
        top: 50%;
        right: 8px;
      }
      &-share {
        top: 63%;
        right: 8px;
      }
    }
  }
}
</style>
