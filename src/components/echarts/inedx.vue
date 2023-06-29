<template>
  <div :id="DOM_ID" class="chart"></div>
</template>

<script lang="ts" setup>
// 使用defineEmits创建名称，接受一个数组
import { watch, defineProps, inject, onMounted, defineEmits } from "vue";
const props = defineProps(["data", "uuid"]);
const echarts = inject("$echarts");
const DOM_ID = props.uuid;
const emit = defineEmits(["clickEchart"]);
watch(
  () => props.data,
  (newvalue) => {
    if (newvalue) {
      init();
    }
  },
  { deep: true },
);
onMounted(() => {
  init();
});
const init = () => {
  const chartOps = props.data;
  let options = chartOps;
  const myChart = (echarts as any).init(document.getElementById(DOM_ID));
  myChart.off("click"); // 这里很重要！！解决重复点击
  myChart.setOption(options);
  window.onresize = function () {
    //自适应大小
    myChart.resize();
  };
  myChart.on("click", (params: any) => {
    console.log(chartOps);
    //传递给父组件
    emit("clickEchart", params);
  });
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
