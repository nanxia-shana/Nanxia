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
          <span>{{ numShow(item.collectionNum) }}</span>
        </div>
        <div class="swiper-slide-video-review" @click.stop="reviewOpen(item)">
          <svg-icon name="review" className="operatIcon"></svg-icon>
          <span>{{ numShow(item.reviewNum) }}</span>
        </div>
        <div class="swiper-slide-video-share" @click.stop="shareOpen">
          <svg-icon name="share" className="operatIcon"></svg-icon>
          <span>{{ numShow(item.shareNum) }}</span>
        </div>
      </div>
    </swiper-slide>
    <div v-show="reviewShow" class="review" @click="reviewClose()">
      <div class="review-box" :class="{ reviewFold: reviewFold }" @click.stop="empty">
        <div class="review-box-title">
          <span>{{ curReview.num }}条评论</span>
          <svg-icon name="X" className="reviewTIcon" @click="reviewClose()"></svg-icon>
        </div>
        <div class="review-box-content">
          <div class="review-box-content-item">
            <div class="review-box-content-item-msg">
              <div class="review-box-content-item-msg-left">
                <img src="@/assets/images/Iraina6.jpg" alt="avatar" />
              </div>
              <div class="review-box-content-item-msg-mid">
                <span class="review-box-content-item-msg-mid-name gray">Iraina</span>
                <span class="review-box-content-item-msg-mid-text white"
                  >I also want to carry my backpack bravely<span class="review-box-content-item-msg-mid-text-time gray"
                    >5-12</span
                  ></span
                >
              </div>
              <div class="review-box-content-item-msg-right">
                <svg-icon name="love" className="reviewCIcon"></svg-icon>
                <span class="gray">1.6w</span>
              </div>
            </div>
            <div class="review-box-content-item-subMsg">
              <div class="review-box-content-item-subMsg-left">
                <img src="@/assets/images/file05.jpeg" alt="avatar" />
              </div>
              <div class="review-box-content-item-subMsg-mid">
                <span class="review-box-content-item-subMsg-mid-name gray">肖肖</span>
                <span class="review-box-content-item-subMsg-mid-text white"
                  >me too<span class="review-box-content-item-subMsg-mid-text-time gray">2分钟前</span></span
                >
              </div>
              <div class="review-box-content-item-subMsg-right">
                <svg-icon name="love" className="reviewCIcon"></svg-icon>
                <span class="gray">125</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="shareShow" class="share" @click="shareClose()">
      <div class="share-box" :class="{ shareFold: shareFold }" @click.stop="empty">
        <svg-icon name="facebook" className="shareIcon"></svg-icon>
        <svg-icon name="twitter" className="shareIcon"></svg-icon>
        <svg-icon name="line" className="shareIcon"></svg-icon>
        <svg-icon name="instagram" className="shareIcon"></svg-icon>
      </div>
    </div>
  </swiper>
