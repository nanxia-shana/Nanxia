<template>
  <div id="chartcontainer"></div>
</template>

<script lang="ts" setup>
// 使用defineEmits创建名称，接受一个数组
import { watch, defineProps, inject, onMounted, defineEmits } from "vue";
const props = defineProps(["data"]);
const echarts = inject("$echarts");
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
  const roseData = props.data.data;
  let options = {
    title: {
      text: "Nightingale Chart",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        // restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Radius Mode",
        type: "pie",
        // radius: [20, 140],
        radius: "80%",
        center: ["50%", "60%"],
        roseType: "radius",
        itemStyle: {
          borderRadius: 6,
        },
        data: roseData,
      },
    ],
  };
  const myChart = (echarts as any).init(document.getElementById("chartcontainer"));
  myChart.setOption(options);
  window.onresize = function () {
    //自适应大小
    myChart.resize();
  };
  myChart.on("click", (params: any) => {
    //传递给父组件
    emit("clickEchart", params);
  });
};
</script>

<style scoped>
#chartcontainer {
  width: 800px;
  height: 600px;
}
</style>
