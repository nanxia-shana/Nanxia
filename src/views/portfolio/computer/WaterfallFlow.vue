<template>
  <div
    class="waterfallFlow"
    ref="iphone"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mouseout="mouseout"
    @mousemove="mousemove($event)">
    <Waterfall
      :list="cardList"
      :breakpoints="{ 740: { rowPerView: 6 }, 600: { rowPerView: 5 } }"
      backgroundColor="rgba(51, 51, 51, 1)">
      <template #item="{ item }">
        <div class="card">
          <LazyImg :url="getImageUrl(item.name)" />
          <div class="card-text">{{ item.num }}</div>
        </div>
      </template>
    </Waterfall>
  </div>
</template>
<script lang="ts" setup>
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";
import { ref, onMounted, reactive } from "vue";
const cardList = reactive<any[]>([]);
const iphone = ref(null); // 使用 ref 引用 DOM 元素
let flag = ref<boolean>(false); //判断鼠标是否在iphone内且按住未松
// 由于渲染时候对数据的两次赋值，则会出现一次闪现，需要防抖
const pictureList = ["deskBack2", "file01", "file02", "file03", "file04", "file05", "file06"];
let startIndex: number = 0;
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/${name}.jpeg`, import.meta.url).href;
};
const mousedown = () => {
  flag.value = true;
};
const mouseup = () => {
  flag.value = false;
};
const mouseout = () => {
  flag.value = false;
};
const mousemove = (e: any) => {
  if (flag.value) {
    // 保证下滑时页面相同方向滚动
    iphone.value.scrollTop -= e.movementY;
  }
};
onMounted(() => {
  getList();
  iphone.value.addEventListener("scroll", () => {
    const { scrollTop, offsetHeight, scrollHeight } = iphone.value;
    if (scrollTop + offsetHeight >= scrollHeight) {
      //滚动条到达底部
      getList();
    }
  });
});
const getList = () => {
  for (let i = startIndex; i < startIndex + 30; i++) {
    cardList.push({
      num: `${i}`,
      // name: pictureList[Math.floor(Math.random() * 6)],
      name: pictureList[i % 7],
    });
  }
  startIndex += 30;
};
</script>
<style lang="less" scoped>
.waterfallFlow {
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  user-select: none;
}
.waterfallFlow::-webkit-scrollbar {
  display: none;
}
.card {
  width: 100%;
  background-color: #999;
  position: relative;
  pointer-events: none;
  &-text {
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    color: rgba(160, 123, 255, 0.8);
    text-align: center;
    font-weight: bolder;
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 2;
  }
}
</style>
