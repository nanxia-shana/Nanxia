<template>
  <div class="waterfallFlow">
    <div class="card">
      <div class="coloum1">
        <!-- :style="[{ background: item.color }, { height: item.height }, { lineHeight: item.height }]" -->
        <div
          class="card-item"
          v-for="(item, index) in cardList1"
          :key="index"
          :class="{ visibles: isVisibility }"
          :style="[{ background: item.color }, { height: item.height }, { lineHeight: item.height }]">
          <!-- <img class="image" :src="getImageUrl(item.name)" alt="" /> -->
          <p class="text">{{ item.num }}</p>
        </div>
      </div>
      <div class="coloum2">
        <div
          class="card-item"
          v-for="(item, index) in cardList2"
          :key="index"
          :class="{ visibles: isVisibility }"
          :style="[{ background: item.color }, { height: item.height }, { lineHeight: item.height }]">
          <!-- <img class="image" :src="getImageUrl(item.name)" alt="" /> -->
          <p class="text">{{ item.num }}</p>
        </div>
      </div>
      <div class="coloum3">
        <div
          class="card-item"
          v-for="(item, index) in cardList3"
          :key="index"
          :class="{ visibles: isVisibility }"
          :style="[{ background: item.color }, { height: item.height }, { lineHeight: item.height }]">
          <!-- <img class="image" :src="getImageUrl(item.name)" alt="" /> -->
          <p class="text">{{ item.num }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from "vue";
const cardList = reactive([]);
const isVisibility = ref(true);
// 由于渲染时候对数据的两次赋值，则会出现一次闪现，需要防抖
// const pictureList = ["deskBack02", "file01", "file02", "file03", "file04", "file05", "file06"];
// const getImageUrl = (name: string) => {
//   return new URL(`/src/assets/images/${name}.jepg`, import.meta.url).href;
// };
onMounted(() => {
  console.log(Math.floor(Math.random() * 6));
  for (let i = 0; i < 40; i++) {
    cardList.push({
      num: `${i}`,
      // name: pictureList[Math.floor(Math.random() * 6)],
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      height: `${Math.random() * 10 + 5}`,
    });
  }
  equallyCard();
  nextTick(() => {
    caLFlex();
  }).then(() => {
    isVisibility.value = true;
  });
});

const cardList1 = ref([]); // 各列的数据
const cardList2 = ref([]);
const cardList3 = ref([]);

function equallyCard() {
  // 平分数据，确保页面上遍历卡片dom的真实顺序与平分的一致 document.querySelectorAll('.card-item'))
  let num = cardList.length / 3;
  cardList.forEach((item, index) => {
    if (index < num) {
      cardList1.value.push(item);
      return;
    }
    if (index < 2 * num) {
      cardList1.value.push(item);
      return;
    }
    cardList3.value.push(item);
  });
}

function caLFlex() {
  let arr1 = []; // 第一列的值
  let arr2 = []; // 第二列的值
  let arr3 = []; // 第三列的值
  let heightArry_1 = []; // 第一列的卡片高度
  let heightArry_2 = []; // 第二列的卡片高度
  let heightArry_3 = []; // 第三列的卡片高度
  Array.from(document.querySelectorAll(".card-item")).forEach((item, index) => {
    if (index === 0) {
      // 第一行中的元素无需判断，直接加到新的数组中
      heightArry_1.push((item as HTMLDivElement).offsetHeight);
      arr1.push(cardList[index]);
      return;
    }
    if (index === 1) {
      heightArry_2.push((item as HTMLDivElement).offsetHeight);
      arr2.push(cardList[index]);
      return;
    }
    if (index === 2) {
      heightArry_3.push((item as HTMLDivElement).offsetHeight);
      arr3.push(cardList[index]);
      return;
    }
    const heightTotal_1 = heightArry_1.length ? Array.from(heightArry_1).reduce((acc, cur) => acc + cur) : 0; // 第一列的总高度
    const heightTotal_2 = heightArry_2.length ? Array.from(heightArry_2).reduce((acc, cur) => acc + cur) : 0; // 第二列的总高
    const heightTotal_3 = heightArry_3.length ? Array.from(heightArry_3).reduce((acc, cur) => acc + cur) : 0; // 第三列的总高度

    // 找到最小值
    let minNumber = Math.min(heightTotal_1, heightTotal_2, heightTotal_3);
    switch (minNumber) {
      case heightTotal_1:
        heightArry_1.push((item as HTMLDivElement).offsetHeight);
        arr1.push(cardList[index]);
        break;
      case heightTotal_2:
        heightArry_2.push((item as HTMLDivElement).offsetHeight);
        arr2.push(cardList[index]);
        break;
      case heightTotal_3:
        heightArry_3.push((item as HTMLDivElement).offsetHeight);
        arr3.push(cardList[index]);
        break;
    }
  });

  // 重新将数据赋值给各列数组
  cardList1.value = arr1;
  cardList2.value = arr2;
  cardList3.value = arr3;
}
</script>
<style lang="less" scoped>
.waterfallFlow {
  width: 100%;
  user-select: none;
  background-color: #fff;
  position: relative;
  z-index: 3;
  .card {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    pointer-events: none;
    .card-item {
      visibility: hidden;
      width: 70px;
      border-radius: 4px;
      text-align: center;
      .image {
        width: 70px;
        object-fit: contain;
      }
      .text {
        margin-bottom: 1em;
      }
    }
    .visibles {
      visibility: visible;
    }
  }
}
</style>
