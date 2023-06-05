<template>
  <div class="main">
    <div class="box" v-loading="loading">
      <Echarts :data="data" @clickEchart="clickEven" class="h-right-three-chart"></Echarts>
    </div>
    <div @click="submit">刷新</div>
  </div>
</template>

<script lang="ts" setup>
import Echarts from "../components/echarts.vue";
import { ref, reactive } from "vue";
let data = reactive({
  data: [
    { value: 10, name: "rose 1" },
    { value: 28, name: "rose 2" },
    { value: 32, name: "rose 3" },
    { value: 36, name: "rose 4" },
    { value: 48, name: "rose 5" },
    { value: 56, name: "rose 6" },
    { value: 62, name: "rose 7" },
    { value: 78, name: "rose 8" },
    { value: 80, name: "rose 9" },
  ],
});
const loading = ref(false);
const submit = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1500);
};
const clickEven = (params: any) => {
  console.log(params);
  data.data = [
    { value: 10, name: "rose 1" },
    { value: 12, name: "rose 2" },
    { value: 22, name: "rose 3" },
    { value: 46, name: "rose 4" },
    { value: 48, name: "rose 5" },
    { value: 66, name: "rose 6" },
    { value: 72, name: "rose 7" },
    { value: 98, name: "rose 8" },
    { value: 110, name: "rose 9" },
  ];
};
</script>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box {
  width: 800px;
  height: 600px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(15deg) rotateY(-20deg) translateX(-20px);
  transition: all 0.5s;
}
.box:hover {
  transform-style: preserve-3d;
  transform: none;
  transition: all 0.5s;
}
</style>
