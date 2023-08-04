<template>
  <div id="container"></div>
  <div id="panel"></div>
</template>
<script setup>
import { onMounted } from "vue";
import { shallowRef } from "@vue/reactivity";
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
  securityJsCode: "c086309e02a1b81384b8f3f33c9ff508",
};
let map = shallowRef(null);
onMounted(() => {
  initMap();
});
const initMap = () => {
  AMapLoader.load({
    key: "c73e9afb6ff55e23cdb5dbb04587a36a", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Driving"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        mapStyle: "amap://styles/fresh", //设置地图的显示样式
        resizeEnable: true,
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 5, //初始化地图级别
        center: [105.602725, 37.076636], //初始化地图中心点位置
      });
      var points = [
        { keyword: "北京市地震局（公交站）", city: "北京" },
        { keyword: "亦庄文化园（地铁站）", city: "北京" },
      ];
      var driving = new AMap.Driving({
        map: map,
        panel: "panel",
      });
      driving.search(points, function (status, result) {
        // 未出错时，result即是对应的路线规划方案
        console.log("object2", status, result);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>
<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>
<style type="text/css">
#panel {
  position: fixed;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
#panel .amap-call {
  background-color: #009cf9;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
#panel .amap-lib-driving {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}
</style>