</template>
<script>
import { ref, defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/less";
import { Pagination, A11y, Mousewheel } from "swiper/modules";
import { reactive } from "vue";
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const videoList = reactive([
      {
        name: "manwalk",
        isPause: true,
        collection: false,
        collectionNum: 6782,
        reviewNum: 307,
        shareNum: 1386,
      },
      {
        name: "moonsea",
        isPause: true,
        collection: false,
        collectionNum: 52999,
        reviewNum: 8944,
        shareNum: 23523,
      },
      {
        name: "rainbowsky",
        isPause: true,
        collection: false,
        collectionNum: 125856,
        reviewNum: 31256,
        shareNum: 67843,
      },
      {
        name: "sakura",
        isPause: true,
        collection: false,
        collectionNum: 302586,
        reviewNum: 87523,
        shareNum: 139877,
      },
      {
        name: "snowriver",
        isPause: true,
        collection: false,
        collectionNum: 18856,
        reviewNum: 4916,
        shareNum: 8090,
      },
    ]);
    const curReview = reactive({
      num: "",
      list: [],
    });
    const reviewShow = ref(false);
    const reviewFold = ref(true);
    const shareShow = ref(false);
    const shareFold = ref(true);
    const onSwiper = (swiper) => {
      // Swiper初始化
      // console.log(swiper);
    };
    // 切换视频监听（切换过程开始时触发）
    const slideChangeTransitionStart = (swiper) => {
      videoList[swiper.previousIndex].isPause = true;
      document.getElementById(`video${swiper.previousIndex}`).pause();
      document.getElementById(`video${swiper.previousIndex}`).currentTime = 0;
    };
    // 切换视频监听（切换过程结束时触发）
    const slideChangeTransitionEnd = (swiper) => {
      videoList[swiper.activeIndex].isPause = false;
      document.getElementById(`video${swiper.activeIndex}`).play();
    };
    // 视频播放/暂停
    const videoClick = (index, e) => {
      videoList[index].isPause = !videoList[index].isPause;
      if (e.srcElement.paused && e.srcElement.readyState) e.srcElement.play();
      else e.srcElement.pause();
    };
    // 动态获取本地video的src
    const getImageUrl = (name) => {
      return new URL(`/src/assets/videos/${name}.mp4`, import.meta.url).href;
    };
    // 收藏
    const collect = (item) => {
      console.log(item.collection);
      if (item.collection) {
        item.collectionNum--;
      } else {
        item.collectionNum++;
      }
      item.collection = !item.collection;
    };
    // 收藏参数转化
    const numShow = (collectionNum) => {
      if (collectionNum < 10000) {
        return `${collectionNum}`;
      } else {
        return `${(Math.floor((collectionNum / 10000) * Math.pow(10, 1)) / Math.pow(10, 1)).toFixed(1)}w`;
      }
    };
    // 弹出评论界面
    const reviewOpen = (item) => {
      reviewShow.value = true;
      curReview.num = item.reviewNum;
      setTimeout(() => {
        reviewFold.value = false;
      }, 100);
    };
    // 收起评论页面
    const reviewClose = (item) => {
      reviewFold.value = true;
      setTimeout(() => {
        reviewShow.value = false;
      }, 300);
    };
    // 弹出分享界面
    const shareOpen = () => {
      shareShow.value = true;
      setTimeout(() => {
        shareFold.value = false;
      }, 100);
    };
    // 收起分享页面
    const shareClose = () => {
      shareFold.value = true;
      setTimeout(() => {
        shareShow.value = false;
      }, 300);
    };
    const empty = () => {};
    return {
      reviewShow,
      reviewFold,
      curReview,
      shareShow,
      shareFold,
      onSwiper,
      slideChangeTransitionStart,
      slideChangeTransitionEnd,
      videoClick,
      getImageUrl,
      collect,
      numShow,
      reviewOpen,
      reviewClose,
      shareOpen,
      shareClose,
      empty,

      modules: [Pagination, A11y, Mousewheel],
      videoList,
    };
  },
});
</script>
<style lang="less" scoped>
.review {
  width: 100%;
  height: 100%;
  background-color: rgba(60, 60, 60, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
  &-box {
    width: 100%;
    height: 330px;
    background-color: rgba(30, 30, 30, 0.9);
    border-radius: 8px 8px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0px;
    left: 0;
    z-index: 2;
    transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: default;
    &-title {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      span {
        font-size: 12px;
        color: #fff;
      }
      .reviewTIcon {
        width: 14px;
        height: 14px;
        fill: #fff;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
    &-content {
      overflow: auto;
      width: 100%;
      padding: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        .gray {
          color: #aaa;
        }
        .white {
          color: #fff;
        }
        &-msg {
          width: 100%;
          display: flex;
          justify-content: space-between;
          &-left {
            width: 36px;
            height: 36px;
            margin-top: 4px;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: contain;
            }
          }
          &-mid {
            padding: 0 5px 0 10px;
            flex: 1;
            display: flex;
            flex-direction: column;
            &-name {
              font-size: 12px;
            }
            &-text {
              margin-top: 6px;
              font-size: 14px;
              line-height: 16px;
              &-time {
                margin-left: 10px;
                font-size: 12px;
                transform: scale(0.7);
              }
            }
          }
          &-right {
            width: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .reviewCIcon {
              width: 20px;
              height: 20px;
              margin-top: 10px;
              fill: #eee;
              cursor: pointer;
            }
            span {
              font-size: 12px;
            }
          }
        }
        &-subMsg {
          width: 82%;
          align-self: flex-end;
          display: flex;
          justify-content: space-between;
          &-left {
            width: 24px;
            height: 24px;
            margin-top: 4px;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: contain;
            }
          }
          &-mid {
            padding: 10px 5px 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            &-name {
              font-size: 12px;
            }
            &-text {
              font-size: 14px;
              line-height: 16px;
              &-time {
                margin-left: 10px;
                font-size: 12px;
                transform: scale(0.7);
              }
            }
          }
          &-right {
            width: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .reviewCIcon {
              width: 20px;
              height: 20px;
              margin-top: 10px;
              fill: #eee;
              cursor: pointer;
            }
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
    &-content::-webkit-scrollbar {
      display: none;
    }
  }
  .reviewFold {
    height: 0;
    transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
.share {
  width: 100%;
  height: 100%;
  background-color: rgba(60, 60, 60, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  cursor: pointer;
  &-box {
    overflow: hidden;
    width: 100%;
    height: 70px;
    // background-color: rgba(30, 30, 30, 0.9);
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 8px 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    bottom: 0px;
    left: 0;
    z-index: 2;
    transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: default;
    .shareIcon {
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }
  .shareFold {
    height: 0;
    transition: height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
.swiper {
  width: 100%;
  height: 100%;
  background-color: #333;
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
