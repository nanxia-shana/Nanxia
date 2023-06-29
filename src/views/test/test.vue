<template>
  <div class="main">
    <div class="box" v-loading="loading">
      <Echarts :data="options" :uuid="'chart1'" @clickEchart="clickEven" class="h-right-three-chart"></Echarts>
    </div>
    <div @click="submit">刷新</div>
  </div>
</template>

<script lang="ts" setup>
import Echarts from "@/components/echarts/inedx.vue";
import { ref, reactive, getCurrentInstance } from "vue";
const options = reactive({
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
      data: [
        { value: 18, name: "rose 1" },
        { value: 48, name: "rose 2" },
        { value: 32, name: "rose 3" },
        { value: 36, name: "rose 4" },
        { value: 18, name: "rose 5" },
        { value: 26, name: "rose 6" },
        { value: 42, name: "rose 7" },
        { value: 28, name: "rose 8" },
        { value: 30, name: "rose 9" },
      ],
    },
  ],
});
const loading = ref(false);
const instance: any = getCurrentInstance();
const submit = () => {
  loading.value = true;
  instance.proxy.$request
    .get("/user/queryLimit", {
      currentPage: 0,
      pageSize: 5,
    })
    .then((res: any) => {
      console.log(res);
    });
  setTimeout(() => {
    loading.value = false;
  }, 1500);
};
const clickEven = (params: any) => {
  console.log(params);
  Object.assign(options, {
    title: {
      text: "",
      subtext: "",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // Use axis to trigger tooltip
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    series: [
      {
        name: "Direct",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [320, 302, 301, 334, 390, 330, 320],
      },
      {
        name: "Mail Ad",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Affiliate Ad",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ad",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [150, 212, 201, 154, 190, 330, 410],
      },
      {
        name: "Search Engine",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320],
      },
    ],
  });
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
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
